import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [validInput, setValidInput] = useState(true);
  const [result, setResult] = useState();

  const onChangeHandler = (e) => {
    setAnimalInput(e.target.value);
    if (e.target.value.trim()) setValidInput(true);
  };
  async function onSubmit(event) {
    event.preventDefault();
    if (!animalInput.trim()) return setValidInput(false);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            className={!validInput && styles.invalidInput}
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={onChangeHandler}
            minLength={2}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
