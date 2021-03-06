import { ctsDest, tomcalDest } from '../config';
import { Status } from '../status/status.interface';

export interface ITransfer {
  _id?: string;
  status?: Status;
  fileID: string;
  fileName: string;
  classification: string;
  fileOwnerID: string;
  userID: string;
  sharerID: string;
  reqID: string;
  createdAt: Date;
  destination: Destination;
}

export enum Destination {
  TOMCAL = tomcalDest as any,
  CTS = ctsDest as any,
}

export interface IPaginatedTransfer {
  _id?: string;
  docs: ITransfer
}