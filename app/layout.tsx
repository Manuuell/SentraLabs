import type { Metadata } from "next";
import { Figtree, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { JsonLd } from "./lib/JsonLd";
import { AnalyticsNoScript, AnalyticsScript } from "./lib/Analytics";
import {
  CONTACT_EMAIL,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  absoluteUrl,
} from "./lib/site";

/* Misma tipografia que SIMBIA (simbia.sentralabs.co): Figtree 800 muy
   apretada para titulos e Inter para texto. JetBrains Mono queda solo para lo
   que de verdad es codigo (la terminal y las pantallas del hero en modo codigo).
   Las fuentes se descargan en el build y se sirven desde el propio dominio. */
const title = Figtree({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-title",
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Base para resolver las URLs relativas de canonical y openGraph.
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "desarrollo de software en Cartagena",
    "software a medida",
    "desarrollo de apps móviles Flutter",
    "desarrollo web Next.js",
    "estudio de software Colombia",
    "SentraLabs",
  ],
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "es_CO",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  // Códigos de propiedad de Search Console y Bing. Se rellenan con variables
  // de entorno en el build; sin ellas no se emite ninguna etiqueta.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : {},
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
    <html lang="es" className={`${title.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <AnalyticsNoScript />
        <AnalyticsScript />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
        {children}
      </body>
    </html>
  );
}
