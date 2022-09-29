import sarufi from '../../src';
import { LoginResponse } from '../../src/shared/interfaces/auth.interface';
import axios from 'axios';
import xhrAdapter from 'axios/lib/adapters/xhr';
import HttpRequestMock from 'http-request-mock';
import { ErrorResponse } from '../../src/shared/interfaces/shared.interface';
import { Bot, BotRequest } from '../../src/shared/interfaces/bot.interface';
import { BotData, BotsData, BotUpdate } from '../mocks/mocks.constants';
import { ConversationResponse } from '../../src/shared/interfaces/conversation.interface';

jest.setTimeout(300000);

axios.defaults.adapter = xhrAdapter;
const mocker = HttpRequestMock.setupForUnitTest('xhr');
const BASE_DOMAIN = 'https://api.sarufi.io';

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
    const result: LoginResponse | ErrorResponse = await sarufi.login({
      username: '',
      password: '',
    });
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
      bot: { name: '' },
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
  mocker.get(`${BASE_DOMAIN}/chatbot/27`, (): Bot => {
    return BotData;
  });
  it('Should return a single bot', async () => {
    const userBot = await sarufi.getBot({ id: BotData.id });
    expect(userBot.success).toBe(true);
    expect(userBot.bot?.id).toBe(27);
  });
});

describe('Update Bot', () => {
  mocker.put(`${BASE_DOMAIN}/chatbot/27`, (): BotRequest => {
    return BotUpdate;
  });
  it('Should return an updated bot', async () => {
    const userBot = await sarufi.updateBot({ id: BotData.id, bot: BotUpdate });
    expect(userBot.success).toBe(true);
    expect(userBot.bot?.id).toBe(26);
  });
});

describe('Delete Bot', () => {
  mocker.delete(`${BASE_DOMAIN}/chatbot/27`, (): { message: string } => {
    return { message: 'Bot deleted' };
  });
  it('Should delete a bot', async () => {
    const deleteBot = await sarufi.deleteBot({ id: BotData.id });
    expect(deleteBot.success).toBe(true);
    expect(deleteBot?.message).toBe('Bot deleted');
  });
});
describe('Start conversation', () => {
  mocker.get(`${BASE_DOMAIN}/chatbot/27`, (): Bot => {
    return BotData;
  });
  it('Should start convo given bot', async () => {
    const userBot = await sarufi.getBot({ id: BotData.id });
    expect(userBot.success).toBe(true);
    expect(userBot.bot?.id).toBe(27);
    if (userBot.chat) {
      const convoResponse = {
        success: true,
        message: ['Hi, How are you?'],
        memory: {
          greets: 'oya',
        },
        next_state: 'end',
      };
      mocker.post(`${BASE_DOMAIN}/conversation`, (): ConversationResponse => {
        return convoResponse;
      });
      const convo: ConversationResponse = await userBot.chat({
        message: 'Yooh',
        chat_id: 'Start',
      });
      expect(convo).toMatchObject(convoResponse);
      expect(convo.memory).toMatchObject(convoResponse.memory);
    }
  });
});
