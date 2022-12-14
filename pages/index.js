import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Lottie from "lottie-react";
import Loader from "../assets/lotties/loader.json";


export default function Home() {
  const [queryInput, setQueryInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    if (loading) {
      return;
    }
    
    setLoading(true); 

    try {

      const response = await fetch("/api/elon-musk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: queryInput }),
      });
      const data = await response.json();
      setResult(data.result);
      setQueryInput("");

    } catch(e) {
      alert('failed to generate')
    } 
    finally 
    {
      setLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Ask Elon Musk</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="elon-musk"
            placeholder="Message Elon"
            value={queryInput}
            onChange={(e) => setQueryInput(e.target.value)}
          />
          <input type="submit" value="Send" />
        </form>
        <div style={{width: "10%"}}>
          {loading && (
              <Lottie 
                animationData={Loader} 
                loop={true} 
                width={100}
                />     
          )}
        </div>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
