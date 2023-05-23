import { Configuration, OpenAIApi } from "openai";

// import { Document, Packer } from "docx"
// import { saveAs } from "file-saver"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const { jobName, jobLevel, experience } = req.body;

  // Add your own validation logic for the job inputs
  if (!jobName || !jobLevel || !experience) {
    res.status(400).json({
      error: {
        message: "Please enter valid job details",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(jobName, jobLevel, experience),
      temperature: 0.2,
      max_tokens: 500
    });
    res.status(200).json({ result: completion.data.choices[0].text });

  //   console.log("File saved successfully.");
  //   let doc = new Document()
  //   // Call saveDocumentToFile with the document instance and a filename
  //   doc.createParagraph("Title")
  //   doc.createParagraph("Subtitle")
  //   doc.createParagraph("Heading 1")
  //   doc.createParagraph("Heading 2")
  //   doc.createParagraph(
  //   "Aliquam gravida quam sapien, quis dapibus eros malesuada vel. Praesent tempor aliquam iaculis. Nam ut neque ex. Curabitur pretium laoreet nunc, ut ornare augue aliquet sed. Pellentesque laoreet sem risus. Cras sodales libero convallis, convallis ex sed, ultrices neque. Sed quis ullamcorper mi. Ut a leo consectetur, scelerisque nibh sit amet, egestas mauris. Donec augue sapien, vestibulum in urna et, cursus feugiat enim. Ut sit amet placerat quam, id tincidunt nulla. Cras et lorem nibh. Suspendisse posuere orci nec ligula mattis vestibulum. Suspendisse in vestibulum urna, non imperdiet enim. Vestibulum vel dolor eget neque iaculis ultrices."
  // )
  // saveDocumentToFile(doc, "New Document.docx")
  // .then(() => {
  //   console.log("File saved successfully.");
  // })
  // .catch(error => {
  //   console.error("Error saving the file:", error);
  // });
  //   // saveDocumentToFile2(doc, "New Document.docx")

  //   console.log("File saved successfully.");






  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}


function generatePrompt(jobName, jobLevel, experience) {
  const prompt = `Write personal requirements , technical ability and responsibilities for ${jobLevel} ${jobName} with ${experience} years of experience.Modify answer under these topics : first personal features, technical ability , teamwork skills.try to find as much information as you can so that you don't have to look elsewhere
  
  Responsibilities:
  Requirements:`;
  
  console.log('The generated prompt is: ${prompt}');
  return prompt;
  }

  // function saveDocumentToFile(doc, fileName) {
  //   // Create new instance of Packer for the docx module
  //   const packer = new Packer()
  //   // Create a mime type that will associate the new file with Microsoft Word
  //   const mimeType =
  //     "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  //   // Create a Blob containing the Document instance and the mimeType
  //   packer.toBlob(doc).then(blob => {
  //     const docblob = blob.slice(0, blob.size, mimeType)
  //     // Save the file using saveAs from the file-saver package
  //     saveAs(docblob, fileName)
  //   })
  // }


  // function saveDocumentToFile2(doc, fileName) {
  //   return new Promise((resolve, reject) => {
  //     const packer = new Packer();
  //     const mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  
  //     packer.toBlob(doc).then(blob => {
  //       const docBlob = blob.slice(0, blob.size, mimeType);
  //       try {
  //         saveAs(docBlob, fileName);
  //         resolve();
  //       } catch (error) {
  //         reject(error);
  //       }
  //     }).catch(error => {
  //       reject(error);
  //     });
  //   });
  // }
  
