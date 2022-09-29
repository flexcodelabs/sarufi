import {
  ConversationInput,
  ConversationResponse,
} from './conversation.interface';
import { ErrorResponse } from './shared.interface';

export interface BotsResponse {
  success: boolean;
  bots: Bot[];
}

export interface Intents {
  [key: string]: string | number | Record<string, unknown>;
}

export interface Flows {
  [key: string]: string | number | Record<string, unknown>;
}

export interface BotResponse {
  success: boolean;
  bot: Bot | undefined;
  chat: (
    data: ConversationInput
  ) => Promise<ConversationResponse | ErrorResponse>;
}

export type Chat = {
  function?: () => void;
};

export interface Bot {
  id: number;
  user_id: number;
  name: string;
  description: string;
  intents: Intents;
  flows: Flows;
  model_name: string;
  industry: string;
  created_at: string;
  updated_at: string;
}

export interface BotRequest {
  name: string;
  description?: string;
  intents?: Intents;
  flows?: Flows;
  model_name?: string;
  industry?: string;
}

export interface DeleteBot {
  success: string;
  message: string;
}

export interface GetBot {
  id: number;
  url?: string;
}
export interface UpdateBot {
  id: number;
  bot: BotRequest;
  url?: string;
}
export interface CreateBot {
  bot: BotRequest;
  url?: string;
}
