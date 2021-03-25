import * as mongoose from 'mongoose';
import { HealthCheckResponse } from 'grpc-ts-health-check';
import { Server } from '../server';
import { config } from '../config';
import { log, Severity } from './logger';
import { getCurrTraceId } from './wrapper';

export async function connectMongo(server: Server) {
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
    server.setHealthStatus(HealthCheckResponse.ServingStatus.SERVING);
  } catch (err) {
    server.setHealthStatus(HealthCheckResponse.ServingStatus.NOT_SERVING);
    log(Severity.ERROR, `did not connect to mongo: ${err}`, 'connectDB');
  }

  db.on('error', (err) => {
    log(Severity.ERROR, 'mongo connection error!', 'connectDB', getCurrTraceId(), err);
    server.setHealthStatus(HealthCheckResponse.ServingStatus.NOT_SERVING);
  });
  db.on('disconnected', () => {
    log(Severity.ERROR, 'mongo disconnected', 'connectDB');
    server.setHealthStatus(HealthCheckResponse.ServingStatus.NOT_SERVING);
  });
}
