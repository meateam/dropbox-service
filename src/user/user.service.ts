import { config } from '../config';
import { IUser } from './user.interface';

const GrpcClient = require('grpc-conn-pool');

const client = new GrpcClient("./proto/users/users.proto", { serverUrl: config.userUrl, serviceName: "Users", packageName: "users" });

export async function getUser(id: string): Promise<IUser> {
    try {
        const user: IUser = await client.GetUserByID({ id });
        return user;
    } catch (err) {
        throw new Error(err);
    }
}