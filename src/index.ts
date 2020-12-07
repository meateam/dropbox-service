import * as mongoose from 'mongoose';
import { HealthCheckResponse } from 'grpc-ts-health-check';
import { Server, serviceNames } from './server';
import { config } from './config';
import { log, Severity } from './utils/logger';
import { getCurrTraceId } from './utils/wrapper';


(async () => {
    const server: Server = new Server(config.server.bindAddress);
    await connectMongo(server);
    server.server.start();
})();

async function connectMongo(server: Server) {
    const db = mongoose.connection;
    log(Severity.INFO, 'trying to mongo server', 'connectDB');

    try {
        await mongoose.connect(config.mongo.connectionString, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        log(Severity.INFO, `connected to ${config.mongo.connectionString}`, 'connectDB');
        setHealthStatus(server, HealthCheckResponse.ServingStatus.SERVING);
    } catch (err) {
        setHealthStatus(server, HealthCheckResponse.ServingStatus.NOT_SERVING);
        log(Severity.ERROR, `did not connect to mongo: ${err}`, 'connectDB');
    }

    db.on('error', (err) => {
        log(Severity.ERROR, 'mongo connection error!', 'connectDB', getCurrTraceId(), err);
        setHealthStatus(server, HealthCheckResponse.ServingStatus.NOT_SERVING);
    });
    db.on('disconnected', () => {
        log(Severity.ERROR, 'mongo disconnected', 'connectDB');
        setHealthStatus(server, HealthCheckResponse.ServingStatus.NOT_SERVING);
    });
}

function setHealthStatus(server: Server, status: number): void {
    for (let i = 0; i < serviceNames.length; i++) {
        server.grpcHealthCheck.setStatus(serviceNames[i], status);
    }
}
