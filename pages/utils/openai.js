import { Configuration, OpenAIApi } from "openai";
import { MODEL_3_5 } from "../constant/model";
import fs from "fs";
import path from "path";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const fs = require("fs");

async function monitorPromiseToFile(promises, file) {
  const result = [];

  promises.forEach((promise, index) => {
    result[index] = {
      title: `Result ${index + 1}:`,
      content: "",
    };
  });

  const interval = setInterval(() => {
    let isAllResolved = true;

    for (let i = 0; i < promises.length; i++) {
      if (result[i].content === "") {
        isAllResolved = false;
        result[i].content += ".";
        fs.writeFileSync(file, getResultString(result));
      }
    }

    if (isAllResolved) {
      clearInterval(interval);
    }
  }, 1000);

  await Promise.all(
    promises.map((promise, index) => {
      return promise.then((res) => {
        result[index].content = res;
        fs.writeFileSync(file, getResultString(result));
      });
    })
  );
}

function getResultString(result) {
  let resultString = "";
  result.forEach((res) => {
    resultString += `${res.title}\n${res.content}\n\n`;
  });
  return resultString;
}

async function doChat(prompt) {
  console.log(doChat);
  console.log(prompt);

  const completionPromise = openai.createChatCompletion({
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
  });

  return completionPromise;
}
