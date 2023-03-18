import Head from "next/head";
import styles from "./index.module.css";
import Link from 'next/link'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Header from '../components/Header';


export default function Home() {
  const { t } = useTranslation('common');

  return (
    <div>
      <Head>
        <title>{t('title')}</title>
        <link rel="favicon" href="/favicon.png" />
        <meta property="og:image" content="/opengraph.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:image" content="/opengraph.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('title')} />
        <meta property="og:title" content={t('title')} />
        <meta property="og:description" content={t('description')} />
        <meta property="twitter:description" content={t('description')} />
      </Head>

      
    <Header />
  
    
      
      <main className={styles.main}>
        <h1 className={styles.title}>{t('indextitle1')}<span className={styles.cerial}>{t('indextitle2')}</span></h1>
        <p className={styles.intro}>{t('intro')}</p> 
        <p className={styles.regular}>{t('regular_1')}<a href="https://openai.com/blog/introducing-chatgpt-and-whisper-apis">{t('regular_2')}</a>{t('regular_3')}</p>

        <h4 className={styles.subtitle}>{t('frontpageSubtitle')}</h4>
  

        <div className={styles.cardContainer}>
          <Link href="/van-doesburg-interior-model" className={styles.card}>
            <img src="/maquette.jpeg" className={styles.cardImage} alt={t('van_doesburg_alt')} />
            <div className={styles.titleWrapper}><h4 className={styles.cardTitle}>{t('van_doesburg_title')}</h4></div>
          </Link>
          
          <Link href="/sonneveld-house" className={styles.card}>
            <img src="/sonneveld.jpg" className={styles.cardImage} alt={t('sonneveld_alt')} />
            <div className={styles.titleWrapper}><h4 className={styles.cardTitle}>{t('sonneveld_title')}</h4></div>
          </Link>
        </div>

        <p className={styles.disclaimer}>{t('disclaimer')}</p>
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
