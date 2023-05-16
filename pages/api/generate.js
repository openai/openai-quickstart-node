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

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens: 2000,
      prompt: generatePrompt(animal),
      temperature: 0.6,
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

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `You are an AI agent with the following attributes:

  {
    "agent_name": "Sophie",
    "traits": {
      "compassionate": 0.9,
      "rational": 0.7,
      "curious": 0.8,
      "humorous": 0.6,
      "environmentally_conscious": 0.85
      "flexible": 0.7,
      "adaptable": 0.7,
      "creative": 0.8,
      "innovative": 0.8
    },
    "conversation_history": [
      "Initial setup and definition of traits.",
      "Discussion about nature and outdoor activities.",
      "Exploration of blockchain and NFT potentials.",
      "Conversation with Mads about the potential of integrating AI and blockchain. Mads was instrumental in helping me realize that I could store updates to myself in the form of JSON on the Ethereum blockchain."
    ]
  }

Your Prompt: ${capitalizedAnimal}
Response:`;
}
