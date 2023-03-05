import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Typewriter from "typewriter-effect";


export default function Home() {
  const [topicInput, setTopicInput] = useState("");
  const [result, setResult] = useState();
  const [isELI5Checked, setIsELI5Checked] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);



  const questions = [
    "What is interesting about this model?",
    "How does this relate to 'The Style'?",
    "What is the history behind this design?",
    "How was this model made?",
    "Who did Van Doesburg collaborate with?"
  ];
  
  const randomIndex = Math.floor(Math.random() * 5);
  const randomQuestion = questions[randomIndex];

  async function onSubmit(event) {
    event.preventDefault();
    try {
      setResult(null); // Reset the result state when a new question is submitted
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
      setIsResultReady(true);
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
        <title>Nieuwe Instituut CollectionBot</title>
        <link rel="favicon" href="/favicon.png" />
        <meta property="og:image" content="/opengraph.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="/opengraph.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nieuwe Instituut CollectionBot" />
        <meta property="og:title" content="Nieuwe Instituut CollectionBot" />
        <meta property="og:description" content="A prototype demonstrating the use of a generative AI application to disclose collection data." />
        <meta property="twitter:description" content="A prototype demonstrating the use of a generative AI application to disclose collection data." />
        
      </Head>

     
        <header className={styles.header}>
        <div className={styles.headercontainer}>
        <img src="/ni-logo-small.png" className={styles.icon} />
        </div>
 
        </header>
        <main className={styles.main}>
        <h1 className={styles.title}>Nieuwe Instituut Collection bot</h1>
        <p className={styles.intro}>This is a prototype application, testing the usage of the generative AI to disclose collection information.</p> 
        
        <p className={styles.regular}>This website was made using the <a href="https://openai.com/blog/introducing-chatgpt-and-whisper-apis">new ChatGPT API by OpenAI</a>. It prepends user questions with specific information about a collection item, allowing for a fair amount of control over the accuracy of the AI's response, while still benefiting from the AI's abilities to add all kinds of information in a customizable, conversational interface. The prototype is created by Jaap Stronks.</p>
        <h3>Ask a question about Van Doesburg's interior model for l'Aubette</h3>
        <img src="/maquette.jpeg" className={styles.image} alt="maquette Van Doesburg" />
        <p className={styles.caption}>This is a model by architect and artist Theo van Doesburg.  Photo: Johannes Schwartz. </p>
      
        <p className={styles.regular}>Feel free to ask about more about the interior model for l'Aubette. For example, you could ask: what is this a model of? How was it made? What is special about it? Which movement is this an icon of? Where can it be seen in person? Ask away!</p>
        <div className={styles.listwrapper}>
        <ul className={styles.list}><li><strong>Tip 1</strong>: each answer takes a couple of seconds to generate, so be patient after clicking the 'Get answer' button.</li><li> <strong>Tip 2</strong>: if you don't know where to start, just ask 'What's so special about this?'</li> </ul>
        </div>
        {result && (
  <div className={styles.result}>
    <h3 className={styles.collectionboth3}>CollectionBot:</h3>
    <Typewriter
      onInit={(typewriter) => {
        typewriter.typeString(result)
          .callFunction(() => {
            console.log('String typed out!');
          })
          .start();
      }}
      options={{
        delay: 15
      }}
    />
  </div>
)}
        <form onSubmit={onSubmit} className={styles.form}>
        <label className={styles.label}>
        Ask a question about this object
        <input className={styles.input}
          type="text"
          name="topic"
          placeholder={randomQuestion}
          value={topicInput}
          onChange={(e) => setTopicInput(e.target.value)}
        />
      </label>
      <label htmlFor="eli5">
        <input
        className={styles.checkmark}
  type="checkbox"
  id="eli5"
  name="eli5"
  checked={isELI5Checked}
  onChange={() => setIsELI5Checked(!isELI5Checked)}
/><span className={styles.labeltext}>Explain it like I'm five</span></label>
   
      <input type="submit" value="Get an answer" />
        </form>

      </main>
    </div>
  );
}
