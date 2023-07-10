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

export interface WhatsappConversationResponse
  extends Pick<ConversationResponse, 'success' | 'memory'> {
  actions: Array<{
    send_message?: any[];
    send_button?: any;
    send_reply_button?: { type: string; body: { text: string }; action: any };
    send_image?: Array<{ link: string; caption: string }>;
    send_audio?: any;
    send_videos?: any;
  }>;
}

export interface ConversationInput {
  message: string;
  chat_id?: string | number | unknown;
  channel?: 'general' | 'whatsapp';
}

export interface ChatInput {
  message: string;
  bot_id: string | number;
  chat_id?: string | number | unknown;
  url?: string;
  api_key?: string;
  channel?: 'general' | 'whatsapp';
}
