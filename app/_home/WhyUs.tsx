import type { Translations } from "../i18n/dictionaries";
import styles from "./WhyUs.module.css";

/* Riel: el titulo se queda fijo a la izquierda mientras pasan los motivos. */
export function WhyUs({ t }: { t: Translations["why"] }) {
  return (
    <section className={styles.why}>
      <div className={`wrap ${styles.rail}`}>
        <div className={styles.aside}>
          <span className="kicker">{t.kicker}</span>
          <h2 className={`h2 ${styles.title}`}>{t.title}</h2>
        </div>
        <ol className={styles.list}>
          {t.items.map((item, i) => (
            <li key={item.title}>
              <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
