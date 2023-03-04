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
        message: "Please ask a valid question.",
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
  return `I want you to answer a question about an interior model made by Theo van Doesburg. In your answer, use whatever you know about this topic, but also take into account the following information. Keep your answer under 500 characters, so be concise. Also, don't try to summarize or say too many things in every answer.  The person asking the questions will ask followup questions, so tell one specific tidbit of information at a time. Also, make 2 suggestions for related followup questions the person can ask you, if they want to to dive deeper into a certain topic. Suggest these by saying "You could also ask me about... or ..." and of course swap the '...' with the subjects (who should also be related to this interior model, of course) the person could ask about. One of these should be about the answer you just gave, offering to explain it further, and the other suggestion should be about one specific tidbit of information that was not mentioned in the current answer.
  The interior model that is the subject of the question is a colour design for a ceiling and three walls, for a cinema and dance hall of Café de l'Aubette in Strasbourg, France. It is a dazzlingly incongruous expression of the 1920s De Stijl movement. Designed by Theo van Doesburg, one of the movement’s founders and leading lights, the Aubette’s minimalist, geometric aesthetic was heavily influenced by the work of contemporary artists such as Piet Mondrian. In designing the café’s interiors, Van Doesburg sought to do more than simply place viewers before a painting; he wanted to envelop them in it. The design, from 1926, is for Café Aubette, one of De Stijl's most important architectural projects. As the pioneer of Dutch De Stijl movement, Theo van Doesburg employed his perspective on elementarism and the neo-plastic style to decorate the ceiling and wall of cinema-ballroom with orthogonal composition in primary colors. 
  It was made with pencil and gouache on cardboard, and it is 43 by 74.5 centimeters. It is the only model by Van Doesburg to survive after his death in 1931. At first sight, it seems to be a one-dimensional work. But the walls open outwards, as can be clearly seen in a photo from Van Doesburg’s studio. The model shows how Van Doesburg approached space as the synthesis of painting and architecture. The work is shown as it was acquired: framed. For decades, it was owned by the Swiss Galerie Gmurzynska and it was previously exhibited there as an autonomous visual work, framed on the wall. But such a strictly disciplinary approach was exactly what Van Doesburg was against: for him, a visual work could be an architectural project, model and autonomous artwork all at the same time. It is on display at het Nieuwe Instituut in Rotterdam, The Netherlands. In 1926, three avant-garde artists Theo van Doesburg, Sophie Taeuber-Arp and Jean Arp (or Hans Arp) were commissioned by Paul and Adré Horn to redecorate and design the Café Aubette in Strasbourg. Three artists were equally responsible for different sections of the building. Theo van Doesburg was in charge of the two cafés and two dance halls, Sophie Taeuber for the entrance aisle, tearoom, and two bars, and Jean Arp for the basement, the passage, and billiard room. And all three artists worked together designing the stairwell. The work of the three artists had been called "the Sistine Chapel of abstract art". This historical building still opens as a historical landmark nowadays.
 

Question: ${capitalizedTopic}
Answer:`;
}
