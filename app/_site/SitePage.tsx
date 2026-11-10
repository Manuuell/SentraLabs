import type { ReactNode } from "react";
import { Footer } from "../_home/Footer";
import { Navbar } from "../_home/Navbar";
import { translations } from "../i18n/dictionaries";

/**
 * Armazon de las paginas fuera de la home (legales y perfiles del equipo):
 * la misma barra flotante y el mismo footer, con las anclas apuntando a "/".
 * Estas paginas existen solo en español, asi que no muestran el cambio de idioma.
 */
export function SitePage({ children }: { children: ReactNode }) {
  const t = translations.es;
  return (
    <div className="page-content">
      <Navbar lang="es" t={t.nav} base="/" showLang={false} />
      <main>{children}</main>
      <Footer t={t.footer} nav={t.nav} base="/" />
    </div>
  );
}
