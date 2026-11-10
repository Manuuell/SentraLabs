import type { Lang, Translations } from "../i18n/dictionaries";
import { JsonLd } from "../lib/JsonLd";
import { SITE_URL } from "../lib/site";
import styles from "./Faq.module.css";

/* <details> nativo: abre y cierra sin JavaScript y es accesible de serie. */
export function Faq({ lang, t }: { lang: Lang; t: Translations["faq"] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": lang === "en" ? `${SITE_URL}/en#faq` : `${SITE_URL}/#faq`,
    inLanguage: lang,
    mainEntity: t.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className={styles.faq} id="preguntas">
      <JsonLd data={schema} />
      <div className={`wrap ${styles.inner}`}>
        <div>
          <span className="kicker">{t.kicker}</span>
          <h2 className={`h2 ${styles.title}`}>{t.title}</h2>
        </div>
        <div className={styles.list}>
          {t.items.map((item) => (
            <details key={item.q} className={styles.item}>
              <summary>
                {item.q}
                <span className={styles.plus} aria-hidden="true" />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
