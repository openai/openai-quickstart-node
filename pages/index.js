import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";


export default function Home() {
  const [topicInput, setTopicInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topicInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setTopicInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }




  return (
    <div>
      <Head>
        <title>Nieuwe Instituut Collection bot</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <img src="/ni-logo-small.png" className={styles.icon} />
        <img src="/maquette.jpeg" className={styles.image} alt="maquette Van Doesburg" />
        <p className={styles.caption}>This is a model by architect and artist Theo van Doesburg.  Photo: Johannes Schwartz.</p>
        <h3>What do you want to know?</h3>
        <p className={styles.question}>Feel free to ask about more about this object. For example, you could ask: what is this a model of? How was it made? What is special about it? Which movement is this an icon of? Where can it be seen in person? Ask away! (<strong>Tip 1</strong>: each answer takes a couple of seconds to generate, so be patient after clicking the 'Get answer' button. <strong>Tip 2</strong>: if you don't know where to start, just ask 'What's so special about this?') </p>
  
        <div className={styles.result}>{result}</div>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="topic"
            placeholder="What is so special about this?"
            value={topicInput}
            onChange={(e) => setTopicInput(e.target.value)}
          />
          <input type="submit" value="Get an answer" />
        </form>
        
      </main>
    </div>
  );
}
