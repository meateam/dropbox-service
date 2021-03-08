import * as grpc from 'grpc';
import { ObjectID } from 'bson';
import { TransferError, NotFoundError, ClientError } from '../utils/errors/errors';
import { ApprovalService } from '../approval/approval.service';
import { IApprovalUser, IApproverInfo, ICanApproveToUser, IRequest } from '../approval/approvers.interface';
import { StatusService } from '../status/status.service';
import { IStatus } from '../status/status.interface';
import { TransferRepository } from '../transfer/transfer.repository';
import { Destination, ITransfer } from '../transfer/transfer.interface';
import { ITransferInfo } from './info.interface';
import { IUser } from '../user/user.interface';
import { getUser } from '../user/user.service';

const approvalService: ApprovalService = new ApprovalService();
const statusService: StatusService = new StatusService();

export class DropboxMethods {
  static async GetTransfersInfo(call: grpc.ServerUnaryCall<any>): Promise<{ transfersInfo: ITransferInfo[] }> {
    const fileID: string = call.request.fileID;
    const sharerID: string = call.request.sharerID;

    // Get all transfers that match to fileID and userID
    const partialFilter: Partial<ITransfer> = {};
    sharerID && sharerID.length > 0 ? (partialFilter.sharerID = sharerID) : '';
    fileID && fileID.length > 0 ? (partialFilter.fileID = fileID) : '';
    
    const transfers: ITransfer[] = await TransferRepository.getMany(partialFilter);
    if (!transfers.length) return { transfersInfo: [] };

    const transfersInfo: ITransferInfo[] = await Promise.all(
      transfers.map(async (transfer: ITransfer) => {
        const requestID = transfer.reqID;
        const transferID = transfer._id;
        if (!requestID || !transferID) throw new NotFoundError();

        // Check transfer status at status-service and update the status in mongo
        const statusRes: IStatus = await statusService.getStatus(requestID);

        // Get destination users
        const destUsers: IUser[] = [];
        const failed: string[] = [];
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

        return {
          failed,
          id: transfer._id || '',
          fileID: transfer.fileID,
          from: transfer.sharerID,
          createdAt: transfer.createdAt.getTime(),
          destination: transfer.destination,
          classification: statusRes.classification || '???',
          to: destUsers,
          status: statusRes.status || '???',
        };
      })
    );

    return { transfersInfo };
  }

  static async HasTransfer(call: grpc.ServerUnaryCall<any>): Promise<{ hasTransfer: boolean }> {
    const userID: string = call.request.userID;
    const fileID: string = call.request.fileID;

    const hasTransfer: boolean = await TransferRepository.exists({ userID, fileID });

    return { hasTransfer };
  }

  static async GetApproverInfo(call: grpc.ServerUnaryCall<any>): Promise<IApproverInfo> {
    const id: string = call.request.id;
    const destination: string = call.request.destination;

    if (!(destination in Destination)) throw new ClientError(`destination value: ${destination}, is not supported`);

    const approverInfo: IApproverInfo = await approvalService.getApproverInfo(id, destination);
    return approverInfo;
  }

  static async CanApproveToUser(call: grpc.ServerUnaryCall<any>): Promise<ICanApproveToUser> {
    const userID: string = call.request.userID;
    const approverID: string = call.request.approverID;
    const destination: string = call.request.destination;

    if (!(destination in Destination)) throw new ClientError(`destination value: ${destination}, is not supported`);

    const canApprove: ICanApproveToUser = await approvalService.canApproveToUser(approverID, userID, destination);
    return canApprove;
  }

  static async CreateRequest(call: grpc.ServerUnaryCall<any>) {
    const params = call.request;
    const approvers = params.approvers;
    const destUsers = params.users;
    const sharerID = params.sharerID;
    const destination = params.destination;

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
          userID: destUser.id,
          fileID: params.fileID,
          createdAt: new Date(),
        });
        if (!transfer) throw new TransferError();
      })
    );

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
