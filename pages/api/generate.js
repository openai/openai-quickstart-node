import { Configuration, OpenAIApi } from 'openai';
import axios from 'axios';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          'OpenAI API key not configured, please follow instructions in README.md',
      },
    });
    return;
  }

  const topic = req.body.topic || '';
  const isELI5 = req.body.isELI5 || false;
  const slug = req.body.slug || ''; // Get the slug from the request body
console.log(slug);

  if (topic.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please ask a valid question.',
      },
    });
    return;
  }


  try {
    const prompt = await generatePrompt(topic, isELI5, slug); // Generate the prompt first
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt, // Pass the isELI5 value to the generatePrompt function
      max_tokens: 400,
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      stop: ["\n"],

    });
    res.status(200).json({ result: completion.data.choices[0].text.trim() });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}





async function generatePrompt(topic, isELI5, slug) {
  let specificInfo = '';
  try {
    
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/data/${slug}.txt`
    );
   specificInfo = response.data;
  } catch (error) {
    console.error(`Error fetching data for ${slug}:`, error);
  }

  const capitalizedTopic =
    topic[0].toUpperCase() + topic.slice(1).toLowerCase();


    const prompt = `Here's a question about a part of the heritage collection of het Nieuwe Instituut, a museum for architecture, design and digital culture based in Rotterdam, the Netherlands. In your answer, use information from this prompt, but feel free to add your own knowledge. Do not tell too many things at once (you will get followup questions), but do elaborate on the aspect of the object in question your answer focuses on. If you mention a certain style, place or person, use your general knowledge to explain what, where or who that is. Also, make 1 suggestion for a related follow-up question. ` + specificInfo + ` Question: ${capitalizedTopic} Answer:`;

  if (isELI5) {
    console.log('eli5 was checked');
    return `${prompt} Answer the following question like I'm a seven-year-old, so keep it simple, but don't dumb it down too much. In your answer, place difficult answers in quotes and explain what they mean. `;
  }
  console.log("Generated prompt:", prompt);
  return prompt;
}