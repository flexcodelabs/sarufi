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
}

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
