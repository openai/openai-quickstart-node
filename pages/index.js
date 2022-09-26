import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [promptInput, setPromptInput] = useState("");
  const [tempInput, setTempInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: promptInput }),
    });
    const data = await response.json();
    setResult(data.result);
    // setPromptInput("");
    // setTempInput("");
  }

  return (
    <div>
      <Head>
        <title>Message composer</title>
        <link rel="icon" href="/message.png" />
      </Head>

      <main className={styles.main}>
        <img src="/message.png" className={styles.icon} />
        <h3>Compose my message</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="Prompt"
            placeholder="Enter a short response"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <input
            type="range" 
            min="1" max="10" 
            class="slider"
            name="temp"
            // placeholder="Enter number between 0-10"
            value={tempInput}
            onChange={(e) => setTempInput(e.target.value)}
          />
          <input type="submit" value="Generate message" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
