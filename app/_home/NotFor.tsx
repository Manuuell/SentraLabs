import type { Translations } from "../i18n/dictionaries";
import styles from "./NotFor.module.css";

/* Banda ancha y oscura en los dos temas: la frase en la que hay que pararse. */
export function NotFor({ t }: { t: Translations["notFor"] }) {
  return (
    <section className={styles.band}>
      <div className={`wrap ${styles.inner}`}>
        <span className="kicker">{t.kicker}</span>
        <h2 className={styles.title}>{t.title}</h2>
        <p className={styles.body}>{t.body}</p>
      </div>
    </section>
  );
}
