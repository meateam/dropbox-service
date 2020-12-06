import * as grpc from 'grpc';
import { TransferRepository } from './transfer.repository';

export class TransferMethods {
    static async HasTransfer(call: grpc.ServerUnaryCall<any>): Promise<{ hasTransfer: boolean }> {
        const userID: string = call.request.userID;
        const fileID: string = call.request.fileID;
        const hasTransfer: boolean = await TransferRepository.exist({ userID, fileID });

        return { hasTransfer };
    }
}