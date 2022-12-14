import { sanitizeErrorResponse } from '../../src/shared/helpers/error.helper';
import { AxiosError } from 'axios';
describe('Login', () => {
  it('Should return a sanitized Error', () => {
    const error = {
      message: 'An error occured',
      response: { data: {} },
      code: 'FAILED',
      status: 404,
    };
    const errorResponse = sanitizeErrorResponse(error as unknown as AxiosError);
    expect(errorResponse.message).toBeDefined();
    expect(errorResponse.success).toBe(false);
  });
});
