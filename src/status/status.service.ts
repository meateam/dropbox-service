import Axios, { AxiosResponse, AxiosInstance } from 'axios';
import { IStatus } from './status.interface';
import { ApprovalError, UserNotFoundError, ApplicationError } from '../utils/errors/errors';
import { config } from '../config';
import { getToken } from "../spike/spike.service";

export class StatusService {

    private instance: AxiosInstance;

    constructor() {
        this.instance = Axios.create({ baseURL: config.status.statusUrl });
        this.addAuthIntreceptor();
    }

    /**
     * Gets the status of a transfer by its id.
     * @param id - the request ID
     */
    async getStatus(id: string): Promise<IStatus> {
        try {
            const res: AxiosResponse = await this.instance.get(`/api/v1/users/${id}/approverInfo`);
            const info: IStatus = res.data;

            return info;

        } catch (err) {

            // TODO
            if (err.response && err.response.status) {
                const status: number = err.response.status;
                if (status === 404) {
                    throw new UserNotFoundError(`The user with id ${id} is not found`);
                } else if (status === 502) {
                    throw new ApprovalError(`Error was thrown by the approval service : ${JSON.stringify(err)}`);
                }
                throw new ApprovalError(`Error in contacting the approval service : ${JSON.stringify(err)}`);
            } else {
                throw new ApplicationError(`Unknown Error while contacting the approval service : ${err}`);
            }
        }
    }

    private async addAuthIntreceptor() {
        const token = await getToken(config.spike.audiance, config.spike.grantType);
        this.instance.defaults.headers.common['Authorization'] = token;
    }
}
