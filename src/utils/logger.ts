import * as winston from 'winston';
import * as os from 'os';
import { config } from '../config';

export enum Severity {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    VERBOSE = 'verbose',
    DEBUG = 'debug',
    SILLY = 'silly',
}


export const log = (level: Severity, message: string, name: string, traceID?: string, meta?: object) => {
    // Console logs for debugging only.
    if (traceID) {
        console.log(`level: ${level}, message: ${message}, name: ${name}, traceID: ${traceID}, meta:`);
    } else {
        console.log(`level: ${level}, message: ${message}, name: ${name}, meta:`);
    }
    if (meta) {
        console.log(meta);
    }

    logger.log(level, message, { ...meta, traceID, method: name });
};

export const logger: winston.Logger = winston.createLogger({
    defaultMeta: { service: config.serviceName, hostname: os.hostname() },
});

if (config.server.debugMode === 'dev') {
    const consoleLogger = new winston.transports.Console();
    logger.add(consoleLogger);
  }