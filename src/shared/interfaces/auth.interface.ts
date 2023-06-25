/**
 * An interface for login response
 */
export interface LoginResponse {
  api_key: string;
  scope: string;
  expires_in: number;
  token_type: string;
}

/**
 * An interface for login request
 * @deprecated Use token from the website dashboard
 */
export interface Login {
  client_id: string;
  client_secret: string;
  url?: string;
}
