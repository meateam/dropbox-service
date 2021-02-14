import { Destination } from "./transfer/transfer.interface"

export const config = {
    serviceName: 'dropbox-service',
    server: {
        bindAddress: process.env.BIND_ADDRESS || '0.0.0.0:8080',
        debugMode: process.env.NODE_ENV || 'prod'
    },
    spike: {
        audiance: process.env.AUDIANCE || 'dropbox',
        grantType: process.env.GRANT_TYPE || 'clien_credientials',
        spikeUrl: process.env.SPIKE_SERVICE_URL || 'spike-service:8080',
    },
    userUrl: process.env.USERS_RPC_ENDPOINT || 'user-service:8080',
    status: {
        statusUrl: process.env.STATUS_URL || 'http://localhost',
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
    }
}

export const dests = {
    [Destination.z]: {approvalUrl: process.env.APPROVAL_URL_Z || 'http://localhost'},
    [Destination.c]: {approvalUrl: process.env.APPROVAL_URL_C || 'http://localhost'}
}