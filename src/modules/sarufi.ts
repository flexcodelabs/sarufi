import axios, { AxiosError } from 'axios';
import { sanitizeErrorResponse } from '../shared/helpers/error.helper';
import { Login, LoginResponse } from '../shared/interfaces/auth.interface';
import {
  BotRequest,
  BotResponse,
  BotsResponse,
  DeleteBot,
} from '../shared/interfaces/bot.interface';
import {
  ConversationInput,
  ConversationResponse,
} from '../shared/interfaces/conversation.interface';
import { ErrorResponse } from '../shared/interfaces/shared.interface';
import { ChatConversation } from './chat';

declare let global: { token: string | undefined; url: string | undefined };

export class Sarufi {
  constructor(private url?: string) {
    global.url = this.url;
  }
  private BASE_DOMAIN = global.url || 'https://api.sarufi.io';
  login = async (data: Login): Promise<LoginResponse | ErrorResponse> => {
    try {
      const loggedInUser: LoginResponse = (
        await axios.post(`${this.BASE_DOMAIN}/users/login`, data)
      ).data;
      if (global) {
        global.token = loggedInUser.token;
      }
      return { ...loggedInUser, success: true };
    } catch (error) {
      return sanitizeErrorResponse(error as AxiosError);
    }
  };
  createBot = async (bot: BotRequest): Promise<BotResponse | ErrorResponse> => {
    if (global?.token) {
      return await this.createUserBot(bot, global?.token);
    }
    return { success: false, bot: undefined, message: 'Unauthorized' };
  };
  geBots = async (): Promise<ErrorResponse | BotsResponse> => {
    if (global?.token) {
      return await this.getUserBots(global?.token);
    }
    return { success: false, bots: [], message: 'Unauthorized' };
  };

  getBot = async (id: number): Promise<ErrorResponse | BotResponse> => {
    if (global?.token && id) {
      return await this.getUserBot(global?.token, id);
    }
    return {
      success: false,
      bots: undefined,
      message: global?.token ? 'Unauthorized' : 'Bot ID not supplied',
    };
  };
  updateBot = async (
    id: number,
    bot: BotRequest
  ): Promise<ErrorResponse | BotResponse> => {
    if (global?.token && id) {
      return await this.updateUserBot(global?.token, id, bot);
    }
    return {
      success: false,
      bot: undefined,
      message: global?.token ? 'Unauthorized' : 'Bot ID not supplied',
    };
  };
  deleteBot = async (id: number): Promise<ErrorResponse | DeleteBot> => {
    if (global?.token && id) {
      return await this.deleteUserBot(global?.token, id);
    }
    return {
      success: false,
      bot: undefined,
      message: global?.token ? 'Unauthorized' : 'Bot ID not supplied',
    };
  };

  private getUserBots = async (
    token: string
  ): Promise<ErrorResponse | BotsResponse> => {
    try {
      const bots = (
        await axios.get(`${this.BASE_DOMAIN}/chatbots`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;
      return { success: true, bots };
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };
  private getUserBot = async (
    token: string,
    id: number
  ): Promise<ErrorResponse | BotResponse> => {
    try {
      const bot = (
        await axios.get(`${this.BASE_DOMAIN}/chatbot/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;
      const chatBot = new ChatConversation(bot, this.BASE_DOMAIN, global.token);
      return {
        success: true,
        bot,
        chat: async function (
          data: ConversationInput
        ): Promise<ConversationResponse | ErrorResponse> {
          return await chatBot.chat(data);
        },
      };
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };
  private updateUserBot = async (
    token: string,
    id: number,
    bot: BotRequest
  ): Promise<ErrorResponse | BotResponse> => {
    try {
      const updatedBot = (
        await axios.put(`${this.BASE_DOMAIN}/chatbot/${id}`, bot, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;
      const chatBot = new ChatConversation(
        updatedBot,
        this.BASE_DOMAIN,
        global.token
      );
      return {
        success: true,
        bot: updatedBot,
        chat: async function (
          data: ConversationInput
        ): Promise<ConversationResponse | ErrorResponse> {
          return await chatBot.chat(data);
        },
      };
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };
  private deleteUserBot = async (
    token: string,
    id: number
  ): Promise<ErrorResponse | DeleteBot> => {
    try {
      const deleteBot: DeleteBot = (
        await axios.delete(`${this.BASE_DOMAIN}/chatbot/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;
      return { ...deleteBot, success: true };
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };
  private createUserBot = async (
    bot: BotRequest,
    token: string
  ): Promise<BotResponse | ErrorResponse> => {
    try {
      const createdBot = (
        await axios.post(`${this.BASE_DOMAIN}/chatbot`, bot, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;
      const chatBot = new ChatConversation(
        createdBot,
        this.BASE_DOMAIN,
        global.token
      );

      return {
        success: true,
        bot: createdBot,
        chat: async function (
          data: ConversationInput
        ): Promise<ConversationResponse | ErrorResponse> {
          return await chatBot.chat(data);
        },
      };
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };
}
