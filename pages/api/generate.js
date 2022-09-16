import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.insect),
    temperature: 0.6,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(insect) {
  const capitalizedinsect =
    insect[0].toUpperCase() + insect.slice(1).toLowerCase();
  return `Suggest three names for an insect that is a superhero.

insect: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
insect: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
insect: ${capitalizedinsect}
Names:`;
}
