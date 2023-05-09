import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [textChatInput, setTextChatInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ textChat: textChatInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      setTextChatInput("");
    } catch(error) {
      // todo: implement error handling logic.
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>Chat with my AI</title>
        <link rel="icon" href="/eBabel_logo_144x.png" />
      </Head>

      <main className={styles.main}>
        <img src="/eBabel_logo_144x.png" className={styles.icon} />
        <h3>Chat with my AI</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="textChat"
            placeholder="What's your question?"
            value={textChatInput}
            onChange={(e) => setTextChatInput(e.target.value)}
          />
          <input type="submit" value="Send your question" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
