import { Bot } from './bot.interface';
import {
  ConversationInput,
  ConversationResponse,
  WhatsappConversationResponse,
} from './conversation.interface';

export interface ErrorResponse {
  success: boolean;
  message: string;
  code?: string;
  status?: number;
  token?: string | undefined;
  bot?: Bot | undefined;
  bots?: Bot[] | undefined;
  chat?: (
    data: ConversationInput
  ) => Promise<ConversationResponse | WhatsappConversationResponse>;
  [key: string]: unknown;
}
