# NODEJS SARUFI SDK

![TESTS](https://github.com/flexcodelabs/sarufi/actions/workflows/develop.yml/badge.svg)
![RELEASES](https://github.com/flexcodelabs/sarufi/actions/workflows/main.yml/badge.svg)
![DEVELOP PR](https://github.com/flexcodelabs/sarufi/actions/workflows/develop-pr.yml/badge.svg)
![RELEASE PR](https://github.com/flexcodelabs/sarufi/actions/workflows/main-pr.yml/badge.svg)

Sarufi NodeJS SDK to help you interact with SARUFI platform inspired by [Python Sarufi SDK](https://github.com/Neurotech-HQ/sarufi-python-sdk)

## Installation and Use

### Installation

From terminal in the root directory of your project, run

`npm i sarufi`

### Use

`import sarufi from sarufi`

#### Login

We suply username and password for us to be able to login.

> Request: From the imported `sarufi`, call

```JS

sarufi.login({username: "YOUR BEAUTIFUL USERNAME", password: "YOUR VERY STRONG PASSWORD"})

```

> Response for successful login

```JSON
{
  "message": " You have logged in successfully",
  "token": "YOUR BEARER AUTH TOKEN",
  "success": true,
}
```

### Create an Empty chatbot

We supply chatbot details

> Request payload

```JSON
{
  "name": "YOUR AWESOME BOT NAME",
  "description": "PUT DESCRIPTION HERE",
  "industry": "YOUR BOT INDUSTRY",
  "intents": {},
  "flows": {},
}
```

Then we call

```JS

sarufi.createBot({bot: REQUEST PAYLOAD})

```

`NB: ` For detailed description of intents and flows to be used in conversation, refer to [Python Sarufi SDK Docs](https://docs.sarufi.io/docs/Getting%20started%20/create-a-simple-chatbot#help-me-order-a-pizza-intent)

> Response for successful bot creation

```JSON
{
  "success": true,
  "bot": {  "name": "YOUR AWESOME BOT NAME",
            "description": "PUT DESCRIPTION HERE",
            "user_id": "YOUR ID",
            "industry": "YOUR BOT INDUSTRY",
            "intents": {}, //intents if they were supplied
            "flows": {}, //flows if they were supplied
            "updated_at": "DATE THE BOT WAS LAST UPDATED",
            "id": "BOT ID",
            "model_name": "BOT MODEL NAME",
            "created_at": "DATE THE BOT WAS CREATED"
  },
  "chat": "({message: string, chat_id?: uknown}) => RETURNS CHAT RESPONSE" //A callable method that starts a chat with your bot, it takes in a string message and optional chat ID
}
```

### Updating your bot

Updating a bot, takes in the same arguments as creating a bot with addition of bot id

> Request

```JS

sarufi.updateBot({bot: REQUEST PAYLOAD, id: YOUR BOT ID})

```

> Response on success, is the same as the response for creating a bot

### Get bot by id

We call the following method on `sarufi` and pass the bot id

> Request

```JS

sarufi.getBot({id: BOT ID})

```

> Response on success, is the same as the response for creating and updating a bot

### Get bots

We call the following method on `sarufi` and pass the bot id

> Request

```JS
//For version 0.0.1-Beta
sarufi.getBots()

//For versions 0.0.2-Beta and above,
sarufi.getBots({}) //This accepts optional paramemters url and token for persisted authorization tokens.

```

> Response on success

```JSON
{
    "success": true,
    "bots": [] //Array of all bots you created
}

```

### Delete bot

We call the following method on `sarufi` and pass the bot id

```JS

sarufi.deleteBot({id: BOT ID})

```

> Response on success

```JSON
{
    "success": true,
    "message": "A MESSAGE STATING THAT YOUR BOT HAS BEEN DELETED"
}
```

### Start conversation

This requires us to get a bot we want to have a conversation with and calling a chat method

```JS

const bot = sarufi.getBot({id: 'OUR BOT ID'})
bot.chat({message: 'Yooh'})

```

> Response on success

```JSON
{
  "message":  string| number | unknown | [string] | Record<string, unknown> | [Record<string, unknown>],
  "success": true,
  "memory": { [key: string]: string | unknown},
  [key: string]: string | unknown
}
```

### `All Responses have:-`

1. `Success` property that shows wether or not the request was successful
2. For failed requests, the response's success property will be false and additional properties for tracing will be added to the response object

> Example of failed request

```JSON
{
  "success": false,
  "message": "MESSAGE", //an error message explaining the error
  "code": "string",
  "status": "NUMBER",
}
```

Although an error response can have more than those properties, when the status is 500, that will denote an error occured within the sarufi otherwise it will be from an error originating from the remote sarufi server.

### `All requests have an optional url property that can be passed in case the url changes in the future`

`NB`: For detailed documentation, please visit the [Python Sarufi SDK Docs](https://docs.sarufi.io/)

### Developed and Maintained with ❤️ at [Flexcode Labs](https://flexcodelabs.com)
