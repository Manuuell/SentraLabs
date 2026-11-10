import type { Translations } from "../i18n/dictionaries";
import styles from "./Contact.module.css";

/* Cierre. El calendario embebido (Cal.com) entra aqui cuando exista la
   cuenta; por ahora, WhatsApp y correo como filas grandes. */
const WHATSAPP = "https://wa.me/573215640735";
const EMAIL = "atencionsentralabs@gmail.com";

export function Contact({ t }: { t: Translations["contact"] }) {
  return (
    <section className={styles.contact} id="contacto">
      <div className={`wrap ${styles.inner}`}>
        <div>
          <span className="kicker">{t.kicker}</span>
          <h2 className={styles.title}>
            {t.titleA} {t.titleMid} {t.titleB}
          </h2>
          <p className="lead">{t.desc}</p>
        </div>
        <div className={styles.rows}>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={styles.row}>
            <span className={styles.label}>{t.whatsapp}</span>
            <span className={styles.value}>+57 321 564 0735</span>
            <span className={styles.arrow} aria-hidden="true">↗</span>
          </a>
          <a href={`mailto:${EMAIL}`} className={styles.row}>
            <span className={styles.label}>{t.email}</span>
            <span className={styles.value}>{EMAIL}</span>
            <span className={styles.arrow} aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
