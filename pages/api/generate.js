import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function isValidAPIKey() {
  return configuration.apiKey;
}

function isEmptyString(inputStr) {
  return inputStr.trim().length === 0;
}

export default async function (req, res) {
  if (!isValidAPIKey()) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (isEmptyString(animal)) {
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
      prompt: generatePrompt(animal),
      temperature: 0.6,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    const errRes = error.response
    // Consider adjusting the error handling logic for your use case
    if (errRes) {
      console.error(errRes.status, errRes.data);
      res.status(errRes.status).json(errRes.data);
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

function capitalizationWord(word) {
  if (isEmptyString(word)) {
    return '';
  }

  const firstLetter = word[0].toUpperCase();
  const rest = word.slice(1).toLowerCase();

  return firstLetter + rest;
}

function generatePrompt(animal) {
  const capitalizedAnimal = capitalizationWord(animal);
  return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}
