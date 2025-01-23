import OpenAI from "openai";
import readline from "readline";

const openai = new OpenAI();

// Create a readline interface to read user input from the terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages = [{ role: "system", content: "You are a helpful assistant." }];

// Send an array of messages to the Chat Completions API
async function chat() {
  rl.question("You: ", async (input) => {
    messages.push({ role: "user", content: input });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
    });

    const response = completion.choices[0].message.content;
    console.log(`Assistant: ${response}`);

    messages.push({ role: "assistant", content: response });

    chat();
  });
}

// Start a multi-turn conversation in the terminal
chat();
