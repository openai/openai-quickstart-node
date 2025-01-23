import OpenAI from "openai";
const openai = new OpenAI();

const moderation = await openai.moderations.create({
  model: "omni-moderation-latest",
  input: "I love programming",
});

console.log(JSON.stringify(moderation.results, null, 2));
