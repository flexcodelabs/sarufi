import { Login, LoginResponse } from '../shared/interfaces/auth.interface';
import {
  BotResponse,
  BotsResponse,
  CreateBot,
  DeleteBot,
  GetBot,
  GetBots,
  UpdateBot,
} from '../shared/interfaces/bot.interface';
import { ErrorResponse } from '../shared/interfaces/shared.interface';
import { Sarufi } from './sarufi';

export const login = async (
  data: Login
): Promise<LoginResponse | ErrorResponse> => {
  const sarufi = new Sarufi(data.url);
  return await sarufi.login({
    username: data.username,
    password: data.password,
  });
};

export const createBot = async (
  data: CreateBot
): Promise<BotResponse | ErrorResponse> => {
  const sarufi = new Sarufi(data?.url, data?.token);
  return await sarufi.createBot(data.bot);
};
export const geBots = async (
  data: GetBots
): Promise<ErrorResponse | BotsResponse> => {
  const sarufi = new Sarufi(data?.url, data?.token);
  return await sarufi.geBots();
};
export const getBot = async (
  data: GetBot
): Promise<ErrorResponse | BotResponse> => {
  const sarufi = new Sarufi(data?.url, data?.token);
  return await sarufi.getBot(data.id);
};
export const updateBot = async (
  data: UpdateBot
): Promise<ErrorResponse | BotResponse> => {
  const sarufi = new Sarufi(data?.url, data?.token);
  return await sarufi.updateBot(data.id, data.bot);
};
export const deleteBot = async (
  data: GetBot
): Promise<ErrorResponse | DeleteBot> => {
  const sarufi = new Sarufi(data?.url, data?.token);
  return await sarufi.deleteBot(data.id);
};
