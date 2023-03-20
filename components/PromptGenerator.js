import { useState } from "react";
import styles from "./PromptGenerator.module.css";

const PromptGenerator = ({ onPromptSubmit }) => {
  const [item, setItem] = useState("");
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [explanation, setExplanation] = useState("");

  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  async function fetchImageCreationExplanation(prompt) {
    try {
      const response = await fetch("/api/generate-explanation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: prompt,
        }),
      });

      const data = await response.json();
      return data.result;
    } catch (error) {
      console.error("Error fetching image creation explanation:", error);
      return "Error fetching image creation explanation.";
    }
  }

  const handleSubmit = async (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    const newPrompt = `A realistic photograph showing how a brand new ${item} would look as if it was redesigned by the Dutch designer/architect ${name}, in the way that it still looks like a ${item} but has been radically transformed in the style of ${name}.`;
    console.log("New prompt:", newPrompt);
    setPrompt(newPrompt);
    console.log("Prompt state:", prompt);
  
    // Fetch image creation explanation from the API
    const explanationPrompt = `You are an AI assistant trying to explain architectural styles to visitors of an architecture museum website. If you would create an image with the following prompt, asking you to create an image that shows the design of an item in the style of a certain architect, how would you create it? Can you explain how you would make sure that this architect's style would find its way into the image you would create? It is not necessary to point out that you yourself are not able to generate images. Assume that OpenAI has a different API that is called with this prompt and generates an image, but is unable to add an explanation. Please add a helpful explanation that explains how you think that the OpenAI image generator would probably operate. But assume that the web page already explains this, so it is best to cut to the chase and simply explain the process. An example response would begin like this: "In order to create an image for an ${item} ad designed by ${name}, an AI assistant will likely first study their previous works to understand the key features of their aesthetic...". But don't go overboard. When testing, your explanation of the prompt was often much more elaborate than the actual image that was generated. For example, earlier responses you gave said things like 'The AI may generate an image that places the redesigned headphones within an architectural setting or against a background that further highlights'. The actual images created by the API were not that elaborate at all. So assume that the image generator has only a moderate level of competence. The prompt is: ${newPrompt}`;
       // Pass the generated prompt to the parent component
       onPromptSubmit(newPrompt);
    const fetchedExplanation = await fetchImageCreationExplanation(explanationPrompt);
    console.log("Image creation explanation:", fetchedExplanation);
  
    // Set the explanation state
    setExplanation(fetchedExplanation);
  
 
  };
  

  return (
    <div className={styles.prompt} >
      <h2 className={styles.formtitle}>Create a prompt</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.question}>
        <label className={styles.promptlabel}>
    I want to see a(n):
    </label>
            <input type="text" className={styles.promptinput} value={item} onChange={handleItemChange} />
            </div>
            <div className={styles.question}>
        <label className={styles.promptlabel}>
    as designed by:</label>
          <select className={styles.promptinput} value={name} onChange={handleNameChange}>
            <option value="">Select a name</option>
            <option value="Rem Koolhaas">Rem Koolhaas</option>
            <option value="Marcel Wanders">Francine Houben</option>
            <option value="Piet Boon">Piet Boon</option>
            <option value="Marcel Wanders">Marlies Rohmer</option>
            <option value="Marcel Wanders">Marcel Wanders</option>
          </select>
          </div>
        
        <button className={styles.promptbutton} type="submit">Generate Image</button>
      </form>
      {explanation && (
              
      <div className={styles.explanation}>
        <h3>Image Creation Explanation</h3>
        <p>ChatGPT's image generator doesn't offer explanations. We asked the text-only version of ChatGPT to explain how the image generator probably went to work with your request: </p>
        <p className={styles.response}>{explanation}</p>
      </div>
    )}
    </div>
  );
};

export default PromptGenerator;
