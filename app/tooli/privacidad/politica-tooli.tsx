import Link from "next/link";

/* La política de Tooli, una sola para las siete apps. La sirven
   /tooli/privacidad y /tooli/<app>/privacidad (la URL que va en Google Play
   de cada app); en esta última, «app» es el nombre de esa app en Play. */

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

export default function PoliticaTooli({ app }: { app?: string }) {
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
                    {app ? `Política de Privacidad de ${app}` : "Política de Privacidad de Tooli"}
                </h1>

                <div style={{ color: "#a1a1aa", fontSize: "0.9rem", lineHeight: 1.8 }}>
                    <p style={{ marginBottom: "1.5rem" }}>
                        <strong style={fuerte}>Última actualización:</strong> 28 de octubre de 2026
                    </p>

                    {app && (
                        <p style={p}>
                            Esta es la política de privacidad de <strong style={fuerte}>«{app}»</strong>,
                            publicada en Google Play por SentraLabs. Es la misma para todas las apps
                            de Tooli.
                        </p>
                    )}

                    <p style={p}>
                        Tooli es una app para estudiantes universitarios hecha por SentraLabs
                        («nosotros»). Esta política aplica a todas las apps de Tooli, una por
                        universidad: «Unisinú Tooli» (en el teléfono, «Unisinú App») para la
                        Universidad del Sinú (sedes de Cartagena y Montería); «Comfenalco Tooli»
                        («Comfenalco App») para la Fundación Universitaria Tecnológico Comfenalco
                        (Cartagena); «San Buenaventura Tooli» («USB App») para la Universidad de
                        San Buenaventura (sedes de Cartagena, Medellín, Cali y Bogotá); «UdeC
                        Tooli» («UdeC App») para la Universidad de Cartagena (programas
                        presenciales y a distancia); «Unitecnar Tooli» («Unitecnar App») para la
                        Fundación Universitaria Antonio de Arévalo, Unitecnar (presencial, y
                        virtual y a distancia); «Uninúñez Tooli» («Uninúñez App») para la
                        Corporación Universitaria Rafael Núñez (Cartagena, Barranquilla y
                        Medicina), y «Umayor Tooli» («Umayor App») para la Institución
                        Universitaria Mayor de Cartagena (Cartagena y Regionalización). Dentro de
                        cada app eliges tu sede o tu modalidad.
                        Son apps independientes: ninguna es una app oficial de esas
                        instituciones ni está afiliada a ellas.
                        La idea es simple: <strong style={fuerte}>tus datos
                        se quedan en tu teléfono</strong>. SentraLabs no tiene servidores que
                        reciban datos de estudiantes, no hay cuentas de Tooli y no vendemos ni
                        compartimos tus datos.
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
                            (token) que da el aula virtual de tu sede (Moodle en Unisinú
                            Cartagena y en San Buenaventura, Canvas en Unisinú Montería, Ferrum en
                            Comfenalco, SIMA en la Universidad de Cartagena, SPLAVIA en Unitecnar,
                            SIACURN en Uninúñez y Génesis en Umayor), cifrado con el almacén seguro
                            del teléfono. Tu clave del aula se usa una sola vez para pedir ese
                            permiso y no se guarda. También
                            guarda tu usuario si marcas «Recordarme». En Canvas, Tooli usa tu
                            usuario y tu clave una sola vez para crear a tu nombre una llave de
                            acceso llamada «Tooli», que ves y puedes borrar en Canvas ›
                            Configuración; la clave no se guarda. Donde el aula se abre con la
                            cuenta de Microsoft de la universidad (San Buenaventura Cali), escribes
                            tu cuenta en la página de Microsoft, no en Tooli, y Tooli solo recibe
                            el token del aula.
                        </li>
                        <li style={li}>
                            <strong style={fuerte}>Tu clave, solo si lo autorizas:</strong> si
                            marcas «Entrar también a Elysa» (el portal académico de Unisinú, que
                            usa la misma cuenta), Tooli guarda tu usuario y tu clave cifrados en el
                            teléfono para entrar por ti y traer tus notas oficiales y tu horario.
                            Si no lo marcas, tu clave nunca se guarda.
                        </li>
                        <li style={li}>
                            <strong style={fuerte}>Tu clave de Campus (Comfenalco):</strong> si
                            entras a Campus, el portal académico del Tecnológico Comfenalco, Tooli
                            guarda tu usuario y tu clave cifrados en el teléfono para traer tu
                            horario de clases, tus notas por corte, tu historial de cursos, tu
                            estado de cuenta (saldo, cargos y pagos), tus retenciones y tus
                            documentos pendientes.
                        </li>
                        <li style={li}>
                            <strong style={fuerte}>Tu clave de ASIS (San Buenaventura):</strong>
                            si marcas «Entrar también a ASIS» y escribes tu usuario y tu clave de
                            ASIS, el portal académico de la universidad, Tooli los guarda cifrados
                            en el teléfono para abrirlo por ti dentro de la app. Si no lo marcas,
                            no se guardan.
                        </li>
                        <li style={li}>
                            <strong style={fuerte}>Tu sede:</strong> la sede que eliges (por
                            ejemplo, Cartagena o Montería), para saber con qué aula, página y
                            calendario conectarte.
                        </li>
                        <li style={li}>
                            <strong style={fuerte}>Tu carné:</strong> el código estudiantil y el
                            programa que anotas; en Comfenalco, tu número de documento, que es lo
                            que lleva el QR de los torniquetes (el mismo de la app oficial del
                            Tecnológico). Se muestra en tu teléfono y no se envía a nadie.
                        </li>
                        <li style={li}>
                            <strong style={fuerte}>Tus PQRS:</strong> el borrador que escribes y
                            el número de radicado que anotas. La app no envía la PQRS: tú copias
                            el texto y lo pegas en el formulario oficial de la universidad (en
                            Comfenalco, el formulario de PQRSD del SIA).
                        </li>
                        <li style={li}>
                            <strong style={fuerte}>Lo que trae de la universidad:</strong> tus
                            cursos, tareas, calificaciones, mensajes y archivos del aula virtual;
                            en Comfenalco, también lo que trae de Campus; y las noticias y
                            calendarios públicos de la sede, para que puedas verlos sin conexión.
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
                        <li style={li}>El aula virtual de tu sede, con tu cuenta: en Unisinú, Moodle (Cartagena) o Canvas (Montería, unisinu.instructure.com); Ferrum, el Moodle del Tecnológico Comfenalco (ferrum.tecnologicocomfenalco.edu.co), en Comfenalco; en San Buenaventura, el Moodle de tu sede (Cartagena, Medellín, Cali o Bogotá) y, en Cali, el ingreso de Microsoft de la universidad; en la Universidad de Cartagena, SIMA, el Moodle de tu modalidad (moodle.unicartagena.edu.co o sima.unicartagena.edu.co); en Unitecnar, SPLAVIA (splavia5.unitecnar.edu.co); en Uninúñez, SIACURN (aulas.uninunez.edu.co); en Umayor, Génesis (genesisava.umayor.edu.co).</li>
                        <li style={li}>El portal académico, con tu cuenta: en Unisinú, Elysa, si lo autorizas; en San Buenaventura, ASIS (campus.usbco.edu.co), si lo autorizas; en la Universidad de Cartagena, el SMA (sma.unicartagena.edu.co), que se abre como una página dentro de la app: la app no guarda su clave ni lee nada de él; en Comfenalco, Campus (campus.tecnologicocomfenalco.edu.co, su portal PeopleSoft), del que la app lee tu horario de clases, tus notas por corte, tu historial de cursos, tu estado de cuenta (saldo, cargos y pagos), tus retenciones y tus documentos pendientes; en Uninúñez, el Portal Uninúñez y Servicios Académicos, y en Umayor, Ulyses, que se abren como páginas dentro de la app y en los que entras tú con tu cuenta: la app no guarda esas claves ni lee nada de ellos.</li>
                        <li style={li}>La página web pública de tu sede (noticias, calendarios, trámites, bienestar): en Unisinú, unisinucartagena.edu.co o unisinu.edu.co; en Comfenalco, tecnologicocomfenalco.edu.co; en San Buenaventura, la de tu sede y usb.edu.co; en la Universidad de Cartagena, unicartagena.edu.co y su blog de noticias «Universo U» (universounicartagena.co, en Blogger de Google); en Unitecnar, unitecnar.edu.co; en Uninúñez, uninunez.edu.co; en Umayor, umayor.edu.co.</li>
                        <li style={li}>Archivos públicos que la universidad publica en Google: las hojas de cálculo de parciales (Unisinú) y las carpetas de horarios por programa (Comfenalco).</li>
                        <li style={li}>El catálogo público de la biblioteca (Comfenalco, en Koha), para buscar libros sin cuenta.</li>
                        <li style={li}>Los formularios oficiales de PQRS (en Comfenalco, el de PQRSD del SIA), consulta de radicados y cuentas de biblioteca, que se abren dentro de la app y llenas tú: la app no los envía por ti.</li>
                        <li style={li}>YouTube, cuando abres un video que el docente puso en el aula.</li>
                    </ul>
                    <p style={p}>
                        Lo que intercambias con esos sistemas se rige también por sus propias
                        políticas. SentraLabs no recibe una copia de nada de eso: no tiene
                        servidores que reciban datos de estudiantes.
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
                        Hoy Tooli no muestra anuncios ni usa herramientas propias de analítica o
                        rastreo. Si algún día incluye anuncios, esta política se actualizará antes,
                        dirá qué proveedor se usa y qué datos recibe, y la app te lo pedirá cuando
                        la ley lo exija.
                    </p>
                    <p style={p}>
                        El lector de códigos QR usa ML Kit de Google, que lee el código en el
                        teléfono. Según Google, ML Kit le envía datos de diagnóstico y de
                        rendimiento, junto con un identificador por instalación, para mantener y
                        mejorar el servicio. Esos datos van cifrados y SentraLabs no los recibe.
                        Por eso la ficha de cada app en Google Play declara «Diagnóstico» e «ID de
                        dispositivo» en la sección de seguridad de los datos.
                    </p>

                    <h2 style={h2}>6. Cómo borrar tus datos</h2>
                    <ul style={ul}>
                        <li style={li}><strong style={fuerte}>Cerrar sesión</strong> (Perfil) borra del teléfono tu sesión del aula, la clave de Elysa (Unisinú), de Campus (Comfenalco) o de ASIS (San Buenaventura) si la guardaste y lo descargado. En Canvas, además, pide a Canvas que anule la llave «Tooli». Cambiar de sede cierra también la sesión del aula de la sede anterior.</li>
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
