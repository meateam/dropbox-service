import { ctsDest, tomcalDest } from '../config';
import { Status } from '../status/status.interface';

export interface ITransfer {
  _id?: string;
  fileID: string;
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
