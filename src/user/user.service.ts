import { config } from '../config';
import { Destination } from '../transfer/transfer.interface';
import { UserServiceError } from '../utils/errors/errors';
import { IUser } from './user.interface';

const GrpcClient = require('grpc-conn-pool');

const client = new GrpcClient('./proto/users/users.proto', { serverUrl: config.userUrl, serviceName: 'Users', packageName: 'users' });

export async function getUser(id: string, destination?: Destination): Promise<IUser> {
  try {
    const res = await client.GetUserByID({ id, destination });
    return res.user;
  } catch (err) {
    throw new UserServiceError(`Error in contacting the user service : ${JSON.stringify(err)}`);
  }
}
