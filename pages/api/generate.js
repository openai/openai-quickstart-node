import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.specie),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(specie) {
  const capitalizedspecie =
    specie[0].toUpperCase() + specie.slice(1).toLowerCase();
  return `Suggest three names for a specie that is a superhero.

specie: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
specie: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
specie: ${capitalizedspecie}
Names:`;
}
