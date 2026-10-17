import type { Metadata } from "next";
import { HomeContent } from "./HomeContent";
import { SITE_DESCRIPTION, SITE_TITLE } from "./lib/site";

/* hreflang: le dice al buscador que "/" y "/en" son la misma página en dos
   idiomas, y que el español es la versión por defecto. */
const languages = {
  es: "/",
  en: "/en",
  "x-default": "/",
};

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/", languages },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    type: "website",
    locale: "es_CO",
    alternateLocale: "en_US",
  },
};

export default function Home() {
  return <HomeContent lang="es" />;
}
