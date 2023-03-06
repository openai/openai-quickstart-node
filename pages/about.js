import Head from "next/head";
import styles from "./index.module.css";
import NavigationBar from "./NavigationBar";

export default function About() {
  return (
    <div>
      <Head>
        <title>Acerca de</title>
      </Head>
      <NavigationBar/>
      <main className={styles.main}>
        <h1>Acerca de este proyecto</h1>
        <p>Este proyecto se hizo con el fín de mostrar los proyectos que vaya creando con el tiempo y 
            mostrarlos a las personas para que utilicen las investigaciones realizadas sobre tecnología.</p>
        <p>Desarrollado por <b>Felipe Sagredo</b> con tecnología de <b>OpenAI</b>.</p>
      </main>
    </div>
  );
}
