// package: dropbox
// file: dropbox.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as dropbox_pb from "./dropbox_pb";

interface IDropboxService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getApproverInfo: IDropboxService_IGetApproverInfo;
    canApproveToUser: IDropboxService_ICanApproveToUser;
    createRequest: IDropboxService_ICreateRequest;
    hasTransfer: IDropboxService_IHasTransfer;
    getTransfersInfo: IDropboxService_IGetTransfersInfo;
}

interface IDropboxService_IGetApproverInfo extends grpc.MethodDefinition<dropbox_pb.GetApproverInfoRequest, dropbox_pb.GetApproverInfoResponse> {
    path: "/dropbox.Dropbox/GetApproverInfo";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dropbox_pb.GetApproverInfoRequest>;
    requestDeserialize: grpc.deserialize<dropbox_pb.GetApproverInfoRequest>;
    responseSerialize: grpc.serialize<dropbox_pb.GetApproverInfoResponse>;
    responseDeserialize: grpc.deserialize<dropbox_pb.GetApproverInfoResponse>;
}
interface IDropboxService_ICanApproveToUser extends grpc.MethodDefinition<dropbox_pb.CanApproveToUserRequest, dropbox_pb.CanApproveToUserResponse> {
    path: "/dropbox.Dropbox/CanApproveToUser";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dropbox_pb.CanApproveToUserRequest>;
    requestDeserialize: grpc.deserialize<dropbox_pb.CanApproveToUserRequest>;
    responseSerialize: grpc.serialize<dropbox_pb.CanApproveToUserResponse>;
    responseDeserialize: grpc.deserialize<dropbox_pb.CanApproveToUserResponse>;
}
interface IDropboxService_ICreateRequest extends grpc.MethodDefinition<dropbox_pb.CreateRequestRequest, dropbox_pb.CreateRequestResponse> {
    path: "/dropbox.Dropbox/CreateRequest";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dropbox_pb.CreateRequestRequest>;
    requestDeserialize: grpc.deserialize<dropbox_pb.CreateRequestRequest>;
    responseSerialize: grpc.serialize<dropbox_pb.CreateRequestResponse>;
    responseDeserialize: grpc.deserialize<dropbox_pb.CreateRequestResponse>;
}
interface IDropboxService_IHasTransfer extends grpc.MethodDefinition<dropbox_pb.HasTransferRequest, dropbox_pb.HasTransferResponse> {
    path: "/dropbox.Dropbox/HasTransfer";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dropbox_pb.HasTransferRequest>;
    requestDeserialize: grpc.deserialize<dropbox_pb.HasTransferRequest>;
    responseSerialize: grpc.serialize<dropbox_pb.HasTransferResponse>;
    responseDeserialize: grpc.deserialize<dropbox_pb.HasTransferResponse>;
}
interface IDropboxService_IGetTransfersInfo extends grpc.MethodDefinition<dropbox_pb.GetTransfersInfoRequest, dropbox_pb.GetTransfersInfoResponse> {
    path: "/dropbox.Dropbox/GetTransfersInfo";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<dropbox_pb.GetTransfersInfoRequest>;
    requestDeserialize: grpc.deserialize<dropbox_pb.GetTransfersInfoRequest>;
    responseSerialize: grpc.serialize<dropbox_pb.GetTransfersInfoResponse>;
    responseDeserialize: grpc.deserialize<dropbox_pb.GetTransfersInfoResponse>;
}

export const DropboxService: IDropboxService;

export interface IDropboxServer {
    getApproverInfo: grpc.handleUnaryCall<dropbox_pb.GetApproverInfoRequest, dropbox_pb.GetApproverInfoResponse>;
    canApproveToUser: grpc.handleUnaryCall<dropbox_pb.CanApproveToUserRequest, dropbox_pb.CanApproveToUserResponse>;
    createRequest: grpc.handleUnaryCall<dropbox_pb.CreateRequestRequest, dropbox_pb.CreateRequestResponse>;
    hasTransfer: grpc.handleUnaryCall<dropbox_pb.HasTransferRequest, dropbox_pb.HasTransferResponse>;
    getTransfersInfo: grpc.handleUnaryCall<dropbox_pb.GetTransfersInfoRequest, dropbox_pb.GetTransfersInfoResponse>;
}

export interface IDropboxClient {
    getApproverInfo(request: dropbox_pb.GetApproverInfoRequest, callback: (error: grpc.ServiceError | null, response: dropbox_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    getApproverInfo(request: dropbox_pb.GetApproverInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dropbox_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    getApproverInfo(request: dropbox_pb.GetApproverInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dropbox_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    canApproveToUser(request: dropbox_pb.CanApproveToUserRequest, callback: (error: grpc.ServiceError | null, response: dropbox_pb.CanApproveToUserResponse) => void): grpc.ClientUnaryCall;
    canApproveToUser(request: dropbox_pb.CanApproveToUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dropbox_pb.CanApproveToUserResponse) => void): grpc.ClientUnaryCall;
    canApproveToUser(request: dropbox_pb.CanApproveToUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dropbox_pb.CanApproveToUserResponse) => void): grpc.ClientUnaryCall;
    createRequest(request: dropbox_pb.CreateRequestRequest, callback: (error: grpc.ServiceError | null, response: dropbox_pb.CreateRequestResponse) => void): grpc.ClientUnaryCall;
    createRequest(request: dropbox_pb.CreateRequestRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dropbox_pb.CreateRequestResponse) => void): grpc.ClientUnaryCall;
    createRequest(request: dropbox_pb.CreateRequestRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dropbox_pb.CreateRequestResponse) => void): grpc.ClientUnaryCall;
    hasTransfer(request: dropbox_pb.HasTransferRequest, callback: (error: grpc.ServiceError | null, response: dropbox_pb.HasTransferResponse) => void): grpc.ClientUnaryCall;
    hasTransfer(request: dropbox_pb.HasTransferRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dropbox_pb.HasTransferResponse) => void): grpc.ClientUnaryCall;
    hasTransfer(request: dropbox_pb.HasTransferRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dropbox_pb.HasTransferResponse) => void): grpc.ClientUnaryCall;
    getTransfersInfo(request: dropbox_pb.GetTransfersInfoRequest, callback: (error: grpc.ServiceError | null, response: dropbox_pb.GetTransfersInfoResponse) => void): grpc.ClientUnaryCall;
    getTransfersInfo(request: dropbox_pb.GetTransfersInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dropbox_pb.GetTransfersInfoResponse) => void): grpc.ClientUnaryCall;
    getTransfersInfo(request: dropbox_pb.GetTransfersInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dropbox_pb.GetTransfersInfoResponse) => void): grpc.ClientUnaryCall;
}

export class DropboxClient extends grpc.Client implements IDropboxClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getApproverInfo(request: dropbox_pb.GetApproverInfoRequest, callback: (error: grpc.ServiceError | null, response: dropbox_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    public getApproverInfo(request: dropbox_pb.GetApproverInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dropbox_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    public getApproverInfo(request: dropbox_pb.GetApproverInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dropbox_pb.GetApproverInfoResponse) => void): grpc.ClientUnaryCall;
    public canApproveToUser(request: dropbox_pb.CanApproveToUserRequest, callback: (error: grpc.ServiceError | null, response: dropbox_pb.CanApproveToUserResponse) => void): grpc.ClientUnaryCall;
    public canApproveToUser(request: dropbox_pb.CanApproveToUserRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dropbox_pb.CanApproveToUserResponse) => void): grpc.ClientUnaryCall;
    public canApproveToUser(request: dropbox_pb.CanApproveToUserRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dropbox_pb.CanApproveToUserResponse) => void): grpc.ClientUnaryCall;
    public createRequest(request: dropbox_pb.CreateRequestRequest, callback: (error: grpc.ServiceError | null, response: dropbox_pb.CreateRequestResponse) => void): grpc.ClientUnaryCall;
    public createRequest(request: dropbox_pb.CreateRequestRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dropbox_pb.CreateRequestResponse) => void): grpc.ClientUnaryCall;
    public createRequest(request: dropbox_pb.CreateRequestRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dropbox_pb.CreateRequestResponse) => void): grpc.ClientUnaryCall;
    public hasTransfer(request: dropbox_pb.HasTransferRequest, callback: (error: grpc.ServiceError | null, response: dropbox_pb.HasTransferResponse) => void): grpc.ClientUnaryCall;
    public hasTransfer(request: dropbox_pb.HasTransferRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dropbox_pb.HasTransferResponse) => void): grpc.ClientUnaryCall;
    public hasTransfer(request: dropbox_pb.HasTransferRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dropbox_pb.HasTransferResponse) => void): grpc.ClientUnaryCall;
    public getTransfersInfo(request: dropbox_pb.GetTransfersInfoRequest, callback: (error: grpc.ServiceError | null, response: dropbox_pb.GetTransfersInfoResponse) => void): grpc.ClientUnaryCall;
    public getTransfersInfo(request: dropbox_pb.GetTransfersInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: dropbox_pb.GetTransfersInfoResponse) => void): grpc.ClientUnaryCall;
    public getTransfersInfo(request: dropbox_pb.GetTransfersInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: dropbox_pb.GetTransfersInfoResponse) => void): grpc.ClientUnaryCall;
}
