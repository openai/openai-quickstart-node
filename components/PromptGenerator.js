import { useState } from "react";
import styles from "./PromptGenerator.module.css";

const PromptGenerator = ({ onPromptSubmit }) => {
  const [item, setItem] = useState("");
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log("handleSubmit called");
    e.preventDefault();
    const newPrompt = `A realistic photograph showing how a brand new ${item} would look as if it was redesigned by the Dutch designer/architect ${name}, in the way that it still looks like a ${item} but has been radically transformed in the style of ${name}.`;
    console.log("New prompt:", newPrompt);
    setPrompt(newPrompt);
    console.log("Prompt state:", prompt);

    // Pass the generated prompt to the parent component
    onPromptSubmit(newPrompt);
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
            <option value="Piet Boon">Piet Boon</option>
            <option value="Marcel Wanders">Marcel Wanders</option>
          </select>
          </div>
        
        <button className={styles.promptbutton} type="submit">Generate Image</button>
      </form>
    </div>
  );
};

export default PromptGenerator;
