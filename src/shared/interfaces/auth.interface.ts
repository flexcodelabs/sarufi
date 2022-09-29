export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  errorMessage?: string;
  code?: string;
  status?: number;
}

export interface Login {
  username: string;
  password: string;
  url?: string;
}
