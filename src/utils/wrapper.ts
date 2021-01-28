import * as grpc from 'grpc';
import * as apm from 'elastic-apm-node';
import * as _ from 'lodash';
import { Severity, log } from "./logger";
import { statusToString, validateGrpcError } from './errors/grpc.status';
import { ApplicationError } from './errors/errors';

/**
 * extracts the wanted information for the logger from the response.
 * for example: extracts only the file ids from the returned array of files.
 * @param res - the result of the method called in file.grpc
 */
function extractResLog(res: any): object {
    if (!res) return {};

    return _.cloneDeep(res);
}

/**
 * extracts the wanted information for the logger from the request.
 * for example: extracts only relevant fields in the queryFile.
 * @param req - the call.request received in the service.
 */
function extractReqLog(req: any): object {
    return _.cloneDeep(req);
}


export function getCurrTraceId(): string {
    try {
        return apm.currentTransaction ? apm.currentTransaction.traceparent.split('-')[1] : '';
    } catch (err) {
        // Should never get here. The log is set after apm starts.
        log(Severity.ERROR, 'error on getting trace id', 'apm');
        return '';
    }
}


/**
 * wraps all of the service methods, creating the transaction for the apm and the logger,
 * and sends them to the elastic server.
 * @param func - the method called and wrapped.
 */
export function wrapper(func: Function):
    (call: grpc.ServerUnaryCall<Object>, callback: grpc.requestCallback<Object>) => Promise<void> {
    return async (call: grpc.ServerUnaryCall<Object>, callback: grpc.requestCallback<Object>) => {
        try {
            const traceparent: grpc.MetadataValue[] = call.metadata.get('elastic-apm-traceparent');
            const transOptions = (traceparent.length > 0) ? { childOf: traceparent[0].toString() } : {};
            apm.startTransaction(`/dropbox.dropboxService/${func.name}`, 'request', transOptions);
            const traceID: string = getCurrTraceId();
            const reqInfo: object = extractReqLog(call.request);
            log(Severity.INFO, 'request', func.name, traceID, reqInfo);

            const res = await func(call, callback);
            apm.endTransaction(statusToString(grpc.status.OK));
            const resInfo: object = extractResLog(res);
            log(Severity.INFO, 'response', func.name, traceID, resInfo);
            callback(null, res);
        } catch (err) {
            const validatedErr: ApplicationError = validateGrpcError(err);
            log(Severity.ERROR, func.name, err.message, getCurrTraceId());
            apm.endTransaction(validatedErr.name);
            callback(validatedErr);
        }
    };
}