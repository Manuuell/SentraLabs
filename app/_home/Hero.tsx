import type { Translations } from "../i18n/dictionaries";
import { HeroStage } from "./HeroStage";
import styles from "./Hero.module.css";

/**
 * El texto se renderiza en el servidor y es lo primero que pinta (es el LCP).
 * La escena 3D llega despues, sin bloquear nada, dentro de HeroStage.
 */
export function Hero({ t }: { t: Translations["hero"] }) {
  return (
    <section className={styles.hero} id="inicio">
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            {t.titleA} <span className="mark">{t.titleMark}</span> {t.titleB} {t.titleEnd}
          </h1>
          <p className="lead">{t.sub}</p>
          <div className={styles.ctas}>
            <a href="#contacto" className="btn btn--primary">
              {t.cta1} <span className="arrow" aria-hidden="true">→</span>
            </a>
            <a href="#proyectos" className="btn btn--ghost">
              {t.cta2}
            </a>
          </div>
        </div>
        <HeroStage t={t} />
      </div>
    </section>
  );
}
