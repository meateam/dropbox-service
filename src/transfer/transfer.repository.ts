import { ServerError } from '../utils/errors/errors';
import { ITransfer } from './transfer.interface';
import { transferModel } from './transfer.model';

export class TransferRepository {
    static async create(request: ITransfer) {
        if (!request) throw new ServerError();
        const transfer: ITransfer = await transferModel.create(request);
        return transfer;
    }

    static async getMany(filter: Partial<ITransfer>) {
        const transfers: ITransfer[] | [] = await transferModel.find(filter).exec();
        return transfers;
    }

    static async getByID(id: string) {
        const transfer: ITransfer | null = await transferModel.findById(id).exec();
        return transfer;
    }
}