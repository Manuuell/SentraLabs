import type { Metadata } from "next";
import { HomeContent } from "../HomeContent";
import { HtmlLang } from "../lib/HtmlLang";
import { SITE_DESCRIPTION_EN, SITE_TITLE_EN } from "../lib/site";

const languages = {
  es: "/",
  en: "/en",
  "x-default": "/",
};

export const metadata: Metadata = {
  title: SITE_TITLE_EN,
  description: SITE_DESCRIPTION_EN,
  alternates: { canonical: "/en", languages },
  openGraph: {
    title: SITE_TITLE_EN,
    description: SITE_DESCRIPTION_EN,
    url: "/en",
    type: "website",
    locale: "en_US",
    alternateLocale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE_EN,
    description: SITE_DESCRIPTION_EN,
  },
};

export default function EnglishHome() {
  return (
    <>
      <HtmlLang lang="en" />
      <HomeContent lang="en" />
    </>
  );
}
