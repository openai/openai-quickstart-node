
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Typewriter from "typewriter-effect";
import Link from "next/link"
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'



export default function Home() {
  const [topicInput, setTopicInput] = useState("");
  const [result, setResult] = useState();
  const [isELI5Checked, setIsELI5Checked] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);
  const { t } = useTranslation();

  const questions = [
    t("doesburgquestion1"),
    t("doesburgquestion2"),
    t("doesburgquestion3"),
    t("doesburgquestion4"),
    t("doesburgquestion5")
  ];
  
  const randomIndex = Math.floor(Math.random() * 5);
  const randomQuestion = questions[randomIndex];

  async function onSubmit(event) {
    event.preventDefault();
  
    // Get the slug from the URL
    const slug = window.location.pathname.split('/')[1];
  
    try {
      setResult(null); // Reset the result state when a new question is submitted
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: topicInput, isELI5: isELI5Checked, slug: slug }), // Pass the slug as an additional argument
  
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
        <Link href="/"> <img src="/ni-logo-small.png" className={styles.icon} /></Link>
        </div>
 
        </header>
        <main className={styles.main}>

        <h1 className={styles.title}><span className={styles.cerial}>Collecti</span>onBot</h1>
        

        <h3>{t('vanDoesburgQuestion')}</h3>
<img src="/maquette.jpeg" className={styles.image} alt={t('vanDoesburgAlt')} />
<p className={styles.caption}>{t('vanDoesburgCaption')}</p>
  
<p className={styles.regular}>{t('vanDoesburgMoreInfo')}</p>
<div className={styles.listwrapper}>
  <ul className={styles.list}>
    <li><strong>{t('vanDoesburgTip1Title')}</strong>: {t('vanDoesburgTip1Text')}</li>
    <li><strong>{t('vanDoesburgTip2Title')}</strong>: {t('vanDoesburgTip2Text')}</li>
  </ul>
</div>

     
        
        {result && (
  <div className={styles.result}>
    <h3 className={styles.collectionboth3}>🤖 CollectionBot:</h3>
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
        <form id="my-form" onSubmit={onSubmit} className={styles.form}>
        <label className={styles.label}>
        {t('questionLabel')}
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
/><span className={styles.labeltext}>{t('eli5label')}</span></label>
   
<input type="submit" value={t('buttonText')} />
        </form>

<p className={styles.disclaimer}>{t('disclaimertext')}</p>
      </main>
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
        'footer',
      ])),
      // Will be passed to the page component as props
    },
  }
}
