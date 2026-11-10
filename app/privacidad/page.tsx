import type { Metadata } from "next";
import { LegalPage } from "../_site/Legal";

export const metadata: Metadata = {
    title: "Política de Privacidad — SentraLabs",
    description: "Política de privacidad de SentraLabs",
    alternates: { canonical: "/privacidad" },
    openGraph: {
        title: "Política de Privacidad — SentraLabs",
        description: "Política de privacidad de SentraLabs",
        url: "/privacidad",
        type: "website",
        // Al declarar openGraph aquí no se hereda la imagen del layout: se pide
        // explícitamente la tarjeta generada en app/opengraph-image.tsx.
        images: ["/opengraph-image"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Política de Privacidad — SentraLabs",
        description: "Política de privacidad de SentraLabs",
        images: ["/opengraph-image"],
    },
};

export default function Privacidad() {
    return (
        <LegalPage title="Política de Privacidad" updated="noviembre de 2026">
            <section>
                <h2>1. Información que recopilamos</h2>
                <p>
                    Recopilamos la información mínima necesaria para prestar nuestros servicios: nombre, correo
                    electrónico y datos de contacto que nos compartes voluntariamente por correo, WhatsApp o el
                    asistente virtual del sitio.
                </p>
            </section>
            <section>
                <h2>2. Uso de la información</h2>
                <p>
                    Usamos esa información para responder consultas, enviar cotizaciones, mejorar nuestros servicios y
                    comunicarnos sobre proyectos. No vendemos ni compartimos datos personales con terceros sin tu
                    consentimiento.
                </p>
            </section>
            <section>
                <h2>3. Asistente virtual con IA</h2>
                <p>
                    Los mensajes que escribes en el asistente del sitio se envían a la API de OpenAI para generar las
                    respuestas. No guardamos el historial de la conversación: se borra al cerrar o recargar la página.
                    Para evitar abusos, usamos tu dirección IP de forma temporal para limitar la cantidad de mensajes.
                    Te pedimos no escribir datos sensibles en el chat.
                </p>
            </section>
            <section>
                <h2>4. Cookies y almacenamiento local</h2>
                <p>
                    El sitio guarda en tu navegador solo preferencias técnicas, como el tema claro u oscuro. Si
                    activamos analítica (Google Analytics), se usa para medir visitas de forma agregada. No usamos
                    cookies de publicidad.
                </p>
            </section>
            <section>
                <h2>5. Seguridad</h2>
                <p>
                    Aplicamos medidas de seguridad razonables para proteger la información personal. Aun así, ninguna
                    transmisión por Internet es 100 % segura.
                </p>
            </section>
            <section>
                <h2>6. Derechos del usuario</h2>
                <p>
                    Puedes pedir acceso, corrección o eliminación de tus datos personales escribiéndonos a{" "}
                    <a href="mailto:atencionsentralabs@gmail.com">atencionsentralabs@gmail.com</a>.
                </p>
            </section>
            <section>
                <h2>7. Contacto</h2>
                <p>
                    Para dudas sobre esta política, escríbenos a{" "}
                    <a href="mailto:atencionsentralabs@gmail.com">atencionsentralabs@gmail.com</a>.
                </p>
            </section>
        </LegalPage>
    );
}
