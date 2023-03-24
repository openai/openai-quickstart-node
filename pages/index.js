import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { CssBaseline } from "@nextui-org/react";
import { useTheme, Text } from '@nextui-org/react';
import { Radio } from "@nextui-org/react";

// import custom elements
import { Morals } from './elements/morals.js';






export default function Home(props) {
  const { theme } = useTheme();
  const morals = props.morals;
  const holidays = props.holidays;
  const [childInput, SetChildNameInput] = useState("");
  const [moralInput, SetMoralInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ child: childInput, moral: moralInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setResult(data.result);
      SetChildNameInput("");
      SetMoralInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }


  return (
    <div>
      <Head>
        <title>Tiny Tales</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>Generate your 2-minute bedtime story</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="child"
            placeholder="Enter your child's name"
            value={childInput}
            onChange={(e) => SetChildNameInput(e.target.value)}
          />

          <Radio.Group label="Story Types" defaultValue="moral">
            <Radio value="moral">Morals</Radio>
            <Radio value="holiday">Holidays</Radio>
          </Radio.Group>


          {Morals()}


          <label for="moral">Moral of the story:</label>
          <select
            name="moral"
            style={{ marginBottom: '1em' }}
            value={moralInput}
            onChange={(e) => SetMoralInput(e.target.value)}

          >


          </select>
          <input type="submit" value="Generate story" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}


import fsPromises from 'fs/promises';
import path from 'path'
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data/data.json');
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);

  return {
    props: objectData
  }
}