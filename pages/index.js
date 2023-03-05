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
      </Head>

      <main className={styles.main}>
        <img src="/Vinyl_fs.png" className={styles.icon} />
        <h3>Pregúntale algo a la IA. :)</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Escribe algo"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <input type="submit" value="Generar respuesta" />
        </form>
        {isLoading && <img src={loaderImg} className={styles.loader} />}
        <div className={styles.result}>
        {result}
        </div>
        <button className="boton_reset" onClick={() => window.location.reload(false)}>Recargar!</button>
      </main>
    </div>
  );
}
