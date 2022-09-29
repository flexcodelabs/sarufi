# NODEJS SARUFI SDK

![Tests](https://github.com/flexcodelabs/sarufi/actions/workflows/release.yml?branch=develop)
![Create PR](https://github.com/flexcodelabs/sarufi/actions/workflows/pr.yml?branch=develop)

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

`sarufi.log({username: "YOUR BEAUTIFUL USERNAME", password: "YOUR VERY STRONG PASSWORD"})`

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

`sarufi.createBot(REQUEST PAYLOAD)`

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
};
```

### Updating your bot



### Developed and Maintained with ❤️ at [Flexcode Labs](https://flexcodelabs.com)
