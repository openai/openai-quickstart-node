import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput: userInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setUserInput("");
  }

  return (
    <div>
      <Head>
        <title>Prompt</title>
      </Head>

      <main className={styles.main}>
        <h3>What's your prompt</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="prompt"
            placeholder="type your prompt here"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input type="submit" value="AI it." />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
