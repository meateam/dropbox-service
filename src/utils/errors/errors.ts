import { statusToString } from './grpc.status';
import * as grpc from 'grpc';

/**
 * This file contains extended errors for the application.
 */

export class ApplicationError extends Error {
  public code: number;
  public name: string;

  constructor(message?: string, code?: number) {
    super();

    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || 'unknown application error';
    this.code = code || grpc.status.UNKNOWN;
    this.name = statusToString(this.code);
  }
}

export class ServerError extends ApplicationError {
  constructor(message?: string, code?: number) {
    super(message || 'server side error', code || grpc.status.UNKNOWN);
  }
}

export class ClientError extends ApplicationError {
  constructor(message?: string, code?: number) {
    super(message || 'client side error', code || grpc.status.INVALID_ARGUMENT);
  }
}

export class TransferError extends ClientError {
  constructor(message?: string) {
    super(message || 'transfer creation faild', grpc.status.FAILED_PRECONDITION);
  }
}

export class NotFoundError extends ClientError {
  constructor(message?: string) {
    super(message || 'The requested was not found', grpc.status.NOT_FOUND);
  }
}

export class SpikeError extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Error contacting spike', grpc.status.UNAVAILABLE);
  }
}

export class ApprovalError extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Error contacting approval service', grpc.status.UNAVAILABLE);
  }
}

export class StatusServiceError extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Error contacting status service', grpc.status.UNAVAILABLE);
  }
}

export class UserServiceError extends ApplicationError {
  constructor(message?: string) {
    super(message || 'Error contacting user service', grpc.status.UNAVAILABLE);
  }
}
export class ArgumentInvalidError extends ClientError {
  constructor(message?: string) {
    super(message || 'invalid argument', grpc.status.INVALID_ARGUMENT);
  }
}
