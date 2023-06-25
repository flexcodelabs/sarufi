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
  api_key: string | undefined;
  url: string | undefined;
};

export class Sarufi {
  constructor(private url?: string, private api_key?: string) {
    global.url = this.url;
    if (this.api_key) {
      global.api_key = this.api_key;
    }
  }
  private BASE_DOMAIN = global.url || 'https://developers.sarufi.io';

  login = async (data: Login): Promise<LoginResponse | ErrorResponse> => {
    throw new Error(
      'Method deprecated. Get a token from the website dashboard'
    );
    try {
      const loggedInUser: LoginResponse = (
        await axios.post(`${this.BASE_DOMAIN}/api/api_key`, data)
      ).data;
      if (global) {
        global.api_key = loggedInUser.api_key;
      }
      return { ...loggedInUser, success: true };
    } catch (error) {
      return sanitizeErrorResponse(error as AxiosError);
    }
  };

  createBot = async (bot: BotRequest): Promise<BotResponse | ErrorResponse> => {
    if (global?.api_key) {
      return await this.createUserBot(bot, global?.api_key);
    }
    return { success: false, bot: undefined, message: 'Unauthorized' };
  };

  getBots = async (): Promise<ErrorResponse | BotsResponse> => {
    if (global?.api_key) {
      return await this.getUserBots(global?.api_key);
    }
    return { success: false, bots: [], message: 'Unauthorized' };
  };

  getBot = async (id: number): Promise<ErrorResponse | BotResponse> => {
    if (global?.api_key && id) {
      return await this.getUserBot(global?.api_key, id);
    }
    return {
      success: false,
      bots: undefined,
      message: global?.api_key ? 'Unauthorized' : 'Bot ID not supplied',
    };
  };

  updateBot = async (
    id: number,
    bot: BotRequest
  ): Promise<ErrorResponse | BotResponse> => {
    if (global?.api_key && id) {
      return await this.updateUserBot(global?.api_key, id, bot);
    }
    return {
      success: false,
      bot: undefined,
      message: global?.api_key ? 'Unauthorized' : 'Bot ID not supplied',
    };
  };

  deleteBot = async (id: number): Promise<ErrorResponse | DeleteBot> => {
    if (global?.api_key && id) {
      return await this.deleteUserBot(global?.api_key, id);
    }
    return {
      success: false,
      bot: undefined,
      message: global?.api_key ? 'Unauthorized' : 'Bot ID not supplied',
    };
  };

  chat = async (
    data: ChatInput
  ): Promise<ConversationResponse | ErrorResponse> => {
    if (global.api_key) {
      return this.startChat(data, global.api_key);
    }
    return {
      success: false,
      bot: undefined,
      message: global?.api_key ? 'Unauthorized' : 'Bot ID not supplied',
    };
  };

  private startChat = async (
    data: ChatInput,
    api_key: string
  ): Promise<ConversationResponse | ErrorResponse> => {
    try {
      const response: ConversationResponse = (
        await axios.post(
          `${this.BASE_DOMAIN}/conversation`,
          {
            ...data,
            chat_id: data.chat_id || id,
          },
          { headers: { Authorization: `Bearer ${api_key}` } }
        )
      ).data;
      return { ...response, success: true };
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };

  private getUserBots = async (
    api_key: string
  ): Promise<ErrorResponse | BotsResponse> => {
    try {
      const bots = (
        await axios.get(`${this.BASE_DOMAIN}/chatbots`, {
          headers: { Authorization: `Bearer ${api_key}` },
        })
      ).data;
      return { success: true, bots };
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };
  private getUserBot = async (
    api_key: string,
    id: number
  ): Promise<ErrorResponse | BotResponse> => {
    try {
      const bot = (
        await axios.get(`${this.BASE_DOMAIN}/chatbot/${id}`, {
          headers: { Authorization: `Bearer ${api_key}` },
        })
      ).data;
      const chatBot = new ChatConversation(
        bot,
        this.BASE_DOMAIN,
        global.api_key
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
    api_key: string,
    id: number,
    bot: BotRequest
  ): Promise<ErrorResponse | BotResponse> => {
    try {
      const updatedBot = (
        await axios.put(`${this.BASE_DOMAIN}/chatbot/${id}`, bot, {
          headers: { Authorization: `Bearer ${api_key}` },
        })
      ).data;
      const chatBot = new ChatConversation(
        updatedBot,
        this.BASE_DOMAIN,
        global.api_key
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
    api_key: string,
    id: number
  ): Promise<ErrorResponse | DeleteBot> => {
    try {
      const deleteBot: DeleteBot = (
        await axios.delete(`${this.BASE_DOMAIN}/chatbot/${id}`, {
          headers: { Authorization: `Bearer ${api_key}` },
        })
      ).data;
      return { ...deleteBot, success: true };
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };
  private createUserBot = async (
    bot: BotRequest,
    api_key: string
  ): Promise<BotResponse | ErrorResponse> => {
    try {
      const createdBot = (
        await axios.post(`${this.BASE_DOMAIN}/chatbot`, bot, {
          headers: { Authorization: `Bearer ${api_key}` },
        })
      ).data;
      const chatBot = new ChatConversation(
        createdBot,
        this.BASE_DOMAIN,
        global.api_key
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
