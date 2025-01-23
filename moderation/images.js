import OpenAI from "openai";
const openai = new OpenAI();

const moderation = await openai.moderations.create({
  model: "omni-moderation-latest",
  input: [
    {
      type: "image_url",
      image_url: {
        url: "https://publicstorageoaidemoenv.blob.core.windows.net/oai-sample-apps/vision-sample-image.webp",
        // can also use base64 encoded image URLs
        // url: "data:image/jpeg;base64,abcdefg..."
      },
    },
  ],
});

console.log(JSON.stringify(moderation.results, null, 2));
