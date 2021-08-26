import * as mongoose from 'mongoose';
import { HealthCheckResponse } from 'grpc-ts-health-check';
import { Server } from '../server';
import { config } from '../config';
import { log, Severity } from './logger';
import { getCurrTraceId } from './wrapper';

export async function connectMongo(server: Server) {
  log(Severity.INFO, 'trying to mongo server', 'connectDB');
  const db = mongoose.connection;

  try {
    await startConnectionAttempts(server);
  } catch (err) {
    server.setHealthStatus(HealthCheckResponse.ServingStatus.NOT_SERVING);
    log(Severity.ERROR, `did not connect to mongo: ${err}`, 'connectDB');
  }

  db.on('connected', () => {
    log(Severity.INFO, `connected to ${config.mongo.connectionString}`, 'connectDB');
    server.setHealthStatus(HealthCheckResponse.ServingStatus.SERVING);
  });
  db.on('error', (err) => {
    log(Severity.ERROR, 'mongo connection error!', 'connectDB', getCurrTraceId(), err);
    server.setHealthStatus(HealthCheckResponse.ServingStatus.NOT_SERVING);
  });
  db.on('disconnected', () => {
    log(Severity.ERROR, 'mongo disconnected', 'connectDB');
    server.setHealthStatus(HealthCheckResponse.ServingStatus.NOT_SERVING);
  });
}

/**
 * Attempts to connect to mongo connectionRetries times.
 * Waits reconnectTimeout ms bewteen attempts.
 * @param server - the server trying to connect.
 */
async function startConnectionAttempts(server: Server) {
  const retries = parseInt(config.mongo.connectionRetries, 10);
  const timeout = parseInt(config.mongo.reconnectTimeout, 10);

  for (let i = 1; i <= retries; i++) {
    const connectionRes: { success: boolean; error: Error | null } = await connect();

    // if mongo connection attempt has failed
    if (!connectionRes.success) {
      log(Severity.ERROR, `connection retry (${i}/${retries}) ${connectionRes.error}`, 'connectDB', getCurrTraceId(), {
        errMsg: connectionRes.error?.message,
        stack: connectionRes.error?.stack,
      });

      server.setHealthStatus(HealthCheckResponse.ServingStatus.NOT_SERVING);
      await sleep(timeout);
    } else {
      log(Severity.INFO, `connected to ${config.mongo.connectionString}`, 'connectDB');
      server.setHealthStatus(HealthCheckResponse.ServingStatus.SERVING);
      break;
    }
  }
}

/**
 * Connects to mongo with mongoConnectionString.
 */
async function connect(): Promise<{ success: boolean; error: Error | null }> {
  await mongoose.connect(
    config.mongo.connectionString,
    {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    },
    async (err) => {
      return { success: false, error: err };
    }
  );

  return { success: true, error: null };
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
