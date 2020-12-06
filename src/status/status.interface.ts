import { IUser } from "../utils/user.interface";

export interface IStatus {
    users: IUser[];
    status: string;
}