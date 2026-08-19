import type { Metadata } from "next";
import "./globals.css";
import { JsonLd } from "./lib/JsonLd";
import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  absoluteUrl,
} from "./lib/site";

export const metadata: Metadata = {
  // Base para resolver las URLs relativas de canonical y openGraph.
  metadataBase: new URL(SITE_URL),
  title: "SentraLabs — Creamos el software que tu idea necesita",
  description: SITE_DESCRIPTION,
  keywords: ["software", "desarrollo", "SentraLabs", "startup", "web", "app"],
  alternates: { canonical: "/" },
  openGraph: {
    title: "SentraLabs — Creamos el software que tu idea necesita",
    description: SITE_DESCRIPTION,
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: "SentraLabs — Creamos el software que tu idea necesita",
    description: SITE_DESCRIPTION,
  },
};

/* Quien somos, para buscadores y asistentes. Va en el layout: aplica a todo. */
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/logo-dark.png"),
  description: SITE_DESCRIPTION,
  slogan: SITE_TAGLINE,
  email: CONTACT_EMAIL,
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cartagena",
    addressCountry: "CO",
  },
  sameAs: ["https://github.com/Manuuell"],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  inLanguage: "es",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        {children}
      </body>
    </html>
  );
}
