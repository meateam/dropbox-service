import { Status } from '../status/status.interface';
import { Destination } from '../transfer/transfer.interface';
import { IUser } from '../user/user.interface';

export interface ITransferInfo {
  id: string;
  fileID: string;
  from: string;
  createdAt: Date | number;
  destination: Destination;
  to: IUser[];
  classification: string;
  status: Status[];
  failed: string[];
}
