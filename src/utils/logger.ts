import * as winston from 'winston';
import * as os from 'os';
import * as WinstonElasticsearch from 'winston-elasticsearch';
import { config, confLogger } from '../config';
const Elasticsearch = require('winston-elasticsearch');

// index pattern for the logger
export const indexTemplateMapping = require('winston-elasticsearch/index-template-mapping.json');
indexTemplateMapping.index_patterns = `${process.env.LOG_INDEX || 'kdrive'}-*`;

export const logger: winston.Logger = winston.createLogger({
  defaultMeta: { service: config.serviceName, hostname: os.hostname() }
});

if (config.server.debugMode === 'dev') {
  const consoleLogger = new winston.transports.Console();
  logger.add(consoleLogger);
}

const options: WinstonElasticsearch.ElasticsearchTransportOptions = {
  indexPrefix: confLogger.indexPrefix,
  level: 'verbose',
  clientOpts: confLogger.options,
  bufferLimit: 100,
  messageType: 'log',
  ensureMappingTemplate: true,
  mappingTemplate: indexTemplateMapping,
};
const elasticsearch: WinstonElasticsearch.default = new Elasticsearch(options);
logger.add(elasticsearch);

export const log = (level: Severity, message: string, name: string, traceID?: string, meta?: object) => {
  logger.log(level, message, { ...meta, traceID, method: name });
};

export enum Severity {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    VERBOSE = 'verbose',
    DEBUG = 'debug',
    SILLY = 'silly',
}
