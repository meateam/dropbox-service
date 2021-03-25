import { config } from '../config';
import { SpikeError } from '../utils/errors/errors';

const GrpcClient = require('grpc-conn-pool');

const client = new GrpcClient('./proto/spike/spike.proto', { serverUrl: config.spike.spikeUrl, serviceName: 'Spike', packageName: 'spike' });

export async function getToken(audience: string, grant_type: string): Promise<string> {
  try {
    const data = await client.GetSpikeToken({ grant_type, audience });
    return data.token;
  } catch (err) {
    throw new SpikeError(`Error in contacting the spike service : ${JSON.stringify(err)}`);
  }
}
