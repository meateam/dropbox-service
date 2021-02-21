import { Destination } from './transfer/transfer.interface';

export const config = {
  serviceName: 'dropbox-service',
  server: {
    bindAddress: process.env.BIND_ADDRESS || '0.0.0.0:8080',
    debugMode: process.env.NODE_ENV || 'dev'
  },
  spike: {
    audience: process.env.DROPBOX_AUDIENCE || '_LCF5avgIpoXSWhY5Jl8mMi0Q~4_~R',
    grantType: process.env.DROPBOX_GRANT_TYPE || 'client_credentials',
    spikeUrl: process.env.SPIKE_SERVICE_URL || 'spike-service:8080',
  },
  userUrl: process.env.USERS_RPC_ENDPOINT || 'user-service:8080',
  status: {
    statusUrl: process.env.DROPBOX_STATUS_URL || 'http://localhost',
  },
  apm: {
    secretToken: process.env.APM_SECRET_TOKEN || '',
    verifyServerCert: process.env.ELASTIC_APM_VERIFY_SERVER_CERT === 'true',
    apmURL: process.env.ELASTIC_APM_SERVER_URL || 'http://localhost:8200'
  },
  mongo: {
    connectionString: process.env.MONGO_HOST || 'mongodb://mongo:27017/kdrive',
    connectionRetries: process.env.RECONNECT_ATTEMPTS || '5',
    reconnectTimeout: process.env.RECONNECT_TIMEOUT || '2000',
  },
};

const esHost: string = process.env.ELASTICSEARCH_URL || 'http://localhost:9200';
const esUser: string = process.env.ELASTICSEARCH_USER || '';
const esPass: string = process.env.ELASTICSEARCH_PASSWORD || '';

export const confLogger = {
  options: {
    hosts: esHost && esHost.split(','),
      // Might be auth instead, not sure.
    httpAuth: `${esUser}:${esPass}`,
  },
  indexPrefix: process.env.LOG_INDEX || 'kdrive',
};

export const dests = {
  [Destination.z]: { approvalUrl: process.env.DROPBOX_APPROVAL_URL_Z || 'http://localhost' },
  [Destination.c]: { approvalUrl: process.env.DROPBOX_APPROVAL_URL_C || 'http://localhost' }
};
