import OpenAI from "openai";
const openai = new OpenAI();

const embedding = await openai.embeddings.create({
  model: "text-embedding-3-small",
  input: "I love embeddings",
  encoding_format: "float",
});

console.log(embedding.data[0].embedding);
