import { ServerError } from '../utils/errors/errors';
import { ITransfer } from './transfer.interface';
import { transferModel } from './transfer.model';

export class TransferRepository {
  static async create(request: ITransfer): Promise<ITransfer> {
    if (!request) throw new ServerError();
    const transfer: ITransfer = await transferModel.create(request);
    return transfer;
  }

  static async getMany(filter: Partial<ITransfer>, distinctField?: string): Promise<ITransfer[]> {
    let transfers: ITransfer[];
    if(distinctField){
      transfers = await transferModel.aggregate([{
        $group: {
            _id: '$reqID',
            "docs": {
                $first: {
                    "fileID": "$fileID",
                    "fileName": "$fileName",
                    "fileOwnerID": "$fileOwnerID"
                }
            }
        }
    }])
      // transfers = await transferModel.find(filter).distinct(distinctField, {}).exec();
    } else {
      transfers= await transferModel.find(filter).exec();
    }
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

  static async updateByID(id: string, value: Partial<ITransfer>) {
    const transfer: ITransfer = await transferModel.update({ _id: id }, value);
    return transfer;
  }

  static async deleteByID(id: string) {
    await transferModel.deleteOne({ _id: id });
  }
}
