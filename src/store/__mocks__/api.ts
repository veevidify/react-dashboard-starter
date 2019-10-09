import { internet } from 'faker';
import { AxiosResponse } from 'axios';
import { liftPromise } from '../../utils/functions';

export const mockIsoDate = new Date(Date.now()).toISOString();

const makeAxiosResponse = <T = any>(
  responsePayload: T,
  status: number,
): Promise<AxiosResponse<T>> =>
  liftPromise({
    data: responsePayload,
    status,
    statusText: '',
    config: {},
    headers: {},
  });

const mockBackend = {
  login: (..._: any[]) =>
    makeAxiosResponse(
      {
        token: internet.password(),
        expire: mockIsoDate,
      },
      200,
    ),
};

export default mockBackend;
