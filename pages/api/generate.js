import { Configuration, OpenAIApi } from "openai";



const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const { jobName, jobLevel, experience } = req.body;

  // Add your own validation logic for the job inputs
  if (!jobName || !jobLevel || !experience) {
    res.status(400).json({
      error: {
        message: "Please enter valid job details",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(jobName, jobLevel, experience),
      temperature: 0.4,
      max_tokens: 500,
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


function generatePrompt(jobName, jobLevel, experience) {
  const prompt = `Write personal requirements , technical ability and responsibilities for ${jobLevel} ${jobName} with ${experience} years of experience.Modify answer under these topics :Job requirements, first personal features, technical ability , teamwork skills.try to find as much information as you can so that you don't have to look elsewhere`
  const prompt2 = `First ,a litte information about ${jobName} with a title as "Job description" . Then write responsibilities of ${jobLevel} ${jobName} with bullet points . At last write comprehensive required knowledge , skills and experience of ${jobLevel} ${jobName} with ${experience} year experience. Write titles of answer.`
  const prompt3 = `Act like a hiring manager with +10 years of experience. First, write 4-5 sentences about ${jobName} with a title as "About the role" . Then write extensive responsibilities of ${jobLevel} ${jobName} with min 5 and max 10 bullet points. At last write required knowledge, skills and experience of ${jobLevel} ${jobName} with ${experience} year experience. Write titles of answer.`
  const  prompt4 = `Act like a hiring manager with +10 years of experience working for PASHA Bank Azerbaijan. First, write 4-5 sentences about ${jobName} with a title as "About the role" . Then write extensive responsibilities of ${jobLevel} ${jobName} with min 5 and max 10 bullet points. At last write required knowledge, skills and experience of ${jobLevel} ${jobName} with ${experience} year experience. Write titles of answer.
  
  Responsibilities:
  Requirements:`;
  
  console.log('The generated prompt is: ${prompt}');
  console.log('The generated prompt is: ${prompt}');
  return prompt4
  }

  
