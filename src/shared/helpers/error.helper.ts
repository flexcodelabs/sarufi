import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '../interfaces/shared.interface';

const sanitizedAxiosError = (
  error: AxiosError,
  serverError: AxiosError<ErrorResponse>
) => {
  if (serverError?.response) {
    return {
      ...serverError?.response?.data,
      message: error.message,
      error: error.message,
      code: serverError?.code || 'FAILED',
      status: serverError?.response?.status || 400,
      success: false,
    };
  }
  return {
    ...error,
    success: false,
    message: error?.message,
    token: '',
    status: 400,
  };
};
export const sanitizeErrorResponse = (error: AxiosError): ErrorResponse => {
  const serverError = error as AxiosError<ErrorResponse>;
  if (axios.isAxiosError(error)) {
    return sanitizedAxiosError(error, serverError);
  }
  return {
    success: false,
    message: serverError?.message || 'Internal server error',
    token: '',
    status: 400,
    code: 'FAILED',
  };
};
