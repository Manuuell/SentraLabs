import type { Metadata } from "next";
import PoliticaTooli from "./politica-tooli";

const title = "Política de Privacidad — Tooli";
const description =
    "Cómo trata tus datos Tooli, la app para estudiantes hecha por SentraLabs.";

/* También se sirve en tooli.sentralabs.co/privacidad (la URL que va en Google
   Play); el canonical la une a sentralabs.co/tooli/privacidad. */
export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/tooli/privacidad" },
    openGraph: {
        title,
        description,
        url: "/tooli/privacidad",
        type: "website",
        locale: "es_CO",
        images: ["/opengraph-image"],
    },
    twitter: {
        card: "summary_large_image",
        title,
        description,
        images: ["/opengraph-image"],
    },
};

export default function PrivacidadTooli() {
    return <PoliticaTooli />;
}
