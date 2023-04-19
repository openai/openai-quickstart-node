import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./index.module.css";
import {
  useSpeechSynthesis,
  useSpeechRecognition
} from "react-speech-kit";

export default function Home() {
  const [start, setStart] = useState(true);
  const [name, setName] = useState('');
  const [question, setQuestionInput] = useState("");
  
  //const [value, setValue] = useState('');
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setQuestionInput(result);
    },
  });
 
  const [result, setResult] = useState();
  const { speak, voices } = useSpeechSynthesis();
  const voice = voices[1];
  const rate = 1.2;
  const pitch = 2;
  // const [conversationHistory, setConversationHistory] = useState({
  //   question: "",
  //   answer:""
  // });

 const handlerStart = ()=>{
  setStart(false)
  speak({ text: `Hola ${name}, como estas?`, voice, pitch, rate });
 }

    async function callMe() {
      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question: question,
          }),
        });

        const data = await response.json();
        if (response.status !== 200) {
          throw data.error || new Error(`Request failed with status ${response.status}`);
        }

        setResult(data.result);
        console.log(data.result);
     
        speak({ text: data.result, voice, pitch, rate });
      
        setQuestionInput("");

      } catch(error) {
        // Consider implementing your own error handling logic here
        console.error(error);
        alert(error.message);
      }
    }

  
  const handlerListen = () =>{
    setQuestionInput(listen)
    setResult("");
    setQuestionInput("")
  }
   const handlerStop = () => {
     setQuestionInput(stop);
     setTimeout(()=>{
      callMe(); 
     },200)
     
     
     setResult("");
    
   };

  
  
  return (
    <div className="app-content">
      {start === true ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={handlerStart}>empezar</button>
        </>
      ) : (
        <>
          <Head>
            <title>OpenAI Quickstart</title>
            <link rel="icon" href="/dog.png" />
          </Head>

          <main className={styles.main}>
            {/* <img src="/dog.png" className={styles.icon} /> */}
            <h3>Hablemos {name}</h3>

            <input
              type="text"
              name="question"
              placeholder="Dejanos tu pregunta?"
              value={question}
              onChange={(e) => setQuestionInput(e.target.value)}
            />

            <button onMouseDown={handlerListen} onMouseUp={handlerStop}>
              🎤
            </button>

            {listening && <div>Microfono listo para hablar!</div>}
            <div className={styles.result}>{result}</div>
            {/* <div dangerouslySetInnerHTML={{ __html: result }} /> */}
          </main>
          <div>
            {/* <textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
        /> */}
          </div>
        </>
      )}
    </div>
  );
}
