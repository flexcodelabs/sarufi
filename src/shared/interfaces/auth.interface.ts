/**
 * An interface for login response
 */
export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  errorMessage?: string;
  code?: string;
  status?: number;
}

/**
 * An interface for login request
 */
export interface Login {
  username: string;
  password: string;
  url?: string;
}
