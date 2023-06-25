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
import {
  ChatInput,
  ConversationResponse,
} from '../shared/interfaces/conversation.interface';
import { ErrorResponse } from '../shared/interfaces/shared.interface';
import { Sarufi } from './sarufi';

/**
 * @deprecated Use token from the website dashboard
 */
export const login = async (
  data: Login
): Promise<LoginResponse | ErrorResponse> => {
  const sarufi = new Sarufi(data.url);
  return await sarufi.login({
    client_id: data.client_id,
    client_secret: data.client_secret,
  });
};

/**
 * A method to create a new bot
 *
 * @param data payload to create a bot with bot property as the DTO, an optional url and an optional token
 */

export const createBot = async (
  data: CreateBot
): Promise<BotResponse | ErrorResponse> => {
  const sarufi = new Sarufi(data?.url, data?.access_token);
  return await sarufi.createBot(data.bot);
};


export const getBots = async (
  data?: GetBots
): Promise<ErrorResponse | BotsResponse> => {
  const sarufi = new Sarufi(data?.url, data?.access_token);
  return await sarufi.getBots();
};


export const getBot = async (
  data: GetBot
): Promise<ErrorResponse | BotResponse> => {
  const sarufi = new Sarufi(data?.url, data?.access_token);
  return await sarufi.getBot(data.id);
};


export const updateBot = async (
  data: UpdateBot
): Promise<ErrorResponse | BotResponse> => {
  const sarufi = new Sarufi(data?.url, data?.access_token);
  return await sarufi.updateBot(data.id, data.bot);
};


export const deleteBot = async (
  data: GetBot
): Promise<ErrorResponse | DeleteBot> => {
  const sarufi = new Sarufi(data?.url, data?.access_token);
  return await sarufi.deleteBot(data.id);
};


export const chat = async (
  data: ChatInput
): Promise<ErrorResponse | ConversationResponse> => {
  const sarufi = new Sarufi(data?.url, data?.access_token);
  return await sarufi.chat({
    message: data.message,
    bot_id: data.bot_id,
    chat_id: data.chat_id,
  });
};
