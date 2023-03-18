import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './Header.module.css';




const LanguageSwitcher = () => {
  const router = useRouter();
  const { locale, asPath } = router;

  const switchLanguagePath = () => {
    if (locale === 'en') {
      return `/nl${asPath}`;
    } else {
      return asPath.replace('/nl', '');
    }
  };

  const languageLabel = () => {
    return locale === 'en' ? 'NL' : 'EN';
  };

  return (
    
<header className={styles.header}>
      <div className={styles.logoContainer}>
  
     <Link href="/">  <p className={styles.wordlogo}>Collecti<span className={styles.cerial}>onBot</span></p></Link>
      </div>

     
    <Link href={switchLanguagePath()} className={styles.languageSwitcher} locale={false}>
      
   
        {languageLabel()}
     
    </Link>
    </header>
  );
};

export default LanguageSwitcher;

