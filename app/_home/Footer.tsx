import Link from "next/link";
import type { Translations } from "../i18n/dictionaries";
import styles from "./Footer.module.css";

/* Footer con la marca gigante (el BSMNT.26 de basement). */
export function Footer({
  t,
  nav,
  base = "",
}: {
  t: Translations["footer"];
  nav: Translations["nav"];
  /** Prefijo de las anclas: "" en la home, "/" en las demas paginas. */
  base?: string;
}) {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={`wrap ${styles.cols}`}>
        <div>
          <h2 className={styles.colTitle}>{t.site}</h2>
          <ul>
            <li><a href={`${base}#proyectos`}>{nav.projects}</a></li>
            <li><a href={`${base}#como-trabajamos`}>{nav.how}</a></li>
            <li><a href={`${base}#equipo`}>{nav.team}</a></li>
            <li><a href={`${base}#preguntas`}>{nav.faq}</a></li>
          </ul>
        </div>
        <div>
          <h2 className={styles.colTitle}>{t.contact}</h2>
          <ul>
            <li><a href="https://wa.me/573215640735" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a href="mailto:atencionsentralabs@gmail.com">Email</a></li>
            <li><a href="https://github.com/Manuuell" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
        <div>
          <h2 className={styles.colTitle}>{t.legal}</h2>
          <ul>
            <li><Link href="/privacidad">{t.privacy}</Link></li>
            <li><Link href="/terminos">{t.terms}</Link></li>
          </ul>
        </div>
      </div>

      <p className={styles.wordmark} aria-hidden="true">
        SENTRALABS
      </p>

      <div className={`wrap ${styles.bottom}`}>
        <span>
          © {year} SentraLabs. {t.rights}
        </span>
        <span>{t.location}</span>
        <span className={styles.terminal}>{t.terminal}</span>
      </div>
    </footer>
  );
}
