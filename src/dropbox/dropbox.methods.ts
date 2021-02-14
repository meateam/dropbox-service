import * as grpc from 'grpc';
import { ApprovalService } from "../approval/approval.service";
import { StatusService } from "../status/status.service";
import { TransferRepository } from "../transfer/transfer.repository";
import { IApproverInfo, ICanApproveToUser } from "../approval/approvers.interface";
import { TransferError, NotFoundError } from '../utils/errors/errors';
import { Destination, ITransfer } from '../transfer/transfer.interface';
import { ITransferInfo } from './info.interface';

const approvalService: ApprovalService = new ApprovalService();
const statusService: StatusService = new StatusService();

export class DropboxMethods {
    static async GetTransfersInfo(call: grpc.ServerUnaryCall<any>): Promise<ITransferInfo[]> {
        const fileID = call.request.fileID;
        const userID = call.request.userID;

        const transfers: ITransfer[] = await TransferRepository.getMany({ fileID, userID });
        if (!transfers.length) throw new NotFoundError();

        const transfersInfo: Promise<ITransferInfo[]> = Promise.all(
            transfers.map(async (transfer: ITransfer) => {
                const transferID = transfer._id;

                if (!transferID) throw new NotFoundError();

                const info = await statusService.getStatus(transferID);
                await TransferRepository.updateByID(transferID, { status: info.status });

                return {
                    fileID: transfer.fileID,
                    from: transfer.userID,
                    createdAt: transfer.createdAt,
                    destination: transfer.destination,
                    to: info.users,
                    status: info.status || transfer.status || "???",
                }
            }));

        return transfersInfo;
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

        const approverInfo: IApproverInfo = await approvalService.getApproverInfo(id, destination);

        return approverInfo;
    }

    static async CanApproveToUser(call: grpc.ServerUnaryCall<any>): Promise<ICanApproveToUser> {
        const userID: string = call.request.userID;
        const approverID: string = call.request.approverID;
        const destination: Destination = call.request.destination;

        const canApprove: ICanApproveToUser = await approvalService.canApproveToUser(approverID, userID, destination);

        return canApprove;
    }

    static async CreateRequest(call: grpc.ServerUnaryCall<any>) {
        const params = call.request;
        const approvers = call.request.approvers;
        
        approvers.push(call.request.sharerID);

        const transfer = await TransferRepository.create({ userID: params.sharerID, fileID: params.fileID, createdAt: new Date(), destination: params.destination });
        if (!transfer) throw new TransferError();

        await approvalService.createRequest({
            approvers,
            id: transfer._id,
            fileID: params.fileID,
            fileName: params.fileName,
            to: params.users,
            from: params.sharerID,
            info: params.info,
            classification: params.classification,
            destination: params.destination
        });


        return {};
    }
}