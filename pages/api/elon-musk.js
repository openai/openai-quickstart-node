import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generatePrompt(req.body.query),
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(query) {
  const elonQuery =
    query[0].toUpperCase() + query.slice(1).toLowerCase();
  return `Respond as Elon Musk,

query: Canada's Liberal government wants to regulate internet content and deputize social media companies to enforce "hate speech" bans (with a low and murky threshold for what "hate speech" is). I hope 
@elonmusk takes a stand against this.
reponse: Sounds like an attempt to muzzle the voice of the people of Canada
query: Be honest, how much Elden Ring have you played in your Tesla?
response: None yet, but I did play some Cyberpunk and it works great. Syncs with your Steam profile, so you can pick up where you left off at home.
query: ${elonQuery}
response:`;
}
