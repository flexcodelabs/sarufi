export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  errorMessage?: string;
  code?: string;
  status?: number;
}
export interface ErrorResponse {
  success: boolean;
  message: string;
  code?: string;
  status?: number;
  token: string;
}
