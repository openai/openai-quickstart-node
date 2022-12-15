import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [result, setResult] = useState();

  async function callAI(prompt) {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: prompt }),
    });
    const data = await response.json();
    setResult(data.result);
  }

  const prompt1 = "Why is liam like the way he is?"
  const prompt1Name = "Prompt 1"

  const prompt2 = "Does he even realize what he's doing?"
  const prompt2Name = "Prompt 2"

  const prompt3 = "Who is jefferson airplane"
  const prompt3Name = "Prompt3"

  return (
    <div>
      <Head>
        <title>Prompt</title>
      </Head>

      <main className={styles.main}>
        <button type="button" onClick={() => callAI(prompt1)}>{prompt1Name}</button>
        <button type="button" onClick={() => callAI(prompt2)}>{prompt2Name}</button>
        <button type="button" onClick={() => callAI(prompt3)}>{prompt3Name}</button>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
