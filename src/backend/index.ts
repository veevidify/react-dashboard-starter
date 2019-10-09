import axios, { AxiosInstance } from 'axios';
import { backend } from '../config/index';
import { LoginRequest } from '../store/auth';

class Backend {
  api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${backend.url}`,
      withCredentials: true,
    });
  }

  login(details: LoginRequest) {
    return this.api.post<{ token: string; expire: number }>('/v1/auth/login', details);
  }

  register(details: LoginRequest) {
    return this.api.post('/v1/auth/login', details);
  }
}

export default new Backend();
