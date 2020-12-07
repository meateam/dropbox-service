import { ServerError } from '../utils/errors/errors';
import { ITransfer } from './transfer.interface';
import { transferModel } from './transfer.model';

export class TransferRepository {
    static async create(request: ITransfer): Promise<ITransfer> {
        if (!request) throw new ServerError();
        const transfer: ITransfer = await transferModel.create(request);
        return transfer;
    }

    static async getMany(filter: Partial<ITransfer>): Promise<ITransfer[]> {
        const transfers: ITransfer[] = await transferModel.find(filter).exec();
        return transfers;
    }

    static async getByID(id: string): Promise<ITransfer | null> {
        const transfer: ITransfer | null = await transferModel.findById(id).exec();
        return transfer;
    }

    static async exists(filter: Partial<ITransfer>): Promise<boolean> {
        const exists: boolean = await transferModel.exists(filter);
        return exists;
    }

    static async deleteByID(id: string) {
        await transferModel.deleteOne({ _id: id })
    }
}