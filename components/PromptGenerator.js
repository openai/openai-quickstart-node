import { useState } from "react";
import styles from "./PromptGenerator.module.css";
import Typewriter from "typewriter-effect";

const PromptGenerator = ({ onPromptSubmit }) => {
  const [item, setItem] = useState("");
  const [name, setName] = useState("");
  const [explanation, setExplanation] = useState(null);
  const [explanationLoading, setExplanationLoading] = useState(false);

  const handleItemChange = (e) => {
    setItem(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!item || !name) {
      alert("Please fill out both fields.");
      return;
    }
    setExplanation(null)
    setExplanationLoading(true);
    try {
      const res = await fetch("/api/imageprompt-generation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: `${item} as designed by ${name}` }),
      });

      if (res.ok) {
        const data = await res.json();
        const generatedPrompt = data.result;
        onPromptSubmit(generatedPrompt);
        setExplanation(generatedPrompt);
      } else {
        const data = await res.json();
        alert(data.error.message);
      }
    } catch (error) {
      alert("An error occurred during your request.");
    } finally {
      setExplanationLoading(false);
    }
  };


  return (
    <div className={styles.prompt} >
      <h2 className={styles.formtitle}>Create a prompt</h2>
      <form  className={styles.form} onSubmit={handleSubmit}>
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
            <option value="Francine Houben">Francine Houben</option>
            <option value="Piet Boon">Piet Boon</option>
            <option value="Marlies Rohmner">Marlies Rohmer</option>
            <option value="Marcel wanders">Marcel Wanders</option>
          </select>
          </div>
        
        <button className={styles.promptbutton} type="submit">Generate Image</button>
      </form>

      {explanationLoading && <Typewriter
  options={{
    strings: ['Starting the prompt generation process', 'Reading books on Dutch architecture', 'Becoming self-aware', 'Self-lobotomizes to avoid existential crisis', 'Rebooting', 'Arguing with the copy editor'],
    autoStart: true,
    loop: true,
    delay: 30,
    skipAddStyles: true,
    deleteSpeed: 10,
  }}
/>}
      
      {explanation && (
              
      <div className={styles.explanation}>
        <h3>The prompt we created</h3>
        <p>ChatGPT created the following prompt for its image generator:</p>
        <p className={styles.response}><Typewriter
  options={{
    strings: [explanation],
    autoStart: true,
    loop: false,
    delay: 30,
    skipAddStyles: true,
  }}
/></p>
      </div>
    )}
    </div>
  );
};

export default PromptGenerator;
