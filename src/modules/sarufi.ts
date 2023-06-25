import axios, { AxiosError } from 'axios';
import { sanitizeErrorResponse } from '../shared/helpers/error.helper';
import { id } from '../shared/helpers/id.helper';
import { Login, LoginResponse } from '../shared/interfaces/auth.interface';
import {
  BotRequest,
  BotResponse,
  BotsResponse,
  DeleteBot,
} from '../shared/interfaces/bot.interface';
import {
  ChatInput,
  ConversationInput,
  ConversationResponse,
} from '../shared/interfaces/conversation.interface';
import { ErrorResponse } from '../shared/interfaces/shared.interface';
import { ChatConversation } from './chat';

declare let global: {
  access_token: string | undefined;
  url: string | undefined;
};

export class Sarufi {
  constructor(private url?: string, private access_token?: string) {
    global.url = this.url;
    if (this.access_token) {
      global.access_token = this.access_token;
    }
  }
  private BASE_DOMAIN = global.url || 'https://developers.sarufi.io/';
  login = async (data: Login): Promise<LoginResponse | ErrorResponse> => {
    throw new Error(
      'Method deprecated. Get a token from the website dashboard'
    );
    try {
      const loggedInUser: LoginResponse = (
        await axios.post(`${this.BASE_DOMAIN}/api/access_token`, data)
      ).data;
      if (global) {
        global.access_token = loggedInUser.access_token;
      }
      return { ...loggedInUser, success: true };
    } catch (error) {
      return sanitizeErrorResponse(error as AxiosError);
    }
  };

  createBot = async (bot: BotRequest): Promise<BotResponse | ErrorResponse> => {
    if (global?.access_token) {
      return await this.createUserBot(bot, global?.access_token);
    }
    return { success: false, bot: undefined, message: 'Unauthorized' };
  };

  getBots = async (): Promise<ErrorResponse | BotsResponse> => {
    if (global?.access_token) {
      return await this.getUserBots(global?.access_token);
    }
    return { success: false, bots: [], message: 'Unauthorized' };
  };

  getBot = async (id: number): Promise<ErrorResponse | BotResponse> => {
    if (global?.access_token && id) {
      return await this.getUserBot(global?.access_token, id);
    }
    return {
      success: false,
      bots: undefined,
      message: global?.access_token ? 'Unauthorized' : 'Bot ID not supplied',
    };
  };

  updateBot = async (
    id: number,
    bot: BotRequest
  ): Promise<ErrorResponse | BotResponse> => {
    if (global?.access_token && id) {
      return await this.updateUserBot(global?.access_token, id, bot);
    }
    return {
      success: false,
      bot: undefined,
      message: global?.access_token ? 'Unauthorized' : 'Bot ID not supplied',
    };
  };

  deleteBot = async (id: number): Promise<ErrorResponse | DeleteBot> => {
    if (global?.access_token && id) {
      return await this.deleteUserBot(global?.access_token, id);
    }
    return {
      success: false,
      bot: undefined,
      message: global?.access_token ? 'Unauthorized' : 'Bot ID not supplied',
    };
  };

  chat = async (
    data: ChatInput
  ): Promise<ConversationResponse | ErrorResponse> => {
    if (global.access_token) {
      return this.startChat(data, global.access_token);
    }
    return {
      success: false,
      bot: undefined,
      message: global?.access_token ? 'Unauthorized' : 'Bot ID not supplied',
    };
  };

  private startChat = async (
    data: ChatInput,
    access_token: string
  ): Promise<ConversationResponse | ErrorResponse> => {
    try {
      const response: ConversationResponse = (
        await axios.post(
          `${this.BASE_DOMAIN}/conversation`,
          {
            ...data,
            chat_id: data.chat_id || id,
          },
          { headers: { Authorization: `Bearer ${access_token}` } }
        )
      ).data;
      return { ...response, success: true };
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };

  private getUserBots = async (
    access_token: string
  ): Promise<ErrorResponse | BotsResponse> => {
    try {
      const bots = (
        await axios.get(`${this.BASE_DOMAIN}/chatbots`, {
          headers: { Authorization: `Bearer ${access_token}` },
        })
      ).data;
      return { success: true, bots };
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };
  private getUserBot = async (
    access_token: string,
    id: number
  ): Promise<ErrorResponse | BotResponse> => {
    try {
      const bot = (
        await axios.get(`${this.BASE_DOMAIN}/chatbot/${id}`, {
          headers: { Authorization: `Bearer ${access_token}` },
        })
      ).data;
      const chatBot = new ChatConversation(
        bot,
        this.BASE_DOMAIN,
        global.access_token
      );
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
    access_token: string,
    id: number,
    bot: BotRequest
  ): Promise<ErrorResponse | BotResponse> => {
    try {
      const updatedBot = (
        await axios.put(`${this.BASE_DOMAIN}/chatbot/${id}`, bot, {
          headers: { Authorization: `Bearer ${access_token}` },
        })
      ).data;
      const chatBot = new ChatConversation(
        updatedBot,
        this.BASE_DOMAIN,
        global.access_token
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
    access_token: string,
    id: number
  ): Promise<ErrorResponse | DeleteBot> => {
    try {
      const deleteBot: DeleteBot = (
        await axios.delete(`${this.BASE_DOMAIN}/chatbot/${id}`, {
          headers: { Authorization: `Bearer ${access_token}` },
        })
      ).data;
      return { ...deleteBot, success: true };
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };
  private createUserBot = async (
    bot: BotRequest,
    access_token: string
  ): Promise<BotResponse | ErrorResponse> => {
    try {
      const createdBot = (
        await axios.post(`${this.BASE_DOMAIN}/chatbot`, bot, {
          headers: { Authorization: `Bearer ${access_token}` },
        })
      ).data;
      const chatBot = new ChatConversation(
        createdBot,
        this.BASE_DOMAIN,
        global.access_token
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
