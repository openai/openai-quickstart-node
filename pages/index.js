import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import styles from "./index.module.scss";
import Header from "./Header";
export default function Index() {
  const [textInput, setTextInput] = useState("");
  const [promptText, setPromptText] = useState("");
  // const [promptArray, setPromptArray] = useState([]);
  const [result, setResult] = useState([{}]);
  const [clicked, setClicked] = useState();
  const [focused, setFocused] = useState();
  const inputRef = useRef(null);
  useEffect(() => {
    console.log("result");
  }, []);
  async function handleBlur(event) {
    event.preventDefault();
    try {
      setPromptText(promptText => promptText + textInput + " ")
      setTextInput("");
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
        body: JSON.stringify({ promptText: promptText }),
      });
      const data = await response.json();
      if (data.result != '') { setClicked() }
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      setResult([{ prompt: promptText, imageUrl: data.result }, ...result]);
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
        <Header />
        <div className={styles.inputForm}>
          {result[0].imageUrl && (<div className={styles.resultImage}><img src={result[0].imageUrl} /></div>)}
          {promptText && (<div className={styles.promptText}>{promptText}</div>)}
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="promptText"
              placeholder="Prompt"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onBlur={(e) => handleBlur(e)}
              ref={inputRef}
            />
            {clicked && <div className={styles.thinking}>thinking...</div>}
            {(!clicked && focused) && <input type="submit" value="Generate image" />}
          </form>
        </div>
        <ul className={styles.resultList}>
          {result.map((e, idx) =>
            <li key={idx} >
              <img width="100%" src={e.imageUrl} />
              <h4>{e.prompt}</h4>
            </li>
          )}
        </ul>

        <div className={styles.logo}>
          <img src="/dog.png" className={styles.icon} />
          <h2>Plain<em>AI</em></h2>
        </div>
        <small className={styles.copyright}>All rights reserved.</small>
      </main>
    </div>
  );
}