import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";


export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [icon, setIcon] = useState("/dog.png");
  const [result, setResult] = useState();
  const [clicked, setClicked] = useState();


  async function onSubmit(event) {
    event.preventDefault();
    try {
      setClicked(1);
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
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
      setIcon(data.result);
      setAnimalInput("");
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
        <div className={styles.inputForm}>
          <div className={styles.logo}>
            <img src={icon} className={styles.icon} />
            <h2>PlainAI</h2>
          </div>

          <h3>Image Builder</h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="animal"
              placeholder="Enter a prompt"
              value={animalInput}
              onChange={(e) => setAnimalInput(e.target.value)}
            />
            {clicked && <div>thinking...</div>}
            {!clicked && <input type="submit" value="Generate image" />}

          </form>
        </div>


      </main>
      <div className={styles.result}>
        <img src={result} width="100%" />
      </div>
    </div>
  );
}
