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

  const movies = req.body.movies || [];
  console.log(req.body);
  if (movies.length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid list of movie titles",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003", // Update the model version if needed
      prompt: generatePrompt(movies),
      temperature: 0.6,
      max_tokens: 200, // Ensure you set an appropriate limit
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
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

function generatePrompt(movies) {
    //log the movies that are being sent over
    console.log(movies);
    // The movies parameter is a string of movie names separated by commas.
    return `Given the list of favorite movies, suggest 10 other movies that the person might enjoy.
  
  Favorite Movies: The Dark Knight, Inception, The Matrix
  Suggestions: Interstellar, Blade Runner, In Time, Source Code, A Scanner Darkly, Minority Report, Predestination, Edge of Tomorrow, Transcendence, The Adjustment Bureau
  
  Favorite Movies: ${movies}
  Suggestions:`;
  }