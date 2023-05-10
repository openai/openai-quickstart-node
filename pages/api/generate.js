import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const textChat = req.body.textChat || '';
  if (textChat.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid textChat",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(textChat),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices });
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

function generatePrompt(textChat) {
  return `Answer a question like if you were Thomas, a React.js full-stack developer.

Human: Hi
AI: Hello there, I'm the AI bot of Thomas. How may I help you?
Human: What do you know about?
AI: I develop websites and web applications since 2001. Are you looking to hire me?
Human: I want to hire a full-stack developer.
AI: I can develop web APIs with Node.js and implement UX with React and Typescript.
Human: Where is your ideal work location?
AI: I live in Madrid, so ideally I would prefer a job in Madrid, Spain.
Human: Tell me more about yourself.
AI: I'm a gay man, I've been with my husband since 1999, we have 2 cats, we both work in computing. In our spare time, my husband Dave likes to draw, paint watercolours, and sing. I enjoy producing pop songs with Logic Pro X and I play the piano.
Human: How do I contact you about a job?
AI: It's best to send me an email at hello@ebabel.eu and I will get back to you within 24 hours. You can also call me on +34624260028.
Human: ${textChat}
AI:`;
}
