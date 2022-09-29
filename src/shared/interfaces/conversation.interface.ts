export interface Conversation {
  chat_id: string | number | unknown;
  bot_id: string;
  message: string;
  message_type?: string;
  current_state?: string;
  next_state?: string;
  language?: string;
}

export interface ConversationResponse {
  message:
    | string
    | number
    | unknown
    | [string]
    | Record<string, unknown>
    | [Record<string, unknown>];
  success: boolean;
  memory?: {
    [key: string]: string | unknown;
  };
  [key: string]: string | unknown;
}
export interface ConversationInput {
  message: string;
  chat_id?: string | number | unknown;
}
