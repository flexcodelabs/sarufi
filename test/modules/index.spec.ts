import { sarufi } from '../../src';
import {
  ErrorResponse,
  LoginResponse,
} from '../../src/shared/interfaces/auth.interface';
jest.setTimeout(300000);
describe('Login', () => {
  it('Should return message and token', async () => {
    const result: LoginResponse | ErrorResponse = await sarufi.login(
      '<username>',
      '<password>'
    );
    expect(result.message).toBeDefined();
    expect(result.token).toBeDefined();
  });
});
