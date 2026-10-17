import Link from "next/link";

export const metadata = {
    title: "Tooli — tu semestre en el bolsillo",
    description:
        "Tooli, la app para estudiantes hecha por SentraLabs: clases, tareas, notas y el aula virtual de tu universidad en un solo lugar.",
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
                    <li>Universidad del Sinú, seccional Cartagena — Tooli Unisinú</li>
                </ul>

                <h2 style={{ fontFamily: mono, fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>
                    Ayuda
                </h2>
                <p style={{ color: "#a1a1aa", lineHeight: 1.8 }}>
                    Escríbenos a{" "}
                    <a href="mailto:atencionsentralabs@gmail.com" style={{ color: "#60a5fa" }}>
                        atencionsentralabs@gmail.com
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
