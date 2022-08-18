import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { input } = req.body

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(input),
    temperature: 1,
    n: 1,
    presence_penalty: 2.0,
    frequency_penalty: 2.0,
    max_tokens: 1000
  });
  console.log('completion.data.choices:', completion.data.choices)

  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(input) {
  const examples = [
    { word: `gold`, rap: `Tanqueray introduced me to her first cousin [LAST]Gold.` },
    { word: `judgment`, rap: `no material possessions shall cloud my [LAST]judgement.` },
    { word: `man`, rap: `I'm not a business, man, I'm a business [LAST]man.` },
    { word: `rhyme`, rap: `The truth don't always rhyme.` },
    { word: `dots`, rap: `Your last words will be damn what's all these red [LAST]dots.` },
    { word: `cheesecake`, rap: `Nicki's on a diet but her pockets eating [LAST]cheesecake.` },
    { word: `face`, rap: `Was it my whip appeal, or my baby face?` },
    { word: `croissants`, rap: `Hurry up with my damn [LAST]croissants!` },
  ]

  const formattedExamples = examples.map(example => {
    const { word, rap } = example
    const formattedExample = `
    Word: ${word}
    Rap: ${rap}
    <--->`

    return formattedExample
  })

  const prompt = `Give me a rap that ends with the word ${input}.
${formattedExamples.join('')}
  Word: ${input}
  Rap:`
  console.log('prompt:', prompt)

  return prompt
}
