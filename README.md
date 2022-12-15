# OpenAI API Quickstart - Node.js example app

This is an example pet name generator app used in the OpenAI API [quickstart tutorial](https://beta.openai.com/docs/quickstart). It uses the [Next.js](https://nextjs.org/) framework with [React](https://reactjs.org/). Check out the tutorial or follow the instructions below to get set up.

## Setup

1. If you don’t have Node.js installed, [install it from here](https://nodejs.org/en/)

2. Clone this repository

3. Navigate into the project directory

   ```bash
   $ cd openai-quickstart-node
   ```

4. Install the requirements

   ```bash
   $ npm install
   ```

5. Add your [API key](https://beta.openai.com/account/api-keys) to the .env.local file and save

   ```bash
   @example: 
     OPEN_API_KEY=329rhdsfsdojfsdoin
   ```
   
7. open a terminal, navigate to the folder using `cd` and Run the app (don't type the dollar sign)

   ```bash
   $ OPENAI_API_KEY=$OPENAI_API_KEY npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)! For the full context behind this example app, check out the [tutorial](https://beta.openai.com/docs/quickstart).
