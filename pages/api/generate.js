import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  console.log(process.env.OPENAI_API_KEY)
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${req.body.prompt}: `,
temperature: 0.92,
  max_tokens: 1000,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}
