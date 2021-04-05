import * as grpc from 'grpc';
import { ObjectID } from 'bson';
import { TransferError, NotFoundError, ClientError, ArgumentInvalidError } from '../utils/errors/errors';
import { ApprovalService } from '../approval/approval.service';
import { IApprovalUser, IApproverInfo, ICanApproveToUser, IRequest } from '../approval/approvers.interface';
import { StatusService } from '../status/status.service';
import { IStatus, Status } from '../status/status.interface';
import { TransferRepository } from '../transfer/transfer.repository';
import { Destination, ITransfer, IPaginatedTransfer } from '../transfer/transfer.interface';
import { ITransferInfo } from './info.interface';
import { IUser } from '../user/user.interface';
import { getUser } from '../user/user.service';

const approvalService: ApprovalService = new ApprovalService();
const statusService: StatusService = new StatusService();

export class DropboxMethods {
  /**
   * GetTransfersInfo returns an object containing transfers array,
   * unique by reqID and filtered by fileID and sharerID.
   * If pageSize > 0 then a paginated result is returned.
   * @param call.request.fileID     - the fileID of the requested transfers.
   * @param call.request.sharerID   - the sharerID of the requested transfers.
   * @param call.request.pageNum    - the index of paginated page in the requested transfers.
   * @param call.request.pageSize   - the size of the page.
   * @returns { transfersInfo : ITransferInfo[], itemCount : number, pageNum : number } - An object of:
   *  - Transfer infos array
   *  - The count total number of grouped transfers,
   *  - The page number requested
   */
  static async GetTransfersInfo(call: grpc.ServerUnaryCall<any>):
          Promise<{ transfersInfo: ITransferInfo[], itemCount: number, pageNum: number }> {
    const pageNum: number = +call.request.pageNum || 0;
    const pageSize: number = +call.request.pageSize || 0;
    if (pageNum < 0 || pageSize < 0) {
      throw new ArgumentInvalidError(`pageNum ${pageNum} and pageSize ${pageSize} must both be non-negative`);
    }

    const fileID: string = call.request.fileID;
    const sharerID: string = call.request.sharerID;

    // Get all transfers that match to fileID and userID
    const partialFilter: Partial<ITransfer> = { };
    sharerID.length > 0 ? (partialFilter.sharerID = sharerID) : '';
    fileID.length > 0 ? (partialFilter.fileID = fileID) : '';

    const paginatedTransfersInfo = await TransferRepository.getMany(partialFilter, pageNum, pageSize);
    const paginatedTransfers = paginatedTransfersInfo.transfers;
    const itemCount = paginatedTransfersInfo.count;

    const transfers: ITransfer[] = paginatedTransfers.map(pt => pt.docs);

    if (!transfers.length) return { pageNum, itemCount, transfersInfo: [] };

    // Validate the transfers with user-service (check they exist),
    // and check if status update is required.
    const transfersInfo: ITransferInfo[] = await Promise.all(
      transfers.map(async (transfer: ITransfer) => {
        const requestID = transfer.reqID;
        const transferID = transfer._id;
        if (!requestID || !transferID) throw new NotFoundError();

        const failed: string[] = [];
        const destUsers: IUser[] = [];
        const statusTransfer: Status[] = [];

        // Check transfer status at status-service and update the status in mongo
        try {
          const statusRes: IStatus = await statusService.getStatus(requestID);
          statusTransfer.push(...statusRes.status);

          // Get destination users
          await Promise.all(
            statusRes.direction.to.map(async (destUser) => {
              try {
                const user: IUser = await getUser(destUser, transfer.destination);
                destUsers.push(user);
              } catch (error) {
                failed.push(`cant get user ${destUser} for dest: ${transfer.destination}`);
              }
            })
          );
        } catch (error) {
          failed.push(`cant get status, err: ${error}`);
        }

        return {
          failed,
          id: transfer._id || '',
          fileID: transfer.fileID,
          fileName: transfer.fileName,
          fileOwnerID: transfer.fileOwnerID,
          classification: transfer.classification,
          from: transfer.sharerID,
          createdAt: transfer.createdAt.getTime(),
          destination: transfer.destination,
          to: destUsers,
          status: statusTransfer || '???',
        };
      })
    );
    return { pageNum, itemCount, transfersInfo };
  }

  /**
   * Check if there is transfer exist by userID (dest user) and fileID
   * @param fileID
   * @param userID
   * @returns boolean - has transfer or not
   */
  static async HasTransfer(call: grpc.ServerUnaryCall<any>): Promise<{ hasTransfer: boolean }> {
    const userID: string = call.request.userID;
    const fileID: string = call.request.fileID;

    const hasTransfer: boolean = await TransferRepository.exists({ fileID, userID });

    return { hasTransfer };
  }

  /**
   * Get approver info approver permissions for specific user
   * @param id - userID
   * @param destination - dest network
   * @returns IApproverInfo
   */
  static async GetApproverInfo(call: grpc.ServerUnaryCall<any>): Promise<IApproverInfo> {
    const id: string = call.request.id;
    const destination: string = call.request.destination;

    if (!(destination in Destination)) throw new ClientError(`destination value: ${destination}, is not supported`);

    const approverInfo: IApproverInfo = await approvalService.getApproverInfo(id, destination);
    return approverInfo;
  }

  /**
   * Check if user has permissions to approve a transfer to another user
   * @param userID - userID
   * @param approverID
   * @param destination - dest network
   * @returns ICanApproveToUser
   */
  static async CanApproveToUser(call: grpc.ServerUnaryCall<any>): Promise<ICanApproveToUser> {
    const userID: string = call.request.userID;
    const approverID: string = call.request.approverID;
    const destination: string = call.request.destination;

    if (!(destination in Destination)) throw new ClientError(`destination value: ${destination}, is not supported`);

    const canApprove: ICanApproveToUser = await approvalService.canApproveToUser(approverID, userID, destination);
    return canApprove;
  }

  /**
   * Create transfer request
   */
  static async CreateRequest(call: grpc.ServerUnaryCall<any>) {
    const params = call.request;
    const approvers: string[] = params.approvers;
    const destUsers: IApprovalUser[] = params.users;
    const sharerID: string = params.sharerID;
    const destination: Destination = params.destination;

    if (!(destination in Destination)) {
      throw new ClientError(`destination value: ${destination}, is not supported`);
    }

    // Check if the users is valid
    if (destUsers.length < 1) throw new ClientError('must require at least 1 dest user');
    await Promise.all(
      destUsers.map(async (destUser: IApprovalUser) => {
        try {
          await getUser(destUser.id, destination);
        } catch (error) {
          throw new ClientError(`cant get user: ${destUser.id} with destination: ${destination}`);
        }
      })
    );

    approvers.push(sharerID);
    const reqID = new ObjectID().toString();

    await Promise.all(
      destUsers.map(async (destUser: IApprovalUser) => {
        const transfer: ITransfer = await TransferRepository.create({
          reqID,
          destination,
          sharerID,
          fileID: params.fileID,
          fileName: params.fileName,
          fileOwnerID: params.ownerID,
          classification: params.classification,
          userID: destUser.id,
          createdAt: new Date(),
        });
        if (!transfer) throw new TransferError();
      }));

    const request: IRequest = {
      approvers,
      id: reqID,
      fileId: params.fileID,
      fileName: params.fileName,
      to: params.users,
      from: params.sharerID,
      info: params.info,
      classification: params.classification,
    };
    await approvalService.createRequest(request, destination);

    return {};
  }
}
