/**
 * An interface for login response
 */
export interface LoginResponse {
  api_key: string;
}

/**
 * An interface for login request
 */
export interface Login {
  api_key: string;
  url?: string;
}
