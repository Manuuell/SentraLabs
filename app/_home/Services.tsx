import type { Translations } from "../i18n/dictionaries";
import styles from "./Services.module.css";

/* Lista de filas con bordes finos: los servicios no son opciones para
   comparar, asi que no van en tarjetas. */
export function Services({ t }: { t: Translations["services"] }) {
  return (
    <section className={styles.services} id="servicios">
      <div className="wrap">
        <span className="kicker">{t.kicker}</span>
        <h2 className={`h2 ${styles.title}`}>{t.title}</h2>
        <ol className={styles.rows}>
          {t.items.map((s, i) => (
            <li key={s.title} className={styles.row}>
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
              <ul className={styles.tags}>
                {s.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
