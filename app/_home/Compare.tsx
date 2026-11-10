import type { Translations } from "../i18n/dictionaries";
import styles from "./Compare.module.css";

/* Las unicas tarjetas de la pagina: aqui si son opciones para comparar. */
export function Compare({ t }: { t: Translations["compare"] }) {
  return (
    <section className={`invert ${styles.compare}`}>
      <div className="wrap">
        <span className="kicker">{t.kicker}</span>
        <h2 className={`h2 ${styles.title}`}>{t.title}</h2>
        <div className={styles.grid}>
          {t.columns.map((col) => (
            <article key={col.name} className={col.featured ? `${styles.card} ${styles.featured}` : styles.card}>
              <h3>{col.name}</h3>
              <ul>
                {col.pros.map((p) => (
                  <li key={p} className={styles.pro}>
                    <span aria-hidden="true">✓</span> {p}
                  </li>
                ))}
                {col.cons.map((c) => (
                  <li key={c} className={styles.con}>
                    <span aria-hidden="true">✕</span> {c}
                  </li>
                ))}
              </ul>
              {col.featured && (
                <a href="#contacto" className={`btn ${styles.cta}`}>
                  {t.cta} <span className="arrow" aria-hidden="true">→</span>
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
