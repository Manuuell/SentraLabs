import type { Metadata } from "next";
import PrivacidadTooli from "../../privacidad/page";

/* Una URL de política por app (la que va en Google Play de cada una). Todas
   muestran la misma política de Tooli: cubre las siete apps. */
const APPS: Record<string, string> = {
    unisinu: "Unisinú Tooli",
    comfenalco: "Comfenalco Tooli",
    unicartagena: "UdeC Tooli",
    unitecnar: "Unitecnar Tooli",
    uninunez: "Uninúñez Tooli",
    sanbuenaventura: "San Buenaventura Tooli",
    umayor: "Unimayor Tooli",
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

export default PrivacidadTooli;
