import { Status } from '../status/status.interface';
import { Destination } from '../transfer/transfer.interface';
import { IUser } from '../user/user.interface';

export interface ITransferInfo {
  fileID: string;
  from: string;
  createdAt: Date;
  destination: Destination;
  to: IUser[];
  status: Status;
  failed: string[];
}
