import OpenAI from "openai";
const openai = new OpenAI();

const response = await openai.images.generate({
  model: "dall-e-3",
  prompt: "A happy strawberry running through a field of flowers",
  n: 1,
  size: "1024x1024",
});

console.log(response.data[0].url);
