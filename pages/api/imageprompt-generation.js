import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const truncateResponse = (response, maxLength) => {
  let sentences = response.split(/(?<=\.|\?|!)\s+/);
  let truncated = "";
  let index = 0;

  while (index < sentences.length && (truncated.length + sentences[index].length) <= maxLength) {
    if (truncated.length > 0) {
      truncated += " "; // Add a space before appending a new sentence
    }
    truncated += sentences[index];
    index++;
  }
  return truncated;
};

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

  const topic = req.body.topic || "";

  if (topic.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please ask a valid question.",
      },
    });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant who will create a good prompt for an image generation service. You will be used on a museum website that gives insight into how a certain architect's style may be reflected in their work, and that also gives insight into how generative AI may be used to create interesting user experiences. You will be asked to create a prompt that lets an image generator, based on generative AI, create a realistic photographic image of an item as if it was designed by a certain Dutch architect. Reflect on the unique style of this architect's work, and be creative when thinking of ways this style could be recognized in the item if the architect in question would design it. This does not need to be realistic, it is more educational and informative to be extreme in the imagined application of the architect's style, because this is al part of an exercise in recognizing distinctive styles. Be specific and elaborate in the prompt you are generating for the image service and be sure to describe specific visual details. You could describe the type of camera, lighting and perspective and other specific characteristics of a photo. You could also elaborate on the purpose of the photo. It could be a photo by a newspaper journalist, or a commercial photo for a brochure. Remember that an image generator is only as good as the prompt it is given, so make sure the prompt is elaborate, detailed and specific. But importantly, don't make your prompt too long, it should be under 950 characters." },
        { role: "user", content: topic },
      ],
      max_tokens: 1200,
      temperature: 0.9,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });


    let result = completion.data.choices[0].message.content.trim();
    result = truncateResponse(result, 950);

  res.status(200).json({ result });
  } catch (error) {
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
