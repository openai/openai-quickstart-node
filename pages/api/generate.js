import OpenAI from 'openai';

const OPEN_API_KEY_ERROR_MESSAGE = 'OPENAI_API_KEY environment variable is not defined';

const CONFIG = {
  apiKey: process.env.OPENAI_API_KEY, // .env value is automatically loaded as a string
};

// V4 OpenAPI client
const openai = new OpenAI({
  apiKey: CONFIG.apiKey,
});

export default async function (req, res) {
  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: 'Please enter a valid animal',
      },
    });
    return;
  }

  try {
    if (CONFIG.apiKey === undefined) {
      throw new Error(OPEN_API_KEY_ERROR_MESSAGE);
    }
    const message = {
      role: 'user', // role: 'user' || 'system' || 'assistant'
      content: generatePrompt(animal), // prompt for the completion
    };
    const chatCompletion = await openai.chat.completions.create({
      messages: [message],
      model: 'gpt-3.5-turbo',
    });
    res.status(200).json({ result: chatCompletion.choices[0].message.content });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      });
    }
  }
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}
