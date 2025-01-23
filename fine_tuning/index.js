import OpenAI from "openai";
import fs from "fs";
const openai = new OpenAI();

// Create a training file for the fine-tuning job
const trainingFile = await openai.files.create({
  file: fs.createReadStream("fine_tuning/training_data.jsonl"),
  purpose: "fine-tune",
});

console.log("Training file created");
console.log(trainingFile);

// Create a fine-tuning job
const fineTuningJob = await openai.fineTuning.jobs.create({
  training_file: trainingFile.id,
  model: "gpt-4o-mini-2024-07-18",
});

console.log("Fine tuning job created");
console.log(fineTuningJob);
console.log("Next step: Run use_model.js with Job ID ", fineTuningJob.id);
