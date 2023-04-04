/**
 * An interface for login response
 */
export interface LoginResponse {
  access_token: string;
  scope: string;
  expires_in: number;
  token_type: string;
}

/**
 * An interface for login request
 */
export interface Login {
  client_id: string;
  client_secret: string;
  url?: string;
}
