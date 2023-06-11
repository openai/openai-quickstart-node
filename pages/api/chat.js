import { Configuration, OpenAIApi } from "openai";
import { MODEL_3_5 } from "../constant/model";
import fs from "fs";
import path from "path";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const prompt = req.body.prompt;

  console.log(123);
  console.log(prompt);

  res.status(200).json({ msg: "got it" });

  doChat(prompt);
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

async function doChat(prompt) {
  console.log(doChat);
  console.log(prompt);
  let _resolve, _reject;
  const _p = new Promise((resolve, reject) => {
    _resolve = resolve;
    _reject = reject;
  });

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
  } catch (error) {
    console.log(error);
    _reject("err");
  }
}
