import type { Metadata } from "next";
import PoliticaTooli from "../../privacidad/politica-tooli";

/* Una URL de política por app (la que va en Google Play de cada una). Todas
   muestran la misma política de Tooli, que nombra las siete, con el nombre
   de esa app arriba. Los nombres son los de Play (3-textos de cada app). */
const APPS: Record<string, string> = {
    unisinu: "Unisinú Tooli",
    comfenalco: "Comfenalco Tooli",
    unicartagena: "UdeC Tooli",
    unitecnar: "Unitecnar Tooli",
    uninunez: "Uninúñez Tooli",
    sanbuenaventura: "San Buenaventura Tooli",
    umayor: "Umayor Tooli",
};

export const dynamicParams = false;

export function generateStaticParams() {
    return Object.keys(APPS).map((app) => ({ app }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ app: string }>;
}): Promise<Metadata> {
    const { app } = await params;
    const title = `Política de Privacidad — ${APPS[app]}`;
    return {
        title,
        description: `Cómo trata tus datos ${APPS[app]}, app para estudiantes hecha por SentraLabs.`,
        alternates: { canonical: `/tooli/${app}/privacidad` },
    };
}

export default async function PrivacidadApp({
    params,
}: {
    params: Promise<{ app: string }>;
}) {
    const { app } = await params;
    return <PoliticaTooli app={APPS[app]} />;
}
