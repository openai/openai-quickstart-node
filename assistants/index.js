import OpenAI from "openai";
const openai = new OpenAI();

// Create an assistant
const assistant = await openai.beta.assistants.create({
  name: "Math Tutor",
  instructions:
    "You are a personal math tutor. Write and run code to answer math questions.",
  // Add the code interpreter tool to run code
  tools: [{ type: "code_interpreter" }],
  model: "gpt-4o-mini",
});

console.log("Assistant created: ", assistant);
console.log("Next step: Run thread.js with the assistant ID ", assistant.id);
