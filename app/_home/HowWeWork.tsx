import type { Translations } from "../i18n/dictionaries";
import styles from "./HowWeWork.module.css";

/**
 * Los tres pasos de Designjoy, en banda invertida (papel), y debajo una cinta
 * con todo lo que hacemos. Reemplaza a la seccion de proceso anterior.
 */
export function HowWeWork({ t }: { t: Translations["how"] }) {
  return (
    <section className={`invert ${styles.how}`} id="como-trabajamos">
      <div className="wrap">
        <span className="kicker">{t.kicker}</span>
        <h2 className={`h2 ${styles.title}`}>{t.title}</h2>
        <ol className={styles.steps}>
          {t.steps.map((s) => (
            <li key={s.n}>
              <span className={styles.n}>{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
      <Marquee items={t.marquee} />
    </section>
  );
}

function Marquee({ items }: { items: string[] }) {
  // La lista va dos veces seguidas: al llegar a la mitad, el corrimiento
  // vuelve a cero sin salto. La copia se esconde de los lectores de pantalla.
  const row = (hidden: boolean) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={item} className={i % 2 ? styles.alt : undefined}>
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
