import fs from "fs";
import OpenAI from "openai";
const openai = new OpenAI();

const file = await openai.files.create({
  file: fs.createReadStream("batch/requests.jsonl"),
  purpose: "batch",
});

console.log("Batch file created");
console.log(file);

const batch = await openai.batches.create({
  input_file_id: file.id,
  endpoint: "/v1/chat/completions",
  completion_window: "24h",
});

console.log("Batch created");
console.log(batch);

console.log("Next step: Run retrieve_results.js with Job ID ", batch.id);
console.log("This can take up to 24h to complete.");
