import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  // console.log(req.body.argument)
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body.argument),
    temperature: 0.3,
    max_tokens: 256,
  });
  // console.log(completion.data.choices[0].text)
  // console.log(JSON.stringify(completion.data.choices[0].text));
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(argument) {
  return `Create an array of the top counterarguments

Argument: ${argument}
Counter Arguments:`;
}
