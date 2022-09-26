import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

let pim = {
  name: "Vaibhav Gupta",
  address: {
    home: "89 Aggarsain Nagar, Near SS Jain Sabha, Sri Ganganagar, Rajasthan",
    office: "3A4250 Microsoft main campus, Building 3, ISB Road, Gachibowli, Hyderabad",
  },
  pan: "ASDFG76543S",
  aadhar: "098765431234",
  contact: {
    email: {
      personal: "vaibhavgupta.spa@gmail.com",
      work: "vaibgupta@microsoft.com"
    },
    phone: {
      primary: "+91-8076173969",
      secondary: "+91-8512095255",
    },
  },
};

let trainingData = `
Compose a formal mail sharing the information as requested

Prompt: Send items to my delivery address
Response: Hi, 
Thanks for reaching out. Kindly deliver the said items to my address – ${pim.address.home}. 
Thanks and regards,
${pim.name}

Prompt: Share my work location
Response: Dear Sir/ Ma’am, 
Wish you’re doing well 
You can find me at my work location which is ${pim.address.office}. Please let me know if you need further assistance with the directions. 
Regards, 
${pim.name}

Prompt: Send my home address
Response: Hi,
Thanks for reaching out. Please find my current address mentioned below – 
${pim.address.home}. 
Do let me know if you need any other info. 
With regards, 
${pim.name}

Prompt: Invite to my house party
Response: Hey,
Hope you're doing great! I am throwing a party at my place and you're invited. See you at ${pim.address.home} around 6pm tomorrow? Please RSVP. 
Cheers, 
${pim.name}
`

function generatePrompt(prompt) {
  const capitalizedPrompt =
    prompt[0].toUpperCase() + prompt.slice(1).toLowerCase();
  return `${trainingData}+" "+
Prompt: ${capitalizedPrompt}
Message:`;
}

export default async function (req, res, temp) {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    max_tokens: 2000,
    prompt: generatePrompt(req.body.prompt),
    temperature: temp/10,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}