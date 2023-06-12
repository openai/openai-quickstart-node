import { Configuration, OpenAIApi } from "openai";
import { MODEL_3_5 } from "../constant/model";
import fs from "fs";
import path from "path";
import { homedir } from "os";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const prompt = req.body.prompt;

  res.status(200).json({ msg: "got it" });

  doChat(prompt);
}

function monitorPromiseToFile(chatPromise, prompt, file) {
  let time = 0;
  let resolveOrReject = false;

  const _p = new Promise((resolve, reject) => {
    chatPromise
      .then((res) => {
        let _t = `## prompt \n ${prompt}`;
        res.data.choices.map((item, index) => {
          _t = `${_t}\n\n\n### Result: ${index + 1}: \n\n ${
            item.message.content
          }\n`;
        });
        fs.writeFileSync(file, _t);
        resolve();
      })
      .catch((e) => {
        fs.writeFileSync(file, `Fail to fetch result: ${e}`);
        reject();
      })
      .finally(() => (resolveOrReject = true));
  });

  const interval = setInterval(() => {
    if (resolveOrReject) {
      clearInterval(interval);
    } else {
      const dots = ".".repeat(time);
      time++;
      fs.writeFileSync(file, dots);
    }
  }, 1000);

  return _p;
}

async function doChat(prompt) {
  console.log("doChat");
  console.log(prompt);

  const completion = createChatCompletion(prompt);

  const _f = homedir + "/Dropbox/tools/output/index.md";
  const _hf = homedir + "/Dropbox/tools/output/history/" + Date.now() + ".md";

  await monitorPromiseToFile(completion, prompt, _f);
  // copy _f to _hf
  fs.copyFileSync(_f, _hf);
}

async function createChatCompletion(prompt) {
  return openai.createChatCompletion({
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
    n: 3, // n 表示把这个问题重复回答多少次
  });

  // let _resolve, _reject;
  // const _p = new Promise((resolve, reject) => {
  //   _resolve = resolve;
  //   _reject = reject;
  // });

  // try {
  //   monitorPromiseToFile(_p);

  //   const completion = await

  //   _resolve(completion.data.choices[0].message.content);
  // } catch (error) {
  //   console.log(error);
  //   _reject("err");
  // }
}
