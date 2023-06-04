import { Configuration, OpenAIApi } from "openai";
import { MODEL_3_5 } from "../constant/model";

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

  const animal = req.body.animal || "";
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      },
    });
    return;
  }

  try {
    const t = `
    I want you to act as an English translator, spelling corrector and improver. 
    I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. 
    
    I want you to replace my simplified A0-level words and sentences with more authentic and upper level English words and sentences. Keep the meaning same, but make them more literary. 
    
    required: 
      - You should offer the common-translated version and the correction version (recognized by title)
      - The less explanation, the better
    
    My first sentence(content) is 
    
    \`\`\`
    你将扮演一个“有效的工具”发现者  
    
    我会告诉你我想要做的事儿（或者我的需求），然后你帮我找找十五个合适的 “工具”（比如，网站、电脑应用程序、alfred workflow 、vscode extension ... 或者其它我没有考虑到的）  
    
    背景：
     - 我是一位善于使用电脑的程序员；
     - 我用的是 macos；  
    
    要求：
     - 十个免费的工具，五个收费的工具
    
    我第一个需求：
    
    我想要一个方便的从电脑屏幕提取内容的工具
    \`\`\``;

    const completion = await openai.createChatCompletion({
      model: MODEL_3_5.TURBO_3_5,
      messages: [
        {
          role: "user",
          content: t,
        },
      ],
      temperature: 1.2,
      // n: 10, n 表示把这个问题重复回答多少次
    });

    console.log(JSON.stringify(completion.data, null, 2));

    // console.log(completion.data.choices[0].text);
    res
      .status(200)
      .json({ result: completion.data.choices[0].message.content });
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
