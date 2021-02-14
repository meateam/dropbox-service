// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var dropbox_pb = require('./dropbox_pb.js');

function serialize_dropbox_CanApproveToUserRequest(arg) {
  if (!(arg instanceof dropbox_pb.CanApproveToUserRequest)) {
    throw new Error('Expected argument of type dropbox.CanApproveToUserRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dropbox_CanApproveToUserRequest(buffer_arg) {
  return dropbox_pb.CanApproveToUserRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dropbox_CanApproveToUserResponse(arg) {
  if (!(arg instanceof dropbox_pb.CanApproveToUserResponse)) {
    throw new Error('Expected argument of type dropbox.CanApproveToUserResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dropbox_CanApproveToUserResponse(buffer_arg) {
  return dropbox_pb.CanApproveToUserResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dropbox_CreateRequestRequest(arg) {
  if (!(arg instanceof dropbox_pb.CreateRequestRequest)) {
    throw new Error('Expected argument of type dropbox.CreateRequestRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dropbox_CreateRequestRequest(buffer_arg) {
  return dropbox_pb.CreateRequestRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dropbox_CreateRequestResponse(arg) {
  if (!(arg instanceof dropbox_pb.CreateRequestResponse)) {
    throw new Error('Expected argument of type dropbox.CreateRequestResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dropbox_CreateRequestResponse(buffer_arg) {
  return dropbox_pb.CreateRequestResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dropbox_GetApproverInfoRequest(arg) {
  if (!(arg instanceof dropbox_pb.GetApproverInfoRequest)) {
    throw new Error('Expected argument of type dropbox.GetApproverInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dropbox_GetApproverInfoRequest(buffer_arg) {
  return dropbox_pb.GetApproverInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dropbox_GetApproverInfoResponse(arg) {
  if (!(arg instanceof dropbox_pb.GetApproverInfoResponse)) {
    throw new Error('Expected argument of type dropbox.GetApproverInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dropbox_GetApproverInfoResponse(buffer_arg) {
  return dropbox_pb.GetApproverInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dropbox_GetTransfersInfoRequest(arg) {
  if (!(arg instanceof dropbox_pb.GetTransfersInfoRequest)) {
    throw new Error('Expected argument of type dropbox.GetTransfersInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dropbox_GetTransfersInfoRequest(buffer_arg) {
  return dropbox_pb.GetTransfersInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dropbox_GetTransfersInfoResponse(arg) {
  if (!(arg instanceof dropbox_pb.GetTransfersInfoResponse)) {
    throw new Error('Expected argument of type dropbox.GetTransfersInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dropbox_GetTransfersInfoResponse(buffer_arg) {
  return dropbox_pb.GetTransfersInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dropbox_HasTransferRequest(arg) {
  if (!(arg instanceof dropbox_pb.HasTransferRequest)) {
    throw new Error('Expected argument of type dropbox.HasTransferRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dropbox_HasTransferRequest(buffer_arg) {
  return dropbox_pb.HasTransferRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_dropbox_HasTransferResponse(arg) {
  if (!(arg instanceof dropbox_pb.HasTransferResponse)) {
    throw new Error('Expected argument of type dropbox.HasTransferResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_dropbox_HasTransferResponse(buffer_arg) {
  return dropbox_pb.HasTransferResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DropboxService = exports.DropboxService = {
  getApproverInfo: {
    path: '/dropbox.Dropbox/GetApproverInfo',
    requestStream: false,
    responseStream: false,
    requestType: dropbox_pb.GetApproverInfoRequest,
    responseType: dropbox_pb.GetApproverInfoResponse,
    requestSerialize: serialize_dropbox_GetApproverInfoRequest,
    requestDeserialize: deserialize_dropbox_GetApproverInfoRequest,
    responseSerialize: serialize_dropbox_GetApproverInfoResponse,
    responseDeserialize: deserialize_dropbox_GetApproverInfoResponse,
  },
  canApproveToUser: {
    path: '/dropbox.Dropbox/CanApproveToUser',
    requestStream: false,
    responseStream: false,
    requestType: dropbox_pb.CanApproveToUserRequest,
    responseType: dropbox_pb.CanApproveToUserResponse,
    requestSerialize: serialize_dropbox_CanApproveToUserRequest,
    requestDeserialize: deserialize_dropbox_CanApproveToUserRequest,
    responseSerialize: serialize_dropbox_CanApproveToUserResponse,
    responseDeserialize: deserialize_dropbox_CanApproveToUserResponse,
  },
  createRequest: {
    path: '/dropbox.Dropbox/CreateRequest',
    requestStream: false,
    responseStream: false,
    requestType: dropbox_pb.CreateRequestRequest,
    responseType: dropbox_pb.CreateRequestResponse,
    requestSerialize: serialize_dropbox_CreateRequestRequest,
    requestDeserialize: deserialize_dropbox_CreateRequestRequest,
    responseSerialize: serialize_dropbox_CreateRequestResponse,
    responseDeserialize: deserialize_dropbox_CreateRequestResponse,
  },
  hasTransfer: {
    path: '/dropbox.Dropbox/HasTransfer',
    requestStream: false,
    responseStream: false,
    requestType: dropbox_pb.HasTransferRequest,
    responseType: dropbox_pb.HasTransferResponse,
    requestSerialize: serialize_dropbox_HasTransferRequest,
    requestDeserialize: deserialize_dropbox_HasTransferRequest,
    responseSerialize: serialize_dropbox_HasTransferResponse,
    responseDeserialize: deserialize_dropbox_HasTransferResponse,
  },
  getTransfersInfo: {
    path: '/dropbox.Dropbox/GetTransfersInfo',
    requestStream: false,
    responseStream: false,
    requestType: dropbox_pb.GetTransfersInfoRequest,
    responseType: dropbox_pb.GetTransfersInfoResponse,
    requestSerialize: serialize_dropbox_GetTransfersInfoRequest,
    requestDeserialize: deserialize_dropbox_GetTransfersInfoRequest,
    responseSerialize: serialize_dropbox_GetTransfersInfoResponse,
    responseDeserialize: deserialize_dropbox_GetTransfersInfoResponse,
  },
};

exports.DropboxClient = grpc.makeGenericClientConstructor(DropboxService);
