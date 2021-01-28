import Axios, { AxiosResponse, AxiosInstance } from 'axios';
import { IApproverInfo, ICanApproveToUser, IRequest } from './approvers.interface';
import { ApprovalError, NotFoundError, ApplicationError } from '../utils/errors/errors';
import { config } from '../config';
import { getToken } from "../spike/spike.service";
import { TransferRepository } from '../transfer/transfer.repository';

export class ApprovalService {

    private instance: AxiosInstance;

    constructor() {
        this.instance = Axios.create({ baseURL: config.approval.approvalUrl });
        this.addAuthIntreceptor();
    }

    async createRequest(data: IRequest) {
        try {
            const res: AxiosResponse = await this.instance.post(`/api/v1/request`, data);
            return res.data;
        } catch (err) {
            await TransferRepository.deleteByID(data.id || "");
            if (!err.response || !err.response.status) throw new ApplicationError();

            const status: number = err.response.status;
            if (status === 404) {
                throw new NotFoundError(`The user is not found`);
            } else if (status === 502) {
                throw new ApprovalError(`Error was thrown by the approval service : ${err.message}`);
            }
            throw new ApprovalError(`Error in contacting the approval service : ${err.message}`);
        }

    }

    /**
     * Gets a user approver information from the approval service
     * @param id - the user ID
     */
    async getApproverInfo(id: string): Promise<IApproverInfo> {
        try {
            const res: AxiosResponse = await this.instance.get(`/api/v1/users/${id}/approverInfo`);
            const data = res.data;

            const info: IApproverInfo = {
                isAdmin: data.isAdmin,
                isBlocked: data.isBlocked,
                userId: data.userId,
                unitName: data.unit.name,
                isApprover: data.isApprover,
            };

            return info;

        } catch (err) {
            if (err.response && err.response.status) {
                const status: number = err.response.status;
                if (status === 404) {
                    throw new NotFoundError(`The user with id ${id} is not found`);
                } else if (status === 502) {
                    throw new ApprovalError(`Error was thrown by the approval service : ${err.message}`);
                }
                throw new ApprovalError(`Error in contacting the approval service : ${err.message}`);
            } else {
                throw new ApplicationError(`Unknown Error while contacting the approval service : ${err.message}`);
            }
        }
    }

    /**
     * canApproveToUser checks if the user assigned a good approver and returns the data of the user.
     * @param approverID is the chosen approver id
     * @param userID is the user that's waiting to be approved
     */
    async canApproveToUser(approverID: string, userID: string): Promise<ICanApproveToUser> {
        try {
            const res: AxiosResponse = await this.instance.get(`/api/v1/users/${approverID}/canApproveToUser/${userID}`);
            const info: ICanApproveToUser = res.data;

            return info;

        } catch (err) {
            if (err.response && err.response.status) {
                const status: number = err.response.status;
                if (status === 404) {
                    throw new NotFoundError('One of the users were not found');
                } else if (status === 502) {
                    throw new ApprovalError(`Error was thrown by the approval service : ${err.message}`);
                }
                throw new ApprovalError(`Error in contacting the approval service : ${err.message}`);
            } else {
                throw new ApplicationError(`Unknown Error while contacting the approval service : ${err.message}`);
            }
        }
    }

    private async addAuthIntreceptor() {
        const token = await getToken(config.spike.audiance, config.spike.grantType);
        this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}
