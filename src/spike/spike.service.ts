import { config } from '../config';

const GrpcClient = require('grpc-conn-pool');

const client = new GrpcClient("./proto/spike/spike.proto", { serverUrl: config.spike.spikeUrl, serviceName: "Spike", packageName: "spike" });

export async function getToken(audience: string, grant_type: string): Promise<string> {
    try {
        const token = await client.GetSpikeToken({ grant_type, audience });
        return token;
    } catch (err) {
        throw new Error(err);
    }
}