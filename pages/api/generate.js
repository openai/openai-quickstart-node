import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const promptText = req.body.promptText || "";
  if (promptText.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt",
      },
    });
    return;
  }

  try {
    const response = await openai.createImage({
      prompt: generatePrompt(promptText),
      n: 1,
      size: "512x512",

    });
    // image_url = response.data.data[0].url;

    // const completion = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: generatePrompt(animal),
    //   temperature: 0.6,
    // });
    res.status(200).json({ result: response.data.data[0].url });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(promptText) {
  const capitalizedAPromptText =
    promptText[0].toUpperCase() + promptText.slice(1).toLowerCase();
  return `An image of ${capitalizedAPromptText}`;
}

// function generatePrompt(animal) {
//   const capitalizedAPromptText =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Suggest three names for an animal that is a superhero.

// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedAPromptText}
// Names:`;
// }
