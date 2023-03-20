import Head from "next/head";
import styles from "./generator.module.css";
import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Header from '../components/Header';
import PromptGenerator from "../components/PromptGenerator";
import ImageGenerator from "../components/ImageGenerator";
import { useState } from "react";

const Home = () => {
  const [prompt, setPrompt] = useState(null);

  const handlePromptSubmit = (generatedPrompt) => {
    setPrompt(generatedPrompt);
  };


  return (
    <div>
    <Header />
    <div class="page">
    <main className={styles.main}>
    <div className={styles.h1title}><h1>Art generator</h1></div>
    <div  className={styles.generator}>
      
      <PromptGenerator onPromptSubmit={handlePromptSubmit} />
      {prompt && <ImageGenerator key={prompt} prompt={prompt} />}
    </div>
    </main>
    </div>
    </div>
  );
};

export default Home;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'footer',
      ])),
    },
  }
}
