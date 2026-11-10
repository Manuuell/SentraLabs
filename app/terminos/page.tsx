import type { Metadata } from "next";
import { LegalPage } from "../_site/Legal";

export const metadata: Metadata = {
    title: "Términos y Condiciones — SentraLabs",
    description: "Términos y condiciones de uso de SentraLabs",
    alternates: { canonical: "/terminos" },
    openGraph: {
        title: "Términos y Condiciones — SentraLabs",
        description: "Términos y condiciones de uso de SentraLabs",
        url: "/terminos",
        type: "website",
        // Al declarar openGraph aquí no se hereda la imagen del layout: se pide
        // explícitamente la tarjeta generada en app/opengraph-image.tsx.
        images: ["/opengraph-image"],
    },
    twitter: {
        card: "summary_large_image",
        title: "Términos y Condiciones — SentraLabs",
        description: "Términos y condiciones de uso de SentraLabs",
        images: ["/opengraph-image"],
    },
};

export default function Terminos() {
    return (
        <LegalPage title="Términos y Condiciones" updated="febrero de 2025">
            <section>
                <h2>1. Aceptación</h2>
                <p>Al acceder y utilizar el sitio web de SentraLabs (sentralabs.co), aceptas estos términos y condiciones en su totalidad. Si no estás de acuerdo, te pedimos no utilizar nuestro sitio.</p>
            </section>
            <section>
                <h2>2. Servicios</h2>
                <p>SentraLabs ofrece servicios de desarrollo de software, aplicaciones móviles, plataformas web e integración de inteligencia artificial. Los detalles específicos de cada proyecto se acuerdan por separado con cada cliente.</p>
            </section>
            <section>
                <h2>3. Propiedad intelectual</h2>
                <p>Todo el contenido del sitio web (código, diseño, textos, imágenes) es propiedad de SentraLabs, salvo que se indique lo contrario. La propiedad del código desarrollado para clientes se define en cada contrato individual.</p>
            </section>
            <section>
                <h2>4. Limitación de responsabilidad</h2>
                <p>SentraLabs no se responsabiliza por daños directos o indirectos derivados del uso de este sitio web. Los proyectos entregados a clientes están sujetos a las garantías específicas de cada contrato.</p>
            </section>
            <section>
                <h2>5. Modificaciones</h2>
                <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos desde su publicación en este sitio.</p>
            </section>
            <section>
                <h2>6. Ley aplicable</h2>
                <p>Estos términos se rigen por las leyes de la República de Colombia. Cualquier controversia será resuelta por los tribunales competentes de Cartagena de Indias.</p>
            </section>
            <section>
                <h2>7. Contacto</h2>
                <p>
                    Para preguntas sobre estos términos, escríbenos a{" "}
                    <a href="mailto:atencionsentralabs@gmail.com">atencionsentralabs@gmail.com</a>.
                </p>
            </section>
        </LegalPage>
    );
}
