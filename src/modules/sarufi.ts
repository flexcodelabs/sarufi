import axios, { AxiosError } from 'axios';
import { sanitizeLoginError } from '../shared/helpers/error.helper';
import {
  ErrorResponse,
  LoginResponse,
} from '../shared/interfaces/auth.interface';
export class Sarufi {
  private BASE_DOMAIN = 'https://api.sarufi.io';
  login = async (
    username: string,
    password: string
  ): Promise<LoginResponse | ErrorResponse> => {
    try {
      const data: LoginResponse = (
        await axios.post(`${this.BASE_DOMAIN}/users/login`, {
          username,
          password,
        })
      ).data;
      return { ...data, success: true };
    } catch (error) {
      return sanitizeLoginError(error as AxiosError);
    }
  };
}
