import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";



export default function Home() {
  const [topicInput, setTopicInput] = useState("");
  const [result, setResult] = useState();
  const [isELI5Checked, setIsELI5Checked] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topicInput, isELI5: isELI5Checked}),

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
        <link rel="favicon" href="/favicon.png" />
      </Head>

     
        <header className={styles.header}>
        <div className={styles.headercontainer}>
        <img src="/ni-logo-small.png" className={styles.icon} />
        </div>
 
        </header>
        <main className={styles.main}>
        <h1 className={styles.title}>Nieuwe Instituut Collection bot</h1>
        <p className={styles.intro}>This is a prototype application, testing the usage of the <a href="https://openai.com/blog/introducing-chatgpt-and-whisper-apis">new ChatGPT API by OpenAI</a> to disclose collection information using the language model's general knowledge base combined with a small amount of custom training data and instructions. It can be used to convey information in a conversational interface, more tailored to the user's interests. Additionally, it is conceivable that the model could be user-configurable, switching to a different language or difficulty level. The prototype is created by Jaap Stronks.</p>
        <img src="/maquette.jpeg" className={styles.image} alt="maquette Van Doesburg" />
        <p className={styles.caption}>This is a model by architect and artist Theo van Doesburg.  Photo: Johannes Schwartz. </p>
        <h3>What do you want to know?</h3>
        <p className={styles.question}>Feel free to ask about more about this object. For example, you could ask: what is this a model of? How was it made? What is special about it? Which movement is this an icon of? Where can it be seen in person? Ask away! (<strong>Tip 1</strong>: each answer takes a couple of seconds to generate, so be patient after clicking the 'Get answer' button. <strong>Tip 2</strong>: if you don't know where to start, just ask 'What's so special about this?') </p>
  
        <div className={styles.result}>{result}</div>
        <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.label}>
        Ask a question
        <input className={styles.input}
          type="text"
          name="topic"
          placeholder="What is so special about this?"
          value={topicInput}
          onChange={(e) => setTopicInput(e.target.value)}
        />
      </label>
      <label htmlFor="eli5">
        <input
  type="checkbox"
  id="eli5"
  name="eli5"
  checked={isELI5Checked}
  onChange={() => setIsELI5Checked(!isELI5Checked)}
/>Explain it like I'm five</label>
   
      <input type="submit" value="Get an answer" />
        </form>

      </main>
    </div>
  );
}
