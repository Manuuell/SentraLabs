import Link from "next/link";

export const metadata = {
    title: "Política de Privacidad — SentraLabs",
    description: "Política de privacidad de SentraLabs",
};

export default function Privacidad() {
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
                <Link
                    href="/"
                    style={{
                        color: "#71717a",
                        textDecoration: "none",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.85rem",
                        marginBottom: "2rem",
                        display: "inline-block",
                    }}
                >
                    ← Volver al inicio
                </Link>

                <p style={{ color: "#60a5fa", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.15em", marginBottom: "12px" }}>
          // legal
                </p>
                <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "2rem", fontWeight: 700, marginBottom: "2rem", color: "#fff" }}>
                    Política de Privacidad
                </h1>

                <div style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: 1.8 }}>
                    <p style={{ marginBottom: "1.5rem" }}>
                        <strong style={{ color: "#fff" }}>Última actualización:</strong> Febrero 2025
                    </p>

                    <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>1. Información que recopilamos</h2>
                    <p style={{ marginBottom: "1rem" }}>
                        En SentraLabs recopilamos información mínima necesaria para proporcionar nuestros servicios: nombre, correo electrónico y datos de contacto proporcionados voluntariamente a través de nuestros formularios o comunicación directa.
                    </p>

                    <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>2. Uso de la información</h2>
                    <p style={{ marginBottom: "1rem" }}>
                        Utilizamos la información recopilada para: responder consultas, brindar cotizaciones, mejorar nuestros servicios y comunicarnos sobre proyectos. No vendemos ni compartimos datos personales con terceros sin consentimiento.
                    </p>

                    <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>3. Cookies y tecnologías similares</h2>
                    <p style={{ marginBottom: "1rem" }}>
                        Este sitio puede utilizar cookies técnicas necesarias para su funcionamiento. No utilizamos cookies de rastreo publicitario.
                    </p>

                    <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>4. Seguridad</h2>
                    <p style={{ marginBottom: "1rem" }}>
                        Implementamos medidas de seguridad razonables para proteger la información personal. Sin embargo, ninguna transmisión por Internet es 100% segura.
                    </p>

                    <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>5. Derechos del usuario</h2>
                    <p style={{ marginBottom: "1rem" }}>
                        Puedes solicitar acceso, rectificación o eliminación de tus datos personales contactándonos en atencionsentralabs@gmail.com.
                    </p>

                    <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>6. Contacto</h2>
                    <p>
                        Para dudas sobre esta política, escríbenos a{" "}
                        <a href="mailto:atencionsentralabs@gmail.com" style={{ color: "#60a5fa" }}>
                            atencionsentralabs@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
