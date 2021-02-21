import { IApprovalUser } from '../approval/approvers.interface';
import { Destination } from '../transfer/transfer.interface';

export interface ITransferInfo {
  fileID: string;
  from: string;
  createdAt: Date;
  destination: Destination;
  to: IApprovalUser[];
  status: string;
}
