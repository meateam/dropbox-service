import * as grpc from 'grpc';
import { ApprovalService } from "../approval/approval.service";
import { StatusService } from "../status/status.service";
import { TransferRepository } from "../transfer/transfer.repository";
import { IApproverInfo, ICanApproveToUser } from "../approval/approvers.interface";
import { TransferError } from '../utils/errors/errors';
import { ITransfer } from '../transfer/transfer.interface';
import { ITransferInfo } from './info.interface';

const approvalService: ApprovalService = new ApprovalService();
const statusService: StatusService = new StatusService();

export class DropboxMethods {

    static async GetTransfersInfo(call: grpc.ServerUnaryCall<any>): Promise<ITransferInfo[]> {
        const fileID = call.request.fileID;
        const userID = call.request.userID;
        const transfers: ITransfer[] = await TransferRepository.getMany({ fileID, userID });

        const transfersInfo: Promise<ITransferInfo[]> = Promise.all(transfers.map(async (transfer: ITransfer) => {
            const info = await statusService.getStatus(transfer._id || "");

            return {
                fileID: transfer.fileID,
                from: transfer.userID,
                createdAt: transfer.createdAt,
                destination: transfer.destination,
                to: info.users,
                status: info.status,
            }
        }));

        return transfersInfo;
    }

    static async HasTransfer(call: grpc.ServerUnaryCall<any>): Promise<{ hasTransfer: boolean }> {
        const userID: string = call.request.userID;
        const fileID: string = call.request.fileID;
        const hasTransfer: boolean = await TransferRepository.exist({ userID, fileID });

        return { hasTransfer };
    }

    static async GetApproverInfo(call: grpc.ServerUnaryCall<any>): Promise<{ approverInfo: IApproverInfo }> {
        const id: string = call.request.id;
        const approverInfo: IApproverInfo = await approvalService.getApproverInfo(id);

        return { approverInfo };
    }


    static async CanApproveToUser(call: grpc.ServerUnaryCall<any>): Promise<ICanApproveToUser> {
        const userID: string = call.request.userID;
        const approverID: string = call.request.approverID;
        const canApprove: ICanApproveToUser = await approvalService.canApproveToUser(approverID, userID);

        return canApprove;
    }


    static async CreateRequest(call: grpc.ServerUnaryCall<any>) {
        const params = call.request;
        const approvers = call.request.approvers;
        approvers.push(call.request.sharerID);

        const transfer = await TransferRepository.create({ userID: params.sharerID, fileID: params.fileID, createdAt: new Date(), destination: params.destination })
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
        });

        return {};
    }
}