import { Configuration, OpenAIApi } from "openai";
import { MODEL_3_5 } from "../constant/model";
import fs from "fs";
import path from "path";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  let _resolve, _reject;
  const _p = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });

  const prompt = fs.readFileSync(
    "/Users/kala/project/github/kala-ai/pages/api/prompt.md",
    "utf8"
  );

  try {
    monitorPromiseToFile(_p);

    const completion = await openai.createChatCompletion({
      model: MODEL_3_5.TURBO_3_5,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.8,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
      // n: 10, n 表示把这个问题重复回答多少次
    });

    _resolve(completion.data.choices[0].message.content);

    // console.log(completion.data.choices[0].text);

    res
      .status(200)
      .json({ result: completion.data.choices[0].message.content });
  } catch (error) {
    _reject("err");
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

function monitorPromiseToFile(promise) {
  let time = 0;
  let resolveOrReject = false;

  promise
    .then((res) => {
      fs.writeFileSync(
        "/Users/kala/project/github/kala-ai/pages/api/output.md",
        res
      );
    })
    .catch((e) => {
      fs.writeFileSync(
        "/Users/kala/project/github/kala-ai/pages/api/output.md",
        e
      );
    })
    .finally(() => (resolveOrReject = true));

  const interval = setInterval(() => {
    if (resolveOrReject) {
      clearInterval(interval);
    } else {
      const dots = ".".repeat(time);
      time++;
      fs.writeFileSync(
        "/Users/kala/project/github/kala-ai/pages/api/output.md",
        dots
      );
    }
  }, 1000);
}
