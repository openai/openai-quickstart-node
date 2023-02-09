import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import InputField from "./components/InputField";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1hVb_jlF3oxL9YuBRparqF9CJcnHKxmQ",
  authDomain: "npcmaker-62152.firebaseapp.com",
  projectId: "npcmaker-62152",
  storageBucket: "npcmaker-62152.appspot.com",
  messagingSenderId: "106157963553",
  appId: "1:106157963553:web:85e2e9614766d4c7392660",
  measurementId: "G-TRM7RQG5HM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default function Home() {
  const [wInfo, setwInfo] = useState();
  const [cName, setcName] = useState();
  const [cContext, setcContext] = useState();
  const [cBackstory, setcBackstory] = useState();
  const [cExpertise, setcExpertise] = useState();
  const [cClass, setcClass] = useState();
  const [cPersonality, setcPersonality] = useState();
  const [cLooks, setcLooks] = useState();

  const [result, setResult] = useState();
  const [submitting, setSubmitting] = useState(false);
  // const [continueResult, setContinueResult] = useState("");
  
  async function onSubmit(event) {
    event.preventDefault();
    try {

      setSubmitting(true);

      const request = { 
        wInfo: wInfo, 
        cName: cName,
        cContext: cContext, 
        cBackstory: cBackstory, 
        cExpertise: cExpertise, 
        cClass: cClass, 
        cPersonality: cPersonality, 
        cLooks: cLooks
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();

      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setSubmitting(false);
      setResult(data.result);
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error.message);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Create my NPC</h3>
          <InputField name="worldInfo" value={wInfo} onChange={(e) => setwInfo(e.target.value)} placeholder="World Info, ex: Technological level, fiction or reality, Forgotten Realms (be as broad as you can here, maybe even a small story)"/>
          <InputField name="characterContext" value={cName} onChange={(e) => setcName(e.target.value)} placeholder="Character Name (will be generated if left empty)"/>
          <InputField name="characterContext" value={cContext} onChange={(e) => setcContext(e.target.value)} placeholder="Character Context, ex: Where do they live, do they have parents alive or any close friends?"/>
          <InputField name="characterBackstory" value={cBackstory} onChange={(e) => setcBackstory(e.target.value)} placeholder="Character Backstory: What has your character been through so far?"/>
          <InputField name="characterExpertise" value={cExpertise} onChange={(e) => setcExpertise(e.target.value)} placeholder="Character Expertise, ex: Lockpicking, politics, warfare, gambling"/>
          <InputField name="characterClass" value={cClass} onChange={(e) => setcClass(e.target.value)} placeholder="Character Class/Profession: Do they have a 'class'? Like 'rogue' or maybe even just 'cook'."/>
          <InputField name="characterPersonality" value={cPersonality} onChange={(e) => setcPersonality(e.target.value)} placeholder="Character Personality, ex: Flamboyant, Tsundere, Bashful"/>
          <InputField name="characterLooks" value={cLooks} onChange={(e) => setcLooks(e.target.value)} placeholder="Character Looks, ex: blonde hair, big forehead, long legs"/>

          <button disabled={submitting} onClick={onSubmit}>Generate npc</button>
          <div className={styles.result}>
            {result}
          </div>
      </main>
    </div>
  );
}
