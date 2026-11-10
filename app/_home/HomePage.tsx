import ChatWidget from "../components/ChatWidget";
import { I18nProvider } from "../i18n/context";
import { translations, type Lang } from "../i18n/dictionaries";
import { Compare } from "./Compare";
import { Contact } from "./Contact";
import { CtaStrip } from "./CtaStrip";
import { Faq } from "./Faq";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { HowWeWork } from "./HowWeWork";
import { Navbar } from "./Navbar";
import { NotFor } from "./NotFor";
import { ScrollProgress } from "./ScrollProgress";
import { Services } from "./Services";
import { Showcase } from "./Showcase";
import { Team } from "./Team";
import { TerminalEasterEgg } from "./TerminalEasterEgg";
import { WhyUs } from "./WhyUs";

/**
 * Home compartida por "/" y "/en". Es un Server Component: solo llevan
 * JavaScript al navegador las piezas interactivas (navbar, escena 3D,
 * escaparate, chat, terminal y barra de progreso).
 *
 * Orden pensado como ritmo: oscuro, franja, levantado, color, papel, oscuro,
 * levantado, partido, negro, papel, oscuro, levantado y footer.
 */
export function HomePage({ lang }: { lang: Lang }) {
  const t = translations[lang];
  return (
    <I18nProvider lang={lang}>
      <div className="page-content">
        <ScrollProgress />
        <TerminalEasterEgg />
        <Navbar lang={lang} t={t.nav} />
        <main>
          <Hero t={t.hero} />
          <Showcase lang={lang} t={t.showcase} />
          <CtaStrip t={t.strip} />
          <HowWeWork t={t.how} />
          <Services t={t.services} />
          <WhyUs t={t.why} />
          <Team t={t.team} />
          <NotFor t={t.notFor} />
          <Compare t={t.compare} />
          <Faq lang={lang} t={t.faq} />
          <Contact t={t.contact} />
        </main>
        <Footer t={t.footer} nav={t.nav} />

        <ChatWidget />
        <a
          href="https://wa.me/573215640735"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label={lang === "es" ? "Chat en WhatsApp" : "Chat on WhatsApp"}
        >
          <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff" aria-hidden="true">
            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.502 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958a15.907 15.907 0 008.832 2.666C24.826 31.998 32 24.822 32 16.004 32 7.176 24.826 0 16.004 0zm9.318 22.614c-.396 1.114-1.956 2.038-3.21 2.308-.856.182-1.974.328-5.738-1.234-4.818-1.998-7.92-6.882-8.162-7.202-.232-.32-1.95-2.6-1.95-4.96s1.234-3.52 1.672-4.002c.438-.482.954-.602 1.272-.602.318 0 .636.004.914.016.294.014.688-.112 1.078.822.396.954 1.352 3.312 1.47 3.554.118.242.198.524.04.844-.158.32-.238.52-.478.802-.24.282-.504.63-.72.844-.238.24-.488.498-.21.976.278.478 1.234 2.036 2.65 3.298 1.82 1.622 3.354 2.124 3.832 2.362.478.238.756.198 1.034-.118.278-.318 1.194-1.392 1.512-1.872.318-.478.636-.398 1.074-.238.438.158 2.794 1.318 3.272 1.558.478.238.796.358.914.558.118.198.118 1.154-.278 2.27z" />
          </svg>
        </a>
      </div>
    </I18nProvider>
  );
}
