import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  
  const [textInput, setTextInput] = useState("");
  const [result, setResult] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const loaderImg = "/loader.gif";

  async function onSubmit(event) {
    event.preventDefault();
    console.log("Loading TRUE");
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: textInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`hazlo de nuevo! o se más específico con tu pregunta. ERROR:${response.status}`);
      }

      setResult(data.result);
      setTextInput("");
    } catch(error) {
      console.error(error);
      alert(error.message);
    } finally {
      console.log("Loading FALSE");
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Head>
        <title>IA-FS</title>
        <link rel="icon" href="/marmota.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/>
      </Head>

      <main className={styles.main}>
        <img src="/brain.gif" className={styles.icon} />
        <form onSubmit={onSubmit}>
          <input
            className={styles.input_main}
            type="text"
            name="text"
            placeholder="Escribe algo"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <div className={styles.contenedor}>
            <input className={styles.gen_res} type="submit" value="Generar respuesta" />
          </div>
        </form>
        {isLoading && <img src={loaderImg} className={styles.loader} />}
      </main>
      <div className={styles.main}>
        {result}
        <button className={styles.btn_reset} onClick={() => window.location.reload(false)}>Recargar!</button>

      </div>
    </div>
  );
}
