import * as grpc from 'grpc';
import { ApprovalService } from '../approval/approval.service';
import { StatusService } from '../status/status.service';
import { TransferRepository } from '../transfer/transfer.repository';
import { IApprovalUser, IApproverInfo, ICanApproveToUser, IRequest } from '../approval/approvers.interface';
import { TransferError, NotFoundError, ClientError } from '../utils/errors/errors';
import { Destination, ITransfer } from '../transfer/transfer.interface';
import { ITransferInfo } from './info.interface';
import { IStatus } from '../status/status.interface';
import { IUser } from '../user/user.interface';
import { getUser } from '../user/user.service';

const approvalService: ApprovalService = new ApprovalService();
const statusService: StatusService = new StatusService();

export class DropboxMethods {
  static async GetTransfersInfo(call: grpc.ServerUnaryCall<any>): Promise<{transfersInfo: ITransferInfo[]}> {
    const fileID = call.request.fileID;
    const userID = call.request.userID;

    const transfers: ITransfer[] = await TransferRepository.getMany({ fileID, userID });
    if (!transfers.length) throw new NotFoundError();

    const transfersInfo: ITransferInfo[] = await Promise.all(transfers.map(async (transfer: ITransfer) => {
      const transferID = transfer._id;
      if (!transferID) throw new NotFoundError();

      const statusRes: IStatus = await statusService.getStatus(transferID);
      await TransferRepository.updateByID(transferID, { status: statusRes.status });

      const destUsers: IApprovalUser[] = await Promise.all(statusRes.direction.to.map(async (destUser) => {
        const user: IUser = await getUser(destUser, transfer.destination);
        const userApproval: IApprovalUser = { id: user.id, name: user.fullName };
        return userApproval;
      }));

      return {
        fileID: transfer.fileID,
        from: transfer.userID,
        createdAt: transfer.createdAt,
        destination: transfer.destination,
        to: destUsers,
        status: statusRes.status || transfer.status || '???',
      };
    }));

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
    const destination: Destination = call.request.destination;

    if (!(destination in Destination)) {
      throw new ClientError('destination value is not supported');
    }

    const approverInfo: IApproverInfo = await approvalService.getApproverInfo(id, destination);

    return approverInfo;
  }

  static async CanApproveToUser(call: grpc.ServerUnaryCall<any>): Promise<ICanApproveToUser> {
    const userID: string = call.request.userID;
    const approverID: string = call.request.approverID;
    const destination: Destination = call.request.destination;

    if (!(destination in Destination)) {
      throw new ClientError('destination value is not supported');
    }

    const canApprove: ICanApproveToUser = await approvalService.canApproveToUser(approverID, userID, destination);

    return canApprove;
  }

  static async CreateRequest(call: grpc.ServerUnaryCall<any>) {
    const params = call.request;
    const approvers = call.request.approvers;

    if (!(params.destination in Destination)) {
      throw new ClientError('destination value is not supported');
    }

    approvers.push(call.request.sharerID);

    const transfer = await TransferRepository.create({ userID: params.sharerID, fileID: params.fileID, createdAt: new Date(), destination: params.destination });
    if (!transfer) throw new TransferError();

    const request: IRequest = {
      approvers,
      id: transfer._id,
      fileId: params.fileID,
      fileName: params.fileName,
      to: params.users,
      from: params.sharerID,
      info: params.info,
      classification: params.classification,
    };

    await approvalService.createRequest(request, params.destination);

    return {};
  }
}
