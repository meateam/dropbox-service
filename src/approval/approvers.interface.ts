export interface IApproverInfo {
    userId: string;
    isAdmin: boolean;
    isApprover: boolean;
    isBlocked: boolean;
    unit: {
        name: string;
        approvers: string[];
    };
}

export interface ICanApproveToUser {
    canApproveToUser: boolean;
    cantApproveReasons?: string[];
}

export interface IApprovalRequest {
    id: string;
    from: string;
    approvers: string[];
    to: IUser[];
    fileID: string;
    fileName: string;
    info: string;
    classification: string;
}

interface IUser {
    id: string;
    name: string;
}