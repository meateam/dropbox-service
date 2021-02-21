export interface IApproverInfo {
  userId: string;
  isAdmin: boolean;
  isApprover: boolean;
  isBlocked: boolean;
  unitName: string;
}

export interface ICanApproveToUser {
  canApproveToUser: boolean;
  cantApproveReasons?: string[];
}

export interface IApprovalUser {
  id: string;
  name: string;
}
export interface IRequest {
  id?: string;
  from: string;
  approvers: string[];
  to: IApprovalUser[];
  fileId: string;
  fileName: string;
  info: string;
  classification: string;
}
