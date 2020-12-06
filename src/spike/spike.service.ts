import { config } from '../config';

const protoLoader = require('@grpc/proto-loader');
const grpc = require('grpc');

const packageDefinition = protoLoader.loadSync('../../proto/dropbox/dropbox.proto');
const spike_proto = grpc.loadPackageDefinition(packageDefinition).spike;

export async function getToken(audience: string, grant_type: string): Promise<string> {
    const client = await new spike_proto.Spike(config.spike.spikeUrl, grpc.credentials.createInsecure());

    return new Promise((resolve, reject) => {
        client.GetSpikeToken({ grant_type, audience }, (err: Error, response: any) => {
            if (err) {
                reject(`Error contacting spike: ${err}`);
            } else {
                resolve(response.token);
            }
        });
    });
}