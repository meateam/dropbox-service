import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import * as apm from 'elastic-apm-node';
import { GrpcHealthCheck, HealthCheckResponse, HealthService } from 'grpc-ts-health-check';
import { config } from './config';
import { log, Severity } from './utils/logger';
import { wrapper } from './utils/wrapper';
import { FileMethods } from './file/file.grpc';
import { UploadMethods } from './upload/upload.grpc';
import { QuotaMethods } from './quota/quota.grpc';

apm.start({
    serviceName: config.serviceName,
    secretToken,
    verifyServerCert,
    serverUrl: apmURL,
});

const DROPBOX_PROTO_PATH: string = `${__dirname}/../proto/file/file.proto`;

// Suggested options for similarity to existing grpc.load behavior
const dropboxPackageDefinition: protoLoader.PackageDefinition = protoLoader.loadSync(
    DROPBOX_PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });

// Has the full package hierarchy
const dropboxProtoDescriptor: grpc.GrpcObject = grpc.loadPackageDefinition(dropboxPackageDefinition);

const dropbox_proto: any = dropboxProtoDescriptor.file;

export const serviceNames: string[] = ['', 'file.fileService'];
export const healthCheckStatusMap = {
    '': HealthCheckResponse.ServingStatus.UNKNOWN,
    serviceName: HealthCheckResponse.ServingStatus.UNKNOWN
};

// The FileServer class, containing all of the FileServer methods.
export class Server {

    public server: grpc.Server;
    public grpcHealthCheck: GrpcHealthCheck;

    public constructor(address: string) {
        this.server = new grpc.Server();
        this.addServices();
        this.server.bind(address, grpc.ServerCredentials.createInsecure());
        log(Severity.INFO, `server listening on address: ${address}`, 'server bind');
    }

    private addServices() {
        // Register the health service
        this.grpcHealthCheck = new GrpcHealthCheck(healthCheckStatusMap);
        this.server.addService(HealthService, this.grpcHealthCheck);

        const dropboxService = {
            GenerateKey: wrapper(UploadMethods.GenerateKey),
            CreateUpload: wrapper(UploadMethods.CreateUpload),
            CreateUpdate: wrapper(UploadMethods.CreateUpdate),
            UpdateUploadID: wrapper(UploadMethods.UpdateUploadID),
            GetUploadByID: wrapper(UploadMethods.GetUploadByID),
            DeleteUploadByID: wrapper(UploadMethods.DeleteUploadByID),
            DeleteUploadByKey: wrapper(UploadMethods.DeleteUploadByKey),
            GetFileByID: wrapper(FileMethods.GetFileByID),
            GetFileByKey: wrapper(FileMethods.GetFileByKey),
            GetFilesByFolder: wrapper(FileMethods.GetFilesByFolder),
            GetDescendantsByFolder: wrapper(FileMethods.GetDescendantsByFolder),
            CreateFile: wrapper(FileMethods.CreateFile),
            DeleteFile: wrapper(FileMethods.DeleteFile),
            IsAllowed: wrapper(FileMethods.IsAllowed),
            UpdateFiles: wrapper(FileMethods.UpdateFiles),
            GetAncestors: wrapper(FileMethods.GetAncestors),
            GetDescendantsByID: wrapper(FileMethods.GetDescendantsByID),
            DeleteFileByID: wrapper(FileMethods.DeleteFileByID),
        };

        this.server.addService(dropbox_proto.Dropbox.service, dropboxService);
    }
}
