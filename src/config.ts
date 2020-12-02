export const config = {
    serviceName: 'dropbox-service',
    spike: {
        audiance: process.env.DROPBOX_AUDIANCE || 'dropbox',
        grantType: process.env.GRANT_TYPE || 'clien_credientials',
        spikeUrl: process.env.SPIKE_SERVICE_URL || 'spike-service:8080',
    },
    approval: {
        approvalUrl: process.env.APPROVAL_URL || 'http://localhost',
    },
}