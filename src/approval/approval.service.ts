import Axios, { AxiosResponse, AxiosInstance } from 'axios';
import { get } from 'lodash';
import { IApproverInfo, ICanApproveToUser, IRequest } from './approvers.interface';
import { ApprovalError, NotFoundError, ApplicationError } from '../utils/errors/errors';
import { config, dests } from '../config';
import { getToken } from '../spike/spike.service';
import { TransferRepository } from '../transfer/transfer.repository';
import { Destination } from '../transfer/transfer.interface';

export class ApprovalService {

  private instance: AxiosInstance;

  constructor() {
    this.instance = Axios.create();
    this.addAuthIntreceptor();
  }

  /**
   * Create new transfer request in the approval service
   * @param data - reuqest data
   * @param destination - approval destination system
   */
  async createRequest(data: IRequest, destination: Destination) {
    try {
      if (!dests[destination].approvalUrl) throw new NotFoundError(`approval url not found for destination: ${destination}`);
      const res: AxiosResponse = await this.instance.post(`${dests[destination].approvalUrl}/api/v1/request`, data);

      return res.data;
    } catch (err) {
      // Remove failed transfer from mongo
      await TransferRepository.deleteByID(data.id || '');

      if (get(err, 'response.data.message')) {
        throw new ApprovalError(`Error was thrown by the approval service : ${err.response.data.message}`);
      } else {
        throw new ApplicationError(`Unknown Error while contacting the approval service : ${err.message}`);
      }
    }

  }

  /**
   * Gets a user approver information from the approval service
   * @param id - the user ID
   * @param destination - approval destination system
   */
  async getApproverInfo(id: string, destination: Destination): Promise<IApproverInfo> {
    try {
      if (!dests[destination].approvalUrl) throw new NotFoundError(`approval url not found for destination: ${destination}`);
      const res: AxiosResponse = await this.instance.get(`${dests[destination].approvalUrl}/api/v1/users/${id}/approverInfo`);

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
      if (get(err, 'response.data.message')) {
        throw new ApprovalError(`Error was thrown by the approval service : ${err.response.data.message}`);
      } else {
        throw new ApplicationError(`Unknown Error while contacting the approval service : ${err.message}`);
      }
    }
  }

  /**
   * canApproveToUser checks if the user assigned a good approver and returns the data of the user.
   * @param approverID is the chosen approver id
   * @param userID is the user that's waiting to be approved
   * @param destination - approval destination system
   */
  async canApproveToUser(approverID: string, userID: string, destination: Destination): Promise<ICanApproveToUser> {
    try {
      if (!dests[destination].approvalUrl) throw new NotFoundError(`approval url not found for destination: ${destination}`);
      const res: AxiosResponse = await this.instance.get(`${dests[destination].approvalUrl}/api/v1/users/${approverID}/canApproveToUser/${userID}`);

      const info: ICanApproveToUser = res.data;
      return info;

    } catch (err) {
      if (get(err, 'response.data.message')) {
        throw new ApprovalError(`Error was thrown by the approval service : ${err.response.data.message}`);
      } else if (get(err, 'response.status')) {
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
    const token = await getToken(config.spike.audience, config.spike.grantType);
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}
