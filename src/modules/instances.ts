import { LoginResponse } from '../shared/interfaces/auth.interface';
import {
  BotRequest,
  BotResponse,
  BotsResponse,
} from '../shared/interfaces/bot.interface';
import { ErrorResponse } from '../shared/interfaces/shared.interface';
import { Sarufi } from './sarufi';

export const login = async (
  username: string,
  password: string,
  url?: string
): Promise<LoginResponse | ErrorResponse> => {
  const sarufi = new Sarufi(url);
  return await sarufi.login(username, password);
};

export const createBot = async (
  bot: BotRequest,
  url?: string
): Promise<BotResponse | ErrorResponse> => {
  const sarufi = new Sarufi(url);
  return await sarufi.createBot(bot);
};
export const geBots = async (
  url?: string
): Promise<ErrorResponse | BotsResponse> => {
  const sarufi = new Sarufi(url);
  return await sarufi.geBots();
};
