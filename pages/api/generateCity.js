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

  const city = req.body.city || '';
  if (city.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid city",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(city),
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

function generatePrompt(city) {
  const capitalizedCity =
    city[0].toUpperCase() + city.slice(1).toLowerCase();
  return `I'm looking to make a new homepage for a city. I've got a number of categories that I'm hoping to fill for content for the webpage.
  please generate the following content for the city of: ${capitalizedCity}

  Since this is going to be placed into a webpage, I'm hoping you can place the result in an array of seven elements. This way, the elements can be accessed individually.

  - three new stories
  - one story you can read more about
  - three main stories to appear on tiles

  Here is an example for Boston:

  const bostonHomepageContent = [
    // Three New Stories
    {
      title: "Exciting Cultural Festival in Boston",
      description: "Experience the vibrant culture of Boston with the upcoming cultural festival, featuring music, art, and delicious cuisine.",
    },
    {
      title: "New Public Transportation System Unveiled",
      description: "Boston introduces an efficient and eco-friendly public transportation system, making commuting easier for all residents.",
    },
    {
      title: "Tech Hub Expansion Spurs Job Growth",
      description: "Boston's thriving tech industry continues to expand, offering exciting job opportunities in cutting-edge fields.",
    },
    
    // One Story You Can Read More About
    {
      title: "Historic Freedom Trail Reopens",
      description: "Discover the rich history of Boston as the iconic Freedom Trail reopens after extensive renovations. Learn more about the city's revolutionary past.",
      link: "Read More",
    },
    
    // Three Main Stories to Appear on Tiles
    {
      title: "Boston Harbor Revitalization Project",
      description: "Explore the plans for the Boston Harbor revitalization project, creating a stunning waterfront destination for locals and tourists alike.",
    },
    {
      title: "Boston's Culinary Delights",
      description: "Indulge in Boston's diverse culinary scene, from seafood delights to international cuisine. Taste the flavors of the city.",
    },
    {
      title: "Boston's Top Family-Friendly Attractions",
      description: "Plan your family adventure in Boston with our guide to the city's top family-friendly attractions and activities.",
    },
  ];
`;

//   return `Suggest three names for an animal that is a superhero.

// Animal: Cat
// Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
// Animal: Dog
// Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
// Animal: ${capitalizedCity}
// Names:`;


}
