import { ctsDest, tomcalDest } from '../config';

export interface ITransfer {
  _id?: string;
  status?: string;
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
