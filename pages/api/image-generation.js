import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { prompt } = req.body;

  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });

    const imageUrl = response.data.data[0].url;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error(`Error with OpenAI API request: ${error.message}`);
    res.status(500).json({ error: { message: 'An error occurred during your request.' } });
  }
}
