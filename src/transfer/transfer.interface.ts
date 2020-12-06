export interface ITransfer {
    _id?: string;
    fileID: string;
    userID: string;
    createdAt: Date;
    destination: Destination;
}

export enum Destination {
    z = "Z",
}