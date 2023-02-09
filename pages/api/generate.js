import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function(req, res) {

    if (!configuration.apiKey) {
        res.status(500).json({
            error: {
                message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }


    try {
        var completion = null;
        completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: generatePromptNPC(req.body),
            temperature: 0.3,
            max_tokens: 1000
        })
    res.status(200).json({ result: completion.data.choices[0].text });
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`);
            res.status(500).json({
                error: {
                    message: error.message,
                }
            });
        }
    }
}

function isNotEmpty(string) {
    return (string != "" && string != undefined)
}

function generatePromptNPC(info) {
    var wInfoString = ""
    if (isNotEmpty(info.wInfo))
        wInfoString = ": " + info.wInfo;
    else
        wInfoString = "is unknown to me."

    var nameString = ""
    if (isNotEmpty(info.cName))
        nameString = "The character's name is : " + info.cName
    else
        nameString = "Please think of a name for my character."
    
    var contextString = ""
    if (isNotEmpty(info.cContext))
        contextString = "A bit of context about their life : " + info.cContext
    else
        contextString = "Please think of some context for the character, like parents, friends and pets."

    var backstoryString = ""
    if (isNotEmpty(info.cBackstory))
        backstoryString = "The character's backstory : " + info.cBackstory
    else
        backstoryString = "Please think of a proper backstory for this character, like some big events they went through."
    
    var expertiseString = ""
    if (isNotEmpty(info.cExpertise))
        expertiseString = "They are experts at : " + info.cExpertise
    else
        expertiseString = "Please think of some expertise for this character."

    var classString = ""
    if (isNotEmpty(info.cClass))
        classString = "The character's class or profession is " + info.cClass
    else
        classString = "Please think of a class and/or profession for this character."
    
    var personalityString = ""
    if (isNotEmpty(info.cPersonality))
        personalityString = "Some personality traits for this character: " + info.cPersonality
    else
        personalityString = "Please think of some personality traits for this character."
    
    var looksString = ""
    if (isNotEmpty(info.cLooks))
        looksString = "The character's looks : " + info.cLooks
    else
        looksString = "Please think of how this character would look."
    

    const prompt = `
    I need to create a character for my tabletop RPG game. Here is some info about the character:
    The world the character lives in ${wInfoString}
    ${nameString}
    ${contextString}
    ${backstoryString}
    ${expertiseString}
    ${classString}
    ${personalityString}
    ${looksString}

    Please answer all these questions for me and deliver it as a nice story of around 1000 words.
    `
    console.log(prompt);
    return prompt;
}