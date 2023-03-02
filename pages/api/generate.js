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
  const modelId = req.body.modelId || 'text-davinci-003';

  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      }
    });
    return;
  }

  try {
    if (modelId === "text-davinci-003") {
      const completion = await openai.createCompletion({
        model: modelId,
        prompt: generatePrompt(animal),
        temperature: 0.6,
      });
      res.status(200).json({ result: completion.data.choices[0].text });
    } else if (modelId === "gpt-3.5-turbo") {
      console.log(generateMessage(animal))
      const chatCompletion = await openai.createChatCompletion({
        model: modelId,
        messages: generateMessage(animal),
        temperature: 0.6,
      });
        res.status(200).json({
          result: chatCompletion.data.choices[0].message.content
        });
    } else {
      res.status(400).json({
        error: {
            message: "Please enter a valid model ID",
        }
      })
    }
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
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}

function  generateMessage(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return [
    {
      role: "system",
      content: "Suggest three names for an animal that is a superhero."}
    ,
    {
      role: "user",
      content: "Animal: Cat"
    },
    {
      role: "assistant",
      content: "Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline"
    },
    {
      role: "user",
      content: "Animal: Dog"
    },
    {
      role: "assistant",
      content: "Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot"
    },
    {
      role: "user",
      content: "Animal: " + capitalizedAnimal
    }
  ]
}
