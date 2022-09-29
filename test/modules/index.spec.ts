import { sarufi } from '../../src';
import { LoginResponse } from '../../src/shared/interfaces/auth.interface';
import axios from 'axios';
import xhrAdapter from 'axios/lib/adapters/xhr';
import HttpRequestMock from 'http-request-mock';
import { ErrorResponse } from '../../src/shared/interfaces/shared.interface';
import { Bot, BotRequest } from '../../src/shared/interfaces/bot.interface';
import { BotData, BotsData } from '../mocks/mocks.constants';

jest.setTimeout(300000);

axios.defaults.adapter = xhrAdapter;
const mocker = HttpRequestMock.setupForUnitTest('xhr');
const BASE_DOMAIN = 'https://api.sarufi.io';

//Mock succesfull
describe('Login User', () => {
  const loginDTO = {
    success: true,
    message: 'Logged in successfully',
    token: 'basic token',
  };

  mocker.post(`${BASE_DOMAIN}/users/login`, ():
    | LoginResponse
    | ErrorResponse => {
    return loginDTO;
  });
  it('Should return message and token', async () => {
    const result: LoginResponse | ErrorResponse = await sarufi.login('', '');
    expect(result.message).toBeDefined();
    expect(result).toMatchObject(loginDTO);
  });
});

describe('Create Bot', () => {
  mocker.post(`${BASE_DOMAIN}/chatbot`, (): BotRequest => {
    return BotData;
  });
  it('Should return a created bot given a valid token', async () => {
    const createdBot = await sarufi.createBot({
      name: '',
    });
    expect(createdBot.success).toBe(true);
    expect(createdBot.bot).toMatchObject(BotData);
  });
});

describe('Get Bots', () => {
  mocker.get(`${BASE_DOMAIN}/chatbots`, (): Bot[] => {
    return BotsData;
  });
  it('Should return user bots', async () => {
    const userBots = await sarufi.geBots();
    expect(userBots.success).toBe(true);
    expect(userBots.bots?.length).toBe(2);
  });
});
describe('Get Bot', () => {
  mocker.get(`${BASE_DOMAIN}/chatbot/26`, (): Bot => {
    return BotData;
  });
  it('Should return user bots', async () => {
    const userBots = await sarufi.geBot(BotData.id);
    expect(userBots.success).toBe(true);
    expect(userBots.bot?.id).toBe(26);
  });
});
