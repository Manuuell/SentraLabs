import Link from "next/link";

export const metadata = {
    title: "Términos y Condiciones — SentraLabs",
    description: "Términos y condiciones de uso de SentraLabs",
};

export default function Terminos() {
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
                    Términos y Condiciones
                </h1>

                <div style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: 1.8 }}>
                    <p style={{ marginBottom: "1.5rem" }}>
                        <strong style={{ color: "#fff" }}>Última actualización:</strong> Febrero 2025
                    </p>

                    <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>1. Aceptación</h2>
                    <p style={{ marginBottom: "1rem" }}>
                        Al acceder y utilizar el sitio web de SentraLabs (sentralabs.co), aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo, te pedimos no utilizar nuestro sitio.
                    </p>

                    <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>2. Servicios</h2>
                    <p style={{ marginBottom: "1rem" }}>
                        SentraLabs ofrece servicios de desarrollo de software, aplicaciones móviles, plataformas web e integración de inteligencia artificial. Los detalles específicos de cada proyecto se acuerdan por separado con cada cliente.
                    </p>

                    <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>3. Propiedad intelectual</h2>
                    <p style={{ marginBottom: "1rem" }}>
                        Todo el contenido del sitio web (código, diseño, textos, imágenes) es propiedad de SentraLabs, salvo que se indique lo contrario. La propiedad del código desarrollado para clientes se define en cada contrato individual.
                    </p>

                    <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>4. Limitación de responsabilidad</h2>
                    <p style={{ marginBottom: "1rem" }}>
                        SentraLabs no se responsabiliza por daños directos o indirectos derivados del uso de este sitio web. Los proyectos entregados a clientes están sujetos a las garantías específicas de cada contrato.
                    </p>

                    <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>5. Modificaciones</h2>
                    <p style={{ marginBottom: "1rem" }}>
                        Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos desde su publicación en este sitio.
                    </p>

                    <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>6. Ley aplicable</h2>
                    <p style={{ marginBottom: "1rem" }}>
                        Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia será resuelta por los tribunales competentes de Cartagena de Indias.
                    </p>

                    <h2 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "1.1rem", color: "#fff", margin: "2rem 0 1rem" }}>7. Contacto</h2>
                    <p>
                        Para preguntas sobre estos términos, escríbenos a{" "}
                        <a href="mailto:atencionsentralabs@gmail.com" style={{ color: "#60a5fa" }}>
                            atencionsentralabs@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
