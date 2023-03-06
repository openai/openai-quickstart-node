import Head from "next/head";
import styles from "./index.module.css";
import NavigationBar from "./NavigationBar";

export default function Contact() {
  return (
    <div>
      <Head>
        <title>Contacto</title>
      </Head>
      <NavigationBar/>
      <main className={styles.main}>
        <h1>Contacto</h1>
        <p>Puedes contactarme en la siguiente dirección de correo electrónico:</p>
        <h4>felipesagredogalindo@gmail.com</h4>
      </main>
    </div>
  );
}
