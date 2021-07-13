import * as grpc from 'grpc';
import * as protoLoader from '@grpc/proto-loader';
import * as apm from 'elastic-apm-node';
import { config } from './config';
import { log, Severity } from './utils/logger';
import { wrapper } from './utils/wrapper';
import { DropboxMethods } from './dropbox/dropbox.methods';
import {
  GrpcHealthCheck,
  HealthCheckRequest,
  HealthCheckResponse,
  HealthClient,
  HealthService,
} from 'grpc-ts-health-check';

apm.start({
  serviceName: config.serviceName,
  secretToken: config.apm.secretToken,
  verifyServerCert: config.apm.verifyServerCert,
  serverUrl: config.apm.apmURL,
});

export const serviceNames: string[] = ['', 'dropbox.dropboxService'];
export const healthCheckStatusMap: any = {
  '': HealthCheckResponse.ServingStatus.UNKNOWN,
  [config.serviceName]: HealthCheckResponse.ServingStatus.UNKNOWN,
};
const servicesNum = Object.keys(healthCheckStatusMap).length;

export class Server {
  private dropbox_proto: any;
  public server: grpc.Server;
  public grpcHealthCheck: GrpcHealthCheck;
  public requests: HealthCheckRequest[];
  public healthClient: HealthClient;

  public constructor(address: string) {
    // Create the server
    this.server = new grpc.Server();
    this.requests = Array<HealthCheckRequest>(servicesNum);

    // RegisterHealthService the health service
    this.grpcHealthCheck = new GrpcHealthCheck(healthCheckStatusMap);

    // Create the health client
    this.healthClient = new HealthClient(address, grpc.credentials.createInsecure());

    this.initiateProto();
    this.addServices();

    // Bind the server
    this.server.bind(address, grpc.ServerCredentials.createInsecure());
    log(Severity.INFO, `server listening on address: ${address}`, 'server bind');
  }

  private initiateProto() {
    const DROPBOX_PROTO_PATH: string = './proto/dropbox/dropbox.proto';

    // Suggested options for similarity to existing grpc.load behavior
    const dropboxPackageDefinition: protoLoader.PackageDefinition = protoLoader.loadSync(DROPBOX_PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true,
    });

    // Has the full package hierarchy
    const dropboxProtoDescriptor: grpc.GrpcObject = grpc.loadPackageDefinition(dropboxPackageDefinition);

    this.dropbox_proto = dropboxProtoDescriptor.dropbox;
  }

  private addServices() {
    this.server.addService(HealthService, this.grpcHealthCheck);

    // Set services
    for (const service in healthCheckStatusMap) {
      const request = new HealthCheckRequest();
      request.setService(service);
      this.requests.push(request);
    }

    const dropboxService = {
      CanApproveToUser: wrapper(DropboxMethods.CanApproveToUser),
      CreateRequest: wrapper(DropboxMethods.CreateRequest),
      HasTransfer: wrapper(DropboxMethods.HasTransfer),
      GetTransfersInfo: wrapper(DropboxMethods.GetTransfersInfo),
      GetApproverInfo: wrapper(DropboxMethods.GetApproverInfo),
    };

    this.server.addService(this.dropbox_proto.Dropbox.service, dropboxService);
  }

  setHealthStatus(status: HealthCheckResponse.ServingStatus): void {
    this.requests.forEach((request) => {
      const serviceName: string = request.getService();
      healthCheckStatusMap[serviceName] = status;
    });
  }
}
