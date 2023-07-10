import { Bot } from '../shared/interfaces/bot.interface';
import {
  ConversationInput,
  ConversationResponse,
} from '../shared/interfaces/conversation.interface';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../shared/interfaces/shared.interface';
import { sanitizeErrorResponse } from '../shared/helpers/error.helper';
import { id } from '../shared/helpers/id.helper';

export class ChatConversation {
  constructor(
    private bot: Bot,
    private url: string,
    private token: string | undefined
  ) {}

  /**
   * A method to start chat with your bot
   *
   * @param data with message and optional chat_id, if chat id is not supplied, a unique string will be used
   */
  chat = async (
    data: ConversationInput
  ): Promise<ConversationResponse | ErrorResponse> => {
    if (this.token) {
      return this.startChat(this.token, {
        ...data,
        channel: data.channel ?? 'general',
      });
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
  ): Promise<ConversationResponse | ErrorResponse> => {
    let url = `${this.url}/conversation`;
    if (data.channel?.toLowerCase() === 'whatsapp') {
      url = `${url}/whatsapp`;
    }

    try {
      const response: ConversationResponse = (
        await axios.post(
          url,
          {
            ...data,
            bot_id: this.bot.id,
            chat_id: data.chat_id || id,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        )
      ).data;
      return { ...response, success: true };
    } catch (e) {
      return sanitizeErrorResponse(e as AxiosError);
    }
  };
}
