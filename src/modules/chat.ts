import { Bot } from '../shared/interfaces/bot.interface';
import { ConversationInput } from '../shared/interfaces/conversation.interface';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../shared/interfaces/shared.interface';
import { sanitizeErrorResponse } from '../shared/helpers/error.helper';

export class ChatConversation {
  constructor(
    private bot: Bot,
    private url: string,
    private token: string | undefined
  ) {}

  chat = async (data: ConversationInput): Promise<Bot | ErrorResponse> => {
    if (this.token) {
      return this.startChat(this.token, data);
    }
    return {
      success: false,
      bot: undefined,
      message: 'Unauthorized',
    };
  };

  private startChat = async (
    token: string,
    data: ConversationInput
  ): Promise<Bot | ErrorResponse> => {
    try {
      const response: Bot = (
        await axios.post(
          `${this.url}/conversation`,
          {
            ...data,
            bot_id: this.bot.id,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      ).data;
      return response;
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };
}
