import {
  ErrorResponse,
  LoginResponse,
} from '../shared/interfaces/auth.interface';
import { Sarufi } from './sarufi';

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse | ErrorResponse> => {
  const sarufi = new Sarufi();
  return await sarufi.login(username, password);
};
