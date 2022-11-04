import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [argumentInput, setArgumentInput] = useState("");
  const [result, setResult] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ argument: argumentInput }),
    });
    const data = await response.json();
    // console.log(data)
    setResult(data.result);
    // setArgumentInput("");
  }

  function NewlineText(props) {
    console.log(props)
    const text = props.text;
    return text.split('\n').map(str => <p>{str}</p>);
  }  


  return (
    <div>
      <Head>
        <title>AI Counter Argument</title>
        <link rel="icon" href="/podium.png" />
      </Head>

      <main className={styles.main}>
        <img src="/podium.png" className={styles.icon} />
        <h3>Counter My Argument</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="argument"
            placeholder="Enter an argument"
            value={argumentInput}
            onChange={(e) => setArgumentInput(e.target.value)}
          />
          <input type="submit" value="Generate counter arguments" /> 
        </form>
        <div className={styles.result}>
          <NewlineText text={result ?? ''} />
        </div>
      </main>
    </div>
  );
}
