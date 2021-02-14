// package: dropbox
// file: dropbox.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GetApproverInfoRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): GetApproverInfoRequest;

    getDestination(): string;
    setDestination(value: string): GetApproverInfoRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetApproverInfoRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetApproverInfoRequest): GetApproverInfoRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetApproverInfoRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetApproverInfoRequest;
    static deserializeBinaryFromReader(message: GetApproverInfoRequest, reader: jspb.BinaryReader): GetApproverInfoRequest;
}

export namespace GetApproverInfoRequest {
    export type AsObject = {
        id: string,
        destination: string,
    }
}

export class GetApproverInfoResponse extends jspb.Message { 
    getUserid(): string;
    setUserid(value: string): GetApproverInfoResponse;

    getIsadmin(): boolean;
    setIsadmin(value: boolean): GetApproverInfoResponse;

    getIsapprover(): boolean;
    setIsapprover(value: boolean): GetApproverInfoResponse;

    getIsblocked(): boolean;
    setIsblocked(value: boolean): GetApproverInfoResponse;

    getUnitname(): string;
    setUnitname(value: string): GetApproverInfoResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetApproverInfoResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetApproverInfoResponse): GetApproverInfoResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetApproverInfoResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetApproverInfoResponse;
    static deserializeBinaryFromReader(message: GetApproverInfoResponse, reader: jspb.BinaryReader): GetApproverInfoResponse;
}

export namespace GetApproverInfoResponse {
    export type AsObject = {
        userid: string,
        isadmin: boolean,
        isapprover: boolean,
        isblocked: boolean,
        unitname: string,
    }
}

export class CanApproveToUserRequest extends jspb.Message { 
    getApproverid(): string;
    setApproverid(value: string): CanApproveToUserRequest;

    getUserid(): string;
    setUserid(value: string): CanApproveToUserRequest;

    getDestination(): string;
    setDestination(value: string): CanApproveToUserRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CanApproveToUserRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CanApproveToUserRequest): CanApproveToUserRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CanApproveToUserRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CanApproveToUserRequest;
    static deserializeBinaryFromReader(message: CanApproveToUserRequest, reader: jspb.BinaryReader): CanApproveToUserRequest;
}

export namespace CanApproveToUserRequest {
    export type AsObject = {
        approverid: string,
        userid: string,
        destination: string,
    }
}

export class CanApproveToUserResponse extends jspb.Message { 
    getCanapprovetouser(): boolean;
    setCanapprovetouser(value: boolean): CanApproveToUserResponse;

    clearCantapprovereasonsList(): void;
    getCantapprovereasonsList(): Array<string>;
    setCantapprovereasonsList(value: Array<string>): CanApproveToUserResponse;
    addCantapprovereasons(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CanApproveToUserResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CanApproveToUserResponse): CanApproveToUserResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CanApproveToUserResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CanApproveToUserResponse;
    static deserializeBinaryFromReader(message: CanApproveToUserResponse, reader: jspb.BinaryReader): CanApproveToUserResponse;
}

export namespace CanApproveToUserResponse {
    export type AsObject = {
        canapprovetouser: boolean,
        cantapprovereasonsList: Array<string>,
    }
}

export class CreateRequestRequest extends jspb.Message { 
    getFileid(): string;
    setFileid(value: string): CreateRequestRequest;

    getSharerid(): string;
    setSharerid(value: string): CreateRequestRequest;

    clearUsersList(): void;
    getUsersList(): Array<User>;
    setUsersList(value: Array<User>): CreateRequestRequest;
    addUsers(value?: User, index?: number): User;

    getClassification(): string;
    setClassification(value: string): CreateRequestRequest;

    getInfo(): string;
    setInfo(value: string): CreateRequestRequest;

    clearApproversList(): void;
    getApproversList(): Array<string>;
    setApproversList(value: Array<string>): CreateRequestRequest;
    addApprovers(value: string, index?: number): string;

    getFilename(): string;
    setFilename(value: string): CreateRequestRequest;

    getDestination(): string;
    setDestination(value: string): CreateRequestRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateRequestRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateRequestRequest): CreateRequestRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateRequestRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateRequestRequest;
    static deserializeBinaryFromReader(message: CreateRequestRequest, reader: jspb.BinaryReader): CreateRequestRequest;
}

export namespace CreateRequestRequest {
    export type AsObject = {
        fileid: string,
        sharerid: string,
        usersList: Array<User.AsObject>,
        classification: string,
        info: string,
        approversList: Array<string>,
        filename: string,
        destination: string,
    }
}

export class User extends jspb.Message { 
    getId(): string;
    setId(value: string): User;

    getName(): string;
    setName(value: string): User;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): User.AsObject;
    static toObject(includeInstance: boolean, msg: User): User.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): User;
    static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
    export type AsObject = {
        id: string,
        name: string,
    }
}

export class CreateRequestResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateRequestResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateRequestResponse): CreateRequestResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateRequestResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateRequestResponse;
    static deserializeBinaryFromReader(message: CreateRequestResponse, reader: jspb.BinaryReader): CreateRequestResponse;
}

export namespace CreateRequestResponse {
    export type AsObject = {
    }
}

export class HasTransferRequest extends jspb.Message { 
    getFileid(): string;
    setFileid(value: string): HasTransferRequest;

    getUserid(): string;
    setUserid(value: string): HasTransferRequest;

    getDestination(): string;
    setDestination(value: string): HasTransferRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HasTransferRequest.AsObject;
    static toObject(includeInstance: boolean, msg: HasTransferRequest): HasTransferRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HasTransferRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HasTransferRequest;
    static deserializeBinaryFromReader(message: HasTransferRequest, reader: jspb.BinaryReader): HasTransferRequest;
}

export namespace HasTransferRequest {
    export type AsObject = {
        fileid: string,
        userid: string,
        destination: string,
    }
}

export class HasTransferResponse extends jspb.Message { 
    getHastransfer(): boolean;
    setHastransfer(value: boolean): HasTransferResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): HasTransferResponse.AsObject;
    static toObject(includeInstance: boolean, msg: HasTransferResponse): HasTransferResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: HasTransferResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): HasTransferResponse;
    static deserializeBinaryFromReader(message: HasTransferResponse, reader: jspb.BinaryReader): HasTransferResponse;
}

export namespace HasTransferResponse {
    export type AsObject = {
        hastransfer: boolean,
    }
}

export class GetTransfersInfoRequest extends jspb.Message { 
    getFileid(): string;
    setFileid(value: string): GetTransfersInfoRequest;

    getUserid(): string;
    setUserid(value: string): GetTransfersInfoRequest;

    getDestination(): string;
    setDestination(value: string): GetTransfersInfoRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTransfersInfoRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetTransfersInfoRequest): GetTransfersInfoRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTransfersInfoRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTransfersInfoRequest;
    static deserializeBinaryFromReader(message: GetTransfersInfoRequest, reader: jspb.BinaryReader): GetTransfersInfoRequest;
}

export namespace GetTransfersInfoRequest {
    export type AsObject = {
        fileid: string,
        userid: string,
        destination: string,
    }
}

export class GetTransfersInfoResponse extends jspb.Message { 
    getFileid(): string;
    setFileid(value: string): GetTransfersInfoResponse;

    getFrom(): string;
    setFrom(value: string): GetTransfersInfoResponse;

    getDestination(): string;
    setDestination(value: string): GetTransfersInfoResponse;

    getStatus(): string;
    setStatus(value: string): GetTransfersInfoResponse;

    getCreatedat(): number;
    setCreatedat(value: number): GetTransfersInfoResponse;

    clearToList(): void;
    getToList(): Array<User>;
    setToList(value: Array<User>): GetTransfersInfoResponse;
    addTo(value?: User, index?: number): User;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTransfersInfoResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetTransfersInfoResponse): GetTransfersInfoResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTransfersInfoResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTransfersInfoResponse;
    static deserializeBinaryFromReader(message: GetTransfersInfoResponse, reader: jspb.BinaryReader): GetTransfersInfoResponse;
}

export namespace GetTransfersInfoResponse {
    export type AsObject = {
        fileid: string,
        from: string,
        destination: string,
        status: string,
        createdat: number,
        toList: Array<User.AsObject>,
    }
}
