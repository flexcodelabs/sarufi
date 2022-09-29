import { Bot } from './bot.interface';

export interface ErrorResponse {
  success: boolean;
  message: string;
  code?: string;
  status?: number;
  token?: string | undefined;
  bot?: Bot | undefined;
  bots?: Bot[] | undefined;
}
