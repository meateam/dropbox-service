import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import * as apm from 'elastic-apm-node';
import { GrpcHealthCheck, HealthCheckResponse, HealthService } from 'grpc-ts-health-check';
import { config } from './config';
import { log, Severity } from './utils/logger';
import { wrapper } from './utils/wrapper';
import { DropboxMethods } from './dropbox/dropbox.methods';

apm.start({
  serviceName: config.serviceName,
  secretToken: config.apm.secretToken,
  verifyServerCert: config.apm.verifyServerCert,
  serverUrl: config.apm.apmURL,
});

export const serviceNames: string[] = ['', 'dropbox.dropboxService'];
export const healthCheckStatusMap: any = {
  '': HealthCheckResponse.ServingStatus.UNKNOWN,
  [config.serviceName]: HealthCheckResponse.ServingStatus.UNKNOWN
};

export class Server {

  private dropbox_proto: any;
  public server: grpc.Server;
  public grpcHealthCheck: GrpcHealthCheck;

  public constructor(address: string) {
    // Create the server
    this.server = new grpc.Server();

    // Register the health service
    this.grpcHealthCheck = new GrpcHealthCheck(healthCheckStatusMap);

    this.initiateProto();
    this.addServices();

    // Bind the server
    this.server.bind(address, grpc.ServerCredentials.createInsecure());
    log(Severity.INFO, `server listening on address: ${address}`, 'server bind');
  }

  private initiateProto() {
    const DROPBOX_PROTO_PATH: string = './proto/dropbox/dropbox.proto';

    // Suggested options for similarity to existing grpc.load behavior
    const dropboxPackageDefinition: protoLoader.PackageDefinition = protoLoader.loadSync(
            DROPBOX_PROTO_PATH, { keepCase: true, longs: String, enums: String, defaults: true, oneofs: true });

    // Has the full package hierarchy
    const dropboxProtoDescriptor: grpc.GrpcObject = grpc.loadPackageDefinition(dropboxPackageDefinition);

    this.dropbox_proto = dropboxProtoDescriptor.dropbox;
  }

  private addServices() {
    this.server.addService(HealthService, this.grpcHealthCheck);

    const dropboxService = {
      CanApproveToUser: wrapper(DropboxMethods.CanApproveToUser),
      CreateRequest: wrapper(DropboxMethods.CreateRequest),
      HasTransfer: wrapper(DropboxMethods.HasTransfer),
      GetTransfersInfo: wrapper(DropboxMethods.GetTransfersInfo),
      GetApproverInfo: wrapper(DropboxMethods.GetApproverInfo)
    };

    this.server.addService(this.dropbox_proto.Dropbox.service, dropboxService);
  }

  public setHealthStatus(status: number): void {
    serviceNames.forEach(serviceName => this.grpcHealthCheck.setStatus(serviceName, status));
  }
}
