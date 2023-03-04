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

  const topic = req.body.topic || '';
  if (topic.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid topic",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(topic),
      max_tokens: 300,
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

function generatePrompt(topic) {
  const capitalizedTopic =
    topic[0].toUpperCase() + topic.slice(1).toLowerCase();
  return `Give critical feedback on a suggested topic for a public event. The event is a conference, exhibition or public debate, and the topic is: ${topic}. The event is organized by Nieuwe Institute, a museum for architecture, design and digital culture in The Netherlands. You should criticize the ways that this topic might be cliche, overdone, or otherwise not interesting. Also, you could critice how the topic might be overly high-brow, elitist and performative, in the sense that the organizers want to jump on a bandwagon and organize something that sounds hip in a desparate attempt to appear relevant and knowledgeable, while actually being shallow. Another way you could criticize the topic if it is in danger of being exclusionary. Be somewhat constructive, but don't shy away from offering harsh criticism. If an idea is not good enough for a big exhibition, there are some alternative courses of action: 1) it could be sidelined as a smaller exhibition by an independent artist in 'Gallery 3', the Nieuwe Instituut dedicated space for experimental exhibitions by third parties; 2) it could be a topic for a Research Night, a smaller event more focused on exploring a topic, 3) it could first be discussed in a cross-departmental meeting, 4) the organizer should first run this past by Aric to see what he thinks of it. Only offer one or two of these 4 options at a time. 

  Topic: Workwear
  Feedback: Look, I get why you would want to do an exhibition about workwear. Today, workwear is a powerful symbol of the working class with an unavoidable presence on the street and the catwalk.  No wonder that politicians, scientists and artists like to have themselves photographed in workwear to convey certain messages. So, make sure you don't fall into the same trap – it might be considered somewhat elitist to celebrate blue collar fashion in this setting, tho show off that, as a cultural institution, you are really in touch with the working class. It could be a good idea for an exhibition, but you might want to run this by Aric first.

  Topic: The Metaverse
  Feedback: The virtualization of private and public space is surely interesting, and with Apple on the verge of entering the arena, AR and VR are probably going to be a big deal in the near future. But even Mark Zuckerberg is pretending he didn't just spend 36 billion dollars on this. For the forseeable time, only rich corporations and hobbyists are going to be able to afford this technology. An event centered on this technology is at risk of celebrating exclusionary technology that deepens the divide between the haves and the have-nots. A practical exhibition could be something for Gallery 3, but if you want to explore the political or ethical implications of this technology, you might want to consider a Research Night.

Topic: ${capitalizedTopic}
Feedback:`;
}
