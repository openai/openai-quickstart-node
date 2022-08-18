import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const { input } = req.body

  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Artist: Lupe Fiasco\n\nLyrics:\n`,
    temperature: 1,
    n: 1,
    presence_penalty: 2.0,
    frequency_penalty: 2.0,
    max_tokens: 4000
  });
  console.log('completion.data.choices:', completion.data.choices)

  res.status(200).json({ result: completion.data.choices[0].text });
}

/*
  LINE COMPLETION FEATURE:
  ALGORITHM 1:
  1. Input entire sentence.
  2. Take last word in sentence.
  3. Look up words that rhyme with that last word using DataMuse API.
  -- We could also ask GPT-3 for rhymes, but it's not very good at that.
  4. Ask GPT-3 for a rap whose last word is that rhyme word looked up in step #3.
  5. Return.

  ALGORITHM 2:
  1. Input entire sentence
  2. Ask GPT-3 for a rap line that can follow that entire sentence.

  MEDIA SYNTHESIS FEATURE:
  ALGORITHM 3:
  1. Ask GPT-3 for lyrics.
  2. Send those lyrics to Uberduck for TTS.
  3. Automatically generate a reference track for uberduck by:
  - finding a TTS speech that will allow you to emphasize certain words
  - finding a tool that will automatically retrieve musical rhythm from text, such as by moving each accented syllable
  to the closest accented beat
  3. Send uberduck that reference track.
  4. Generate a beat track by using:
  - Jukebiox: https://github.com/openai/jukebox/
  - OpenAI MuseNet: https://openai.com/blog/musenet/ https://openai.com/blog/musenet/#fn2
  - Pop Music Transformer: https://github.com/YatingMusic/remi

*/

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
