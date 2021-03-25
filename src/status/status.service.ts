import Axios, { AxiosResponse, AxiosInstance } from 'axios';
import { get } from 'lodash';
import { StatusServiceError, NotFoundError, ApplicationError } from '../utils/errors/errors';
import { config } from '../config';
import { getToken } from '../spike/spike.service';
import { IStatus, Status } from './status.interface';

export class StatusService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = Axios.create({ baseURL: config.status.statusUrl });
  }

  /**
   * Gets the status of a transfer by its id.
   * @param id - the request ID
   */
  async getStatus(id: string): Promise<IStatus> {
    try {
      await this.addAuthIntreceptor();

      const res: AxiosResponse = await this.instance.get(`/api/status/${id}`);

      const data = res.data;

      const historyData: Status[] = res.data.history.map((historyItem: any) => historyItem.status as Status);

      const info: IStatus = {
        id: data.id,
        status: historyData,
        direction: data.direction,
      };

      return info;

    } catch (err) {
      if (get(err, 'response.status')) {
        const status: number = err.response.status;
        if (status === 404) {
          throw new NotFoundError(`The status ${id} is not found`);
        } else if (status === 502) {
          throw new StatusServiceError(`Error was thrown by the status service : ${JSON.stringify(err)}`);
        }
        throw new StatusServiceError(`Error in contacting the status service : ${JSON.stringify(err)}`);
      }
      throw new ApplicationError(`Unknown Error while contacting the status service : ${err}`);
    }
  }

  private async addAuthIntreceptor() {
    const token = await getToken(config.spike.audience, config.spike.grantType);
    this.instance.defaults.headers.common['Authorization'] = token;
  }
}
