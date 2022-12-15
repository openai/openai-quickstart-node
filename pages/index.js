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

  const prompt1 = "List out five compelling, detailed and clever Reasons why Bishop is clearly gay.\n###\n1.\n\n\n"
  const prompt1Name = "Why Josh is Gay"

  const prompt2 = "List out 5 intricate, complelling details on how and why we are likely living in a simulation.\n###\n1.\n\n\n"
  const prompt2Name = "5 Reasons were likely in a simulation"

  const prompt3 = "list out five of the utmot amazing and astonishing but little known facts.\n###\n1.\n\n\n"
  const prompt3Name = "Surprise Me"

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
