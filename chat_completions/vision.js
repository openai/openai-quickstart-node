import OpenAI from "openai";
const openai = new OpenAI();

const USER_INPUT = "What are the main differences between the two images?";

const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      role: "user",
      content: [
        {
          type: "text",
          text: USER_INPUT,
        },
        {
          type: "image_url",
          image_url: {
            url: "https://publicstorageoaidemoenv.blob.core.windows.net/oai-sample-apps/vision-sample-image.webp",
          },
        },
        {
          type: "image_url",
          image_url: {
            url: "https://publicstorageoaidemoenv.blob.core.windows.net/oai-sample-apps/vision-sample-image2.webp",
          },
        },
      ],
    },
  ],
});

console.log(`User input: ${USER_INPUT}\n-------------\n`);
console.log(response.choices[0].message.content);
