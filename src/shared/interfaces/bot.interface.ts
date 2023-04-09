import {
  ConversationInput,
  ConversationResponse,
} from './conversation.interface';
import { ErrorResponse } from './shared.interface';

/**
 * Get bots response
 */
export interface BotsResponse {
  success: boolean;
  bots: Bot[];
}

/**
 * An interface for bot intents used for training bots
 */
export interface Intents {
  [key: string]: string | string[] | unknown | number | Record<string, unknown>;
}

/**
 * An interface for bot flows used for training bots
 */
export interface Flows {
  [key: string]: string | string[] | unknown | number | Record<string, unknown>;
}

/**
 * An interface for both get bot and create bot responses
 */
export interface BotResponse {
  success: boolean;
  bot: Bot | undefined;
  /**
   * @method Chat method for initiating chat with a particular bot
   */
  chat: (
    data: ConversationInput
  ) => Promise<ConversationResponse | ErrorResponse>;
}
/**
 * A sarufi single bot interface with all the properties
 */
export interface Bot {
  id: number;
  user_id: number;
  name: string;
  description: string;
  visible_on_community: boolean;
  intents: Intents;
  flows: Flows;
  model_name: string;
  industry: string;
  created_at: string;
  updated_at: string;
  language?: string
}

export interface BotRequest {
  name: string;
  description?: string;
  intents?: Intents;
  flows?: Flows;
  model_name?: string;
  industry?: string;
  visible_on_community: boolean;
  language?: string;
}

export interface DeleteBot {
  success: string;
  message: string;
}

export interface GetBot {
  id: number;
  url?: string;
  token?: string;
}
export interface GetBots {
  token?: string;
  url?: string;
}
export interface UpdateBot {
  id: number;
  bot: BotRequest;
  url?: string;
  token?: string;
}

/**
 * An interface for create bot request
 */
export interface CreateBot {
  bot: BotRequest;
  url?: string;
  token?: string;
}
