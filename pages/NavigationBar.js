import Link from "next/link";
import styles from "./index.module.css";

export default function NavigationBar() {
  return (
    

    <nav className={styles.navbar}>
      <ul className={styles.navbar__list}>
        <li className={styles.navbar__item}>
          <Link legacyBehavior href="/">
            <a>Inicio</a>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Link legacyBehavior href="/about">
            <a>Acerca de</a>
          </Link>
        </li>
        <li className={styles.navbar__item}>
          <Link legacyBehavior href="/contacto">
            <a>Contacto</a>
          </Link>
        </li>
      </ul>
    </nav>
    
  );
}
