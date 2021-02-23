export interface ITransfer {
  _id?: string;
  status?: string;
  fileID: string;
  userID: string;
  createdAt: Date;
  destination: Destination;
}

export enum Destination {
    TOMCAL = 'TOMCAL',
    CTS = 'CTS'
}
