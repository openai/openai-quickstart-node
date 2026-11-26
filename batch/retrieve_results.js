import OpenAI from "openai";
const openai = new OpenAI();

// Set the batch job ID here or pass it as an argument
const BATCH_JOB_ID = "";

const batchId = process.argv[2] ?? BATCH_JOB_ID;

let batch = await openai.batches.retrieve(batchId);

console.log("Batch: ", batch);

// Check the status of the batch job every 30 seconds until it is completed with a timeout of 20 minutes
const TIMEOUT = 1200000;
const startTime = Date.now();
while (
  batch.status !== "completed" &&
  batch.status !== "failed" &&
  Date.now() - startTime < TIMEOUT
) {
  batch = await openai.batches.retrieve(batch.id);
  console.log("Batch status: ", batch.status);
  await new Promise((resolve) => setTimeout(resolve, 30000));
}

if (batch.status === "completed") {
  console.log("Batch completed");
  if (!batch.output_file_id) {
    throw new Error("Completed batch has no output_file_id");
  }

  // Retrieve the results from the output file returned with the batch.
  const resultsFile = await openai.files.content(batch.output_file_id);
  const results = await resultsFile.text();
  console.log("Results: ", results);
} else {
  console.log("Batch job failed or timed out");
}
