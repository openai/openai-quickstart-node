import OpenAI from "openai";
const openai = new OpenAI();

// Set the fine-tuning job ID here or pass it as an argument
const FINE_TUNING_JOB_ID = "";

const fineTuningJobId = process.argv[2] ?? FINE_TUNING_JOB_ID;

let fineTuningJob = await openai.fineTuning.jobs.retrieve(fineTuningJobId);

console.log("Fine tuning job: ", fineTuningJob);

// Check the status of the fine-tuning job every 10 seconds until it is completed with a timeout of 20 minutes
const TIMEOUT = 1200000;
const startTime = Date.now();
while (
  fineTuningJob.status !== "succeeded" &&
  fineTuningJob.status !== "failed" &&
  Date.now() - startTime < TIMEOUT
) {
  fineTuningJob = await openai.fineTuning.jobs.retrieve(fineTuningJob.id);
  console.log("Fine tuning job status: ", fineTuningJob.status);
  await new Promise((resolve) => setTimeout(resolve, 10000));
}

if (fineTuningJob.status === "succeeded") {
  console.log("Fine tuning job completed");
  const fineTunedModel = fineTuningJob.fine_tuned_model;
  console.log("Fine tuned model: ", fineTunedModel);

  // Use the fine tuned model
  const USER_INPUTS = [
    "Who painted the Mona Lisa?",
    "What's the largest ocean on Earth?",
    "What planet is closest to the Sun?",
  ];

  for (const userInput of USER_INPUTS) {
    const response = await openai.chat.completions.create({
      model: fineTunedModel,
      messages: [
        {
          role: "system",
          content: "You are a factual chatbot that is also sarcastic.",
        },
        { role: "user", content: userInput },
      ],
    });
    console.log(`\n\nUser input: ${userInput}`);
    console.log(`Response: ${response.choices[0].message.content}`);
  }
} else {
  console.log("Fine tuning job failed or timed out");
}
