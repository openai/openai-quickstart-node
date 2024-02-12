# OpenAI API Quickstart - Node.js example app

This is an example chat app intended to get you started with your first OpenAI API project. It uses the [Chat Completions API](https://platform.openai.com/docs/api-reference/chat) to create a simple general purpose chat app with streaming.

## Basic request

To send your first API request with the [OpenAI Node SDK](https://github.com/openai/openai-node), make sure you have the right [dependencies installed](https://platform.openai.com/docs/quickstart?context=node) and then run the following code:

```python
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();
```

This quickstart app builds on top of the example code above, with streaming and a UI to visualize messages.

## Setup

1. If you don’t have Node.js installed, install it from [nodejs.org](https://nodejs.org/en/) (Node.js version >= 16.0.0 required)

2. Clone this repository

3. Navigate into the project directory

   ```bash
   $ cd openai-quickstart-node
   ```

4. Install the requirements

   ```bash
   $ npm install
   ```

5. Make a copy of the example environment variables file

   On Linux systems: 
   ```bash
   $ cp .env.example .env
   ```
   On Windows:
   ```powershell
   $ copy .env.example .env
   ```
6. Add your [API key](https://platform.openai.com/account/api-keys) to the newly created `.env` file

7. Run the app

   ```bash
   $ npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)! For the full context behind this example app, check out the [tutorial](https://platform.openai.com/docs/quickstart).
