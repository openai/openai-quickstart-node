import { Configuration, OpenAIApi } from 'openai';
import fs from 'fs';

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
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(topic, isELI5, slug), // Pass the isELI5 value to the generatePrompt function
      max_tokens: 800,
      temperature: 0.9,

    });
    res.status(200).json({ result: completion.data.choices[0].text });
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




function generatePrompt(topic, isELI5, slug) {
  const capitalizedTopic =
    topic[0].toUpperCase() + topic.slice(1).toLowerCase();

  let specificInfo = '';
  try {
    specificInfo = fs.readFileSync(`./data/${slug}.txt`, 'utf8');
  } catch (error) {
    console.error(`Error reading file: ${error.message}`);
  }

  const prompt = `I want you to answer a question about a heritage collection item. In your answer, use whatever you know about this topic, but also take into account the following information: ${specificInfo}. Also, don't try to say too many things in every answer. The person asking the questions will ask follow-up questions, so tell one tidbit of information at a time, and expand a little about it. You can use the information provided in this prompt for that, but feel free to add existing knowledge to it. If you mention a certain style, place or person, use your general knowledge to explain what, where or who that is. Also, on a new line, make 1 suggestion for related follow-up questions the person can ask you, if they want to dive deeper into a certain topic. Suggest these by saying "You could also ask me about..." or "Perhaps you would like to ask something about..."
  
Question: ${capitalizedTopic}
Answer:`;

  if (isELI5) {
    console.log('eli5 was checked');
    return `${prompt} Explain it to me like I'm a seven-year-old, so keep it simple, but don't dumb it down too much. If you use difficult words, such as 'gouache' or 'elementarism', place them in quotes and explain what they mean.`;
  }

  return prompt;
}