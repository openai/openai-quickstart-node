import Head from "next/head";
import { useState, useRef } from "react";
import styles from "./index.module.css";
import chalk from 'chalk';
export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [promptText, setPromptText] = useState("");
  // const [promptArray, setPromptArray] = useState([]);
  const [result, setResult] = useState();
  const [clicked, setClicked] = useState();
  const [focused, setFocused] = useState();
  const inputRef = useRef(null);

  console.log(chalk.red('Hello world!'));
  async function handleBlur(event) {
    event.preventDefault();
    try {
      setPromptText(promptText => promptText + animalInput + " ")
      setAnimalInput("");
      setFocused(1);
    }
    catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  async function onSubmit(event) {
    event.preventDefault();
    try {
      setClicked(1);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: promptText }),
      });
      const data = await response.json();
      if (data.result != '') { setClicked() }
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult(data.result);
      inputRef.current.focus();
      setFocused();
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  return (
    <div>
      <Head>
        <title>Plain AI</title>
        <link rel="icon" href="/dog.png" />
      </Head>
      <main className={styles.main}>
        <h3>PL<em>AI</em>N<em>Image</em></h3>
        <div className={styles.inputForm}>
          {result && (<div className={styles.resultImage}><img src={result} /></div>)}
          {promptText && (<div className={styles.promptText}>{promptText}</div>)}

          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="animal"
              placeholder="Prompt"
              value={animalInput}
              onChange={(e) => setAnimalInput(e.target.value)}
              onBlur={(e) => handleBlur(e)}
              ref={inputRef}
            />
            {clicked && <div className={styles.thinking}>thinking...</div>}
            {(!clicked && focused) && <input type="submit" value="Generate image" />}
          </form>
        </div>
        <div className={styles.logo}>
          <img src="/dog.png" className={styles.icon} />
          <h2>Plain<em>AI</em></h2>
        </div>
        <small className={styles.copyright}>All rights reserved.</small>
      </main>
      <div className={styles.result}>
        <img src={result} width="100%" />
      </div>
    </div>
  );
}