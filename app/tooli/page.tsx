import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "../lib/site";

const title = "Tooli — tu semestre en el bolsillo";
const description =
    "Tooli, la app para estudiantes hecha por SentraLabs: clases, tareas, notas y el aula virtual de tu universidad en un solo lugar.";

/* La página también se sirve en tooli.sentralabs.co: el canonical la une a
   sentralabs.co/tooli para que no cuente como contenido duplicado. */
export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/tooli" },
    openGraph: {
        title,
        description,
        url: "/tooli",
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

const mono = "'JetBrains Mono', monospace";

export default function Tooli() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#000",
                color: "#e4e4e7",
                padding: "120px 24px 80px",
                fontFamily: "'Inter', system-ui, sans-serif",
            }}
        >
            <div style={{ maxWidth: 720, margin: "0 auto" }}>
                <p style={{ color: "#60a5fa", fontFamily: mono, fontSize: "0.75rem", letterSpacing: "0.15em", marginBottom: "12px" }}>
                    {"// sentralabs · producto"}
                </p>
                <h1 style={{ fontFamily: mono, fontSize: "2.4rem", fontWeight: 700, marginBottom: "1rem", color: "#fff" }}>
                    Tooli
                </h1>
                <p style={{ color: "#a1a1aa", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "2rem" }}>
                    Tu semestre en el bolsillo: tus clases con su salón, tus tareas con
                    cuenta atrás, tus notas por corte y todo el aula virtual de tu
                    universidad, en una sola app. Tus datos se quedan en tu teléfono.
                </p>

                <h2 style={{ fontFamily: mono, fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>
                    Universidades
                </h2>
                <ul style={{ color: "#a1a1aa", lineHeight: 1.8, paddingLeft: "1.2rem" }}>
                    <li>Universidad del Sinú, seccional Cartagena — Tooli Unisinú (prueba cerrada)</li>
                    <li>Fundación Universitaria Tecnológico Comfenalco, Cartagena — Tooli Comfenalco (en desarrollo)</li>
                </ul>
                <p style={{ color: "#71717a", fontSize: "0.9rem", lineHeight: 1.7, marginTop: "1rem" }}>
                    Tooli es un proyecto independiente de SentraLabs: no es una app oficial de
                    ninguna universidad. Está en prueba cerrada con estudiantes y personal de
                    cada institución antes de abrirla a todos.
                </p>

                <h2 style={{ fontFamily: mono, fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>
                    Ayuda
                </h2>
                <p style={{ color: "#a1a1aa", lineHeight: 1.8 }}>
                    Escríbenos a{" "}
                    <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: "#60a5fa" }}>
                        {CONTACT_EMAIL}
                    </a>
                    . Lee nuestra{" "}
                    <Link href="/tooli/privacidad" style={{ color: "#60a5fa" }}>
                        política de privacidad
                    </Link>
                    .
                </p>
            </div>
        </div>
    );
}
