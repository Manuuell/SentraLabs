import type { Translations } from "../i18n/dictionaries";
import styles from "./CtaStrip.module.css";

/* Franja delgada de color de marca: puntuacion entre dos bloques grandes. */
export function CtaStrip({ t }: { t: Translations["strip"] }) {
  return (
    <aside className={styles.strip}>
      <div className={`wrap ${styles.inner}`}>
        <p className={styles.title}>{t.title}</p>
        <a href="#contacto" className={styles.btn}>
          {t.cta} <span aria-hidden="true">→</span>
        </a>
      </div>
    </aside>
  );
}
