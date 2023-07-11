import sarufi from '../../src';
import { LoginResponse } from '../../src/shared/interfaces/auth.interface';
import axios from 'axios';
import xhrAdapter from 'axios/lib/adapters/xhr';
import HttpRequestMock from 'http-request-mock';
import { ErrorResponse } from '../../src/shared/interfaces/shared.interface';
import { Bot, BotRequest } from '../../src/shared/interfaces/bot.interface';
import { BotData, BotsData, BotUpdate } from '../mocks/mocks.constants';
import {
  ConversationResponse,
  WhatsappConversationResponse,
} from '../../src/shared/interfaces/conversation.interface';

jest.setTimeout(300000);

axios.defaults.adapter = xhrAdapter;
const mocker = HttpRequestMock.setupForUnitTest('xhr');
const BASE_DOMAIN = 'https://developers.sarufi.io';

// describe('Login User', () => {
//   const loginDTO = {
//     token_type: 'Bearer',
//     scope: 'read:data write:data',
//     expires_in: 86400,
//     api_key: 'basic token',
//   };

//   mocker.post(`${BASE_DOMAIN}/api/access_token`, ():
//     | LoginResponse
//     | ErrorResponse => {
//     return loginDTO;
//   });
//   it('Should return message and token', async () => {
//     const result: LoginResponse | ErrorResponse = await sarufi.login({
//       client_id: '',
//       client_secret: '',
//     });
//     expect(result.api_key).toBeDefined();
//     expect(result).toMatchObject(loginDTO);
//   });
// });

describe('Create Bot', () => {
  mocker.post(`${BASE_DOMAIN}/chatbot`, (): BotRequest => {
    return BotData;
  });
  it('Should return a created bot given a valid token', async () => {
    const createdBot = await sarufi.createBot({
      bot: { name: '', visible_on_community: false },
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
    const userBots = await sarufi.getBots();
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
    const bot: BotRequest = {
      name: "Bennett's Bot",
      description: 'PUT DESCRIPTION HERE',
      industry: 'general',
      visible_on_community: false,
      intents: {
        greets: [
          'hey',
          'hello',
          'hi',
          'howdy',
          'hola',
          'greetings',
          'good morning',
          'good afternoon',
          'good evening',
        ],
        goodbye: [
          'bye',
          'goodbye',
          'see you later',
          'see you soon',
          'see you',
          'talk to you later',
          'talk to you soon',
          'talk to you',
        ],
        order_pizza: [
          'I need a pizza',
          'I want a pizza',
          'order a pizza',
          'I want to order a pizza',
        ],
      },
      model_name: 'models/079d4fa7f3159d44b540c5dd3f146591.pkl',
    };
    const userBot = await sarufi.updateBot({ id: BotData.id, bot });
    expect(userBot.success).toBe(true);
    expect(userBot.bot?.id).toBe(26);
  });
});

describe('Start chat with bot Bot', () => {
  mocker.post(`${BASE_DOMAIN}/conversation`, (): ConversationResponse => {
    return {
      success: true,
      message: ['Hi, How are you?'],
      memory: {
        greets: 'oya',
      },
      next_state: 'end',
    };
  });
  it('Should start a chat with a bot', async () => {
    const chat = await sarufi.chat({
      message: 'Hey',
      bot_id: 27,
      chat_id: 'HEYOO',
    });
    expect(chat.success).toBe(true);
    expect(chat?.message).toBeDefined();
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
      const convo:
        | ConversationResponse
        | WhatsappConversationResponse
        | ErrorResponse = await userBot.chat({
        message: 'Yooh',
        chat_id: 'Start',
      });
      expect(convo).toMatchObject(convoResponse);
      expect(convo?.memory).toMatchObject(convoResponse.memory);
    }
  });
});
