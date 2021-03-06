import { ServerError } from '../utils/errors/errors';
import { IPaginatedTransfer, ITransfer } from './transfer.interface';
import { transferModel } from './transfer.model';

export class TransferRepository {
  static async create(request: ITransfer): Promise<ITransfer> {
    if (!request) throw new ServerError();
    const transfer: ITransfer = await transferModel.create(request);
    return transfer;
  }

  static async getMany(filter: any, pageNum = 0, pageSize = 0): Promise<IPaginatedTransfer[]> {
    const startingIndex : number = pageNum * pageSize;
    const aggregationQuery : any[] = [
      {
        $match: filter
      },
      {
        $group: {
          _id: '$reqID',
          docs:{
            $first: {
              _id: '$_id',
              reqID: '$reqID',
              fileID: '$fileID',
              fileName: '$fileName',
              classification: '$classification',
              fileOwnerID: '$fileOwnerID',
              status: '$status',
              userID: '$userID',
              sharerID: '$sharerID',
              createdAt: '$createdAt',
              destination: '$destination',
            }
          }
        }
      },
    { $sort: { _id: -1 } }];
    if (pageSize > 0) {
      aggregationQuery.push({ $skip: startingIndex }, { $limit: pageSize });
    }
    const transfers: IPaginatedTransfer[] = await transferModel.aggregate(aggregationQuery);
    return transfers;
  }

  static async getSize(filter: any): Promise<number> {
    const aggregationQuery : any[] = [
      {
        $match: filter
      },
      {
        $group: {
          _id: '$reqID',
        }
      },
      {
        $count: 'count'
      }];

    const transfersCount: { count: number }[] = await transferModel.aggregate(aggregationQuery);
    return transfersCount.length > 0 ? transfersCount[0].count : 0;
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
