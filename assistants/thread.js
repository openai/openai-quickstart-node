import OpenAI from "openai";
const openai = new OpenAI();

// Set the assistant ID here or pass it as an argument
const ASSISTANT_ID = "";

const assistantId = process.argv[2] ?? ASSISTANT_ID;

// Create a thread
const thread = await openai.beta.threads.create();

console.log("Thread created: ", thread);

// Create a thread and add a message to it
const USER_INPUT = "What is the square root of 25?";
await openai.beta.threads.messages.create(thread.id, {
  role: "user",
  content: USER_INPUT,
});

console.log(`Message added to thread: '${USER_INPUT}'`);

// Run the assistant on the thread
let run = await openai.beta.threads.runs.create(thread.id, {
  assistant_id: assistantId,
});

console.log("Run created: ", run);

// Poll the run results every 10 seconds until the run is completed with a timeout of 5 minutes
const TIMEOUT = 300000;
const startTime = Date.now();
while (
  run.status !== "completed" &&
  run.status !== "failed" &&
  Date.now() - startTime < TIMEOUT
) {
  run = await openai.beta.threads.runs.retrieve(thread.id, run.id);
  console.log("Run status: ", run.status);
  await new Promise((resolve) => setTimeout(resolve, 10000));
}

// Get the updated thread
const threadMessages = await openai.beta.threads.messages.list(thread.id);

for (const message of threadMessages.data) {
  console.log(
    `\n\nRole: ${message.role}\nContent: ${JSON.stringify(
      message.content,
      null,
      2
    )}`
  );
}
