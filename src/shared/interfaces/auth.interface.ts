export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  errorMessage?: string;
  code?: string;
  status?: number;
}
