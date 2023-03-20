import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { priceMin, priceMax, gender, age, hobbies } = req.body;
  const prompt = generatePrompt(priceMin, priceMax, gender, age, hobbies);

  console.log(prompt);

  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.6
  });

  console.log(completion.data.choices[0].text);
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(priceMin, priceMax, gender, age, hobbies) {
  return `Suggest 3 Christmas gift ideas between ${priceMin} and ${priceMax}for a ${age} year old ${gender} that is into ${hobbies}.`;
}
