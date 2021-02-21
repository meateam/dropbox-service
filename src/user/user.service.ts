import { config } from '../config';
import { Destination } from '../transfer/transfer.interface';
import { UserServiceError } from '../utils/errors/errors';
import { IUser } from './user.interface';

const GrpcClient = require('grpc-conn-pool');

const client = new GrpcClient('./proto/users/users.proto', { serverUrl: config.userUrl, serviceName: 'Users', packageName: 'users' });

export async function getUser(id: string, destination?: Destination): Promise<IUser> {
  try {
    const user = await client.GetUserByID({ id, destination });
    console.log(user);
    return user;
  } catch (err) {
    throw new UserServiceError(err);
  }
}
