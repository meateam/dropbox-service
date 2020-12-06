import * as grpc from 'grpc';
import { ApprovalService } from "./approval.service";
import { TransferRepository } from "../transfer/transfer.repository";
import { IApproverInfo, ICanApproveToUser, IUser } from "./approvers.interface";
import { TransferError } from '../utils/errors/errors';

const approvalService: ApprovalService = new ApprovalService();

export class ApprovalMethods {

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
        const to: IUser[] = params.users.map((user: any) => { return { id: user.id, name: user.full_name } });
        const approvers = call.request.approvers;
        approvers.push(call.request.sharerID);

        const transfer = await TransferRepository.create({ userID: params.sharerID, fileID: params.fileID, createdAt: new Date(), destination: params.destination })
        if (!transfer) throw new TransferError();

        await approvalService.createRequest({
            to,
            approvers,
            id: transfer._id,
            fileID: params.fileID,
            fileName: params.fileName,
            from: params.sharerID,
            info: params.info,
            classification: params.classification,
        });

        return {};
    }
}