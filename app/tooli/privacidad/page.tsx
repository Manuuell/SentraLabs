import type { Metadata } from "next";
import Link from "next/link";

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

const h2 = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "1.1rem",
    color: "#fff",
    margin: "2rem 0 1rem",
} as const;
const p = { marginBottom: "1rem" } as const;
const ul = { paddingLeft: "1.2rem", marginBottom: "1rem" } as const;
const li = { marginBottom: "0.5rem" } as const;
const fuerte = { color: "#fff" } as const;

export default function PrivacidadTooli() {
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
                    href="/tooli"
                    style={{
                        color: "#71717a",
                        textDecoration: "none",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.85rem",
                        marginBottom: "2rem",
                        display: "inline-block",
                    }}
                >
                    ← Tooli
                </Link>

                <p style={{ color: "#60a5fa", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.15em", marginBottom: "12px" }}>
                    {"// tooli · legal"}
                </p>
                <h1 style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "2rem", fontWeight: 700, marginBottom: "2rem", color: "#fff" }}>
                    Política de Privacidad de Tooli
                </h1>

                <div style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: 1.8 }}>
                    <p style={{ marginBottom: "1.5rem" }}>
                        <strong style={fuerte}>Última actualización:</strong> 17 de octubre de 2026
                    </p>

                    <p style={p}>
                        Tooli es una app para estudiantes universitarios hecha por SentraLabs
                        («nosotros»). Esta política aplica a todas las apps de Tooli, una por
                        universidad (por ejemplo, «Tooli Unisinú» para la Universidad del Sinú,
                        seccional Cartagena). La idea es simple: <strong style={fuerte}>tus datos
                        se quedan en tu teléfono</strong>. Tooli no tiene servidores propios que
                        reciban tu información, no tiene cuentas de Tooli y no vende ni comparte
                        tus datos.
                    </p>

                    <h2 style={h2}>1. Lo que guarda Tooli en tu teléfono</h2>
                    <ul style={ul}>
                        <li style={li}>
                            <strong style={fuerte}>Lo que anotas:</strong> materias, horario, notas,
                            entregas, asistencia, gastos, apuntes, metas, pendientes y tus
                            preferencias de la app.
                        </li>
                        <li style={li}>
                            <strong style={fuerte}>Tu sesión del aula virtual:</strong> si entras
                            con tu usuario de la universidad, Tooli guarda el permiso de acceso
                            (token) que da el aula virtual, cifrado con el almacén seguro del
                            teléfono. También guarda tu usuario si marcas «Recordarme».
                        </li>
                        <li style={li}>
                            <strong style={fuerte}>Tu clave, solo si lo autorizas:</strong> si
                            marcas «Entrar también a Elysa» (el portal académico, que usa la
                            misma cuenta), Tooli guarda tu usuario y tu clave cifrados en el
                            teléfono para entrar por ti y traer tus notas oficiales y tu horario.
                            Si no lo marcas, tu clave nunca se guarda.
                        </li>
                        <li style={li}>
                            <strong style={fuerte}>Lo que trae de la universidad:</strong> tus
                            cursos, tareas, calificaciones, mensajes y archivos del aula virtual, y
                            las noticias y calendarios públicos de la sede, para que puedas verlos
                            sin conexión.
                        </li>
                        <li style={li}>
                            <strong style={fuerte}>Tu foto de perfil</strong>, si eliges una.
                        </li>
                    </ul>

                    <h2 style={h2}>2. Con quién se comunica Tooli</h2>
                    <p style={p}>
                        Tooli se conecta directamente, desde tu teléfono, solo con los sistemas de
                        tu universidad y con fuentes públicas:
                    </p>
                    <ul style={ul}>
                        <li style={li}>El aula virtual (Moodle) y el portal académico (Elysa) de la universidad, con tu cuenta.</li>
                        <li style={li}>La página web pública de la universidad (noticias, calendarios, trámites).</li>
                        <li style={li}>Hojas de cálculo públicas de Google en las que la universidad publica los calendarios de parciales.</li>
                        <li style={li}>YouTube, cuando abres un video que el docente puso en el aula.</li>
                    </ul>
                    <p style={p}>
                        Lo que intercambias con esos sistemas se rige también por sus propias
                        políticas. SentraLabs no recibe una copia de nada de eso.
                    </p>

                    <h2 style={h2}>3. Permisos del teléfono</h2>
                    <ul style={ul}>
                        <li style={li}><strong style={fuerte}>Notificaciones y alarmas exactas:</strong> para avisarte de clases, entregas y cierres de corte a la hora justa. Se programan en el teléfono.</li>
                        <li style={li}><strong style={fuerte}>Cámara:</strong> solo cuando escaneas un código QR (por ejemplo, de asistencia). La imagen se procesa en el teléfono y no se guarda.</li>
                        <li style={li}><strong style={fuerte}>Fotos y archivos:</strong> solo lo que tú eliges (tu foto de perfil o del carné, o una copia de seguridad para restaurar).</li>
                        <li style={li}><strong style={fuerte}>Internet:</strong> para hablar con los sistemas de la sección 2.</li>
                    </ul>

                    <h2 style={h2}>4. Copias de seguridad</h2>
                    <p style={p}>
                        «Exportar copia» crea un archivo con lo que anotaste (nunca tu sesión ni
                        tu clave) y lo guardas o envías donde tú elijas. Tooli no sube copias a
                        ningún lado por su cuenta.
                    </p>

                    <h2 style={h2}>5. Publicidad y analítica</h2>
                    <p style={p}>
                        Hoy Tooli no muestra anuncios ni usa herramientas de analítica o
                        rastreo. Si algún día incluye anuncios, esta política se actualizará antes,
                        dirá qué proveedor se usa y qué datos recibe, y la app te lo pedirá cuando
                        la ley lo exija.
                    </p>

                    <h2 style={h2}>6. Cómo borrar tus datos</h2>
                    <ul style={ul}>
                        <li style={li}><strong style={fuerte}>Cerrar sesión de Moodle</strong> (Perfil) borra del teléfono tu sesión, la clave de Elysa si la guardaste y lo descargado del aula.</li>
                        <li style={li}><strong style={fuerte}>Desinstalar Tooli</strong> borra todo lo que la app guardó en el teléfono.</li>
                    </ul>
                    <p style={p}>
                        Como SentraLabs no guarda tus datos, no hay nada que borrar de nuestro lado;
                        aun así puedes escribirnos si tienes dudas.
                    </p>

                    <h2 style={h2}>7. Seguridad</h2>
                    <p style={p}>
                        La sesión y la clave se guardan cifradas con el almacén seguro de Android
                        (Keystore) y la conexión con la universidad va cifrada (HTTPS). Ningún
                        sistema es infalible: si pierdes el teléfono, cambia tu clave de la
                        universidad.
                    </p>

                    <h2 style={h2}>8. Menores de edad</h2>
                    <p style={p}>
                        Tooli está pensada para estudiantes universitarios. No está dirigida a
                        menores de 13 años.
                    </p>

                    <h2 style={h2}>9. Tus derechos</h2>
                    <p style={p}>
                        Conforme a la Ley 1581 de 2012 de Colombia (protección de datos
                        personales) puedes conocer, actualizar, rectificar y suprimir tus datos.
                        Como todo vive en tu teléfono, lo haces desde la app; para cualquier
                        consulta, escríbenos.
                    </p>

                    <h2 style={h2}>10. Cambios</h2>
                    <p style={p}>
                        Si esta política cambia, actualizaremos la fecha de arriba y, si el cambio
                        es importante, te lo diremos en la app.
                    </p>

                    <h2 style={h2}>11. Contacto</h2>
                    <p>
                        SentraLabs, Cartagena, Colombia ·{" "}
                        <a href="mailto:atencionsentralabs@gmail.com" style={{ color: "#60a5fa" }}>
                            atencionsentralabs@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
