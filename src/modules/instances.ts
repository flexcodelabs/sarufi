import { LoginResponse } from '../shared/interfaces/auth.interface';
import {
  BotRequest,
  BotResponse,
  BotsResponse,
  DeleteBot,
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
export const getBot = async (
  id: number,
  url?: string
): Promise<ErrorResponse | BotResponse> => {
  const sarufi = new Sarufi(url);
  return await sarufi.getBot(id);
};
export const updateBot = async (
  id: number,
  bot: BotRequest,
  url?: string
): Promise<ErrorResponse | BotResponse> => {
  const sarufi = new Sarufi(url);
  return await sarufi.updateBot(id, bot);
};
export const deleteBot = async (
  id: number,
  url?: string
): Promise<ErrorResponse | DeleteBot> => {
  const sarufi = new Sarufi(url);
  return await sarufi.deleteBot(id);
};
