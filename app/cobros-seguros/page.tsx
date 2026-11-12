import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CompareSlider, CuotasDemo, DayStory, RolesTabs, SinSenalDemo, TiltPhone } from "./Interactivos";
import s from "./cobros.module.css";

const title = "Cobros Seguros — tu cartera de microcrédito en el teléfono";
const description =
    "La app de SentraLabs para quien presta y cobra en la calle: agenda con lo vencido, cobro por cuotas con recibo, ruta del día, cuadre de caja y trabajo en equipo. Funciona sin señal.";

export const metadata: Metadata = {
    title,
    description,
    alternates: { canonical: "/cobros-seguros" },
    openGraph: { title, description, url: "/cobros-seguros", type: "website", locale: "es_CO", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] },
};

/* Sitio propio de la app (Firebase Hosting): políticas, borrado y prueba cerrada. */
const APP_SITE = "https://cobros-seguros-55741.web.app";
const IMG = "/images/projects/cobros-seguros/cobros-seguros-app-";

/** El logo B «Insignia»: escudo con la C que se cierra con la última cuota (verde). */
function Logo({ size = 44, animated = false }: { size?: number; animated?: boolean }) {
    return (
        <svg
            viewBox="0 0 100 100"
            width={size}
            height={size}
            className={animated ? s.logoAnim : undefined}
            role="img"
            aria-label="Cobros Seguros"
        >
            <defs>
                <linearGradient id="cs-ga" x1="0.1" y1="0" x2="0.9" y2="1">
                    <stop offset="0" stopColor="#3D7BFF" />
                    <stop offset="0.55" stopColor="#1B4FD8" />
                    <stop offset="1" stopColor="#16267F" />
                </linearGradient>
                <radialGradient id="cs-ha" cx="0.22" cy="0.12" r="0.75">
                    <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.22" />
                    <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
                </radialGradient>
            </defs>
            <rect width="100" height="100" rx="23" fill="url(#cs-ga)" />
            <rect width="100" height="100" rx="23" fill="url(#cs-ha)" />
            <path
                className={s.logoShield}
                fillRule="evenodd"
                fill="#FFFFFF"
                d="M50 22.540C56.930 22.540 62.870 24.388 68.440 25.972C71.234 26.766 72.770 28.348 72.770 31.252L72.770 46.960C72.770 60.820 64.388 70.984 53.564 77.122C51.320 78.310 48.680 78.310 46.436 77.122C35.612 70.984 27.230 60.820 27.230 46.960L27.230 31.252C27.230 28.348 28.766 26.766 31.560 25.972C37.130 24.388 43.070 22.540 50 22.540ZM60.869 60.666A1.122 1.122 0 0 1 60.904 62.380A16.500 16.500 0 1 1 60.904 37.612A1.122 1.122 0 0 1 60.869 39.326L56.356 42.981A1.122 1.122 0 0 1 54.996 43.021A8.580 8.580 0 1 0 54.996 56.971A1.122 1.122 0 0 1 56.356 57.011L60.869 60.666Z"
            />
            <path
                className={s.logoCuota}
                fill="#12B76A"
                d="M62.696 41.583A1.122 1.122 0 0 1 64.380 41.905A16.500 16.500 0 0 1 64.380 58.087A1.122 1.122 0 0 1 62.696 58.409L58.183 54.754A1.122 1.122 0 0 1 57.862 53.433A8.580 8.580 0 0 0 57.862 46.559A1.122 1.122 0 0 1 58.183 45.238L62.696 41.583Z"
            />
        </svg>
    );
}

const FAQ = [
    {
        q: "¿Cobros Seguros presta plata?",
        a: "No. No presta, no capta dinero y no mueve pagos. Es una herramienta para llevar en orden los préstamos que tú ya haces: quién debe, cuánto, cuándo y qué se cobró.",
    },
    {
        q: "¿Qué pasa si se va la señal en plena ruta?",
        a: "Sigues trabajando. La cartera abre desde una copia cifrada en el teléfono, y cada cobro o visita se guarda ahí y se envía solo cuando vuelve la conexión, una sola vez aunque toques dos veces.",
    },
    {
        q: "¿Mis cobradores ven a todos mis clientes?",
        a: "No. Cada cobrador ve solo los clientes que le asignas. El jefe ve todo el equipo, aprueba préstamos y recibe alertas.",
    },
    {
        q: "¿El cliente ve lo que anoto de él?",
        a: "No. Si lo invitas, el cliente consulta lo que debe, su plan de pagos y sus recibos. Las notas internas y la calificación de riesgo nunca le llegan.",
    },
    {
        q: "¿Cuándo sale en Google Play?",
        a: "Está en prueba cerrada para Android. Si quieres usarla antes, deja tu correo en la página de la prueba y te avisamos.",
    },
];

export default function CobrosSeguros() {
    return (
        <div className={s.page}>
            <a href="#contenido" className={s.skip}>
                Saltar al contenido
            </a>

            <header className={s.top}>
                <div className={s.topInner}>
                    <Link href="/#proyectos" className={s.back}>
                        <span aria-hidden="true">←</span> <span className={s.backLabel}>SentraLabs</span>
                    </Link>
                    <span className={s.brand}>
                        <Logo size={28} />
                        Cobros Seguros
                    </span>
                    <a href={`${APP_SITE}/probar.html`} className={s.topCta}>
                        Probarla
                    </a>
                </div>
            </header>

            <main id="contenido">
                {/* ─── Héroe ─── */}
                <section className={s.hero} aria-labelledby="hero-titulo">
                    <div className={s.glow} aria-hidden="true" />
                    <div className={s.heroText}>
                        <Logo size={72} animated />
                        <p className={s.kicker}>App de SentraLabs · Android</p>
                        <h1 id="hero-titulo" className={s.h1}>
                            Cobra la ruta. Cuadra la caja. <span className="mark">Sin señal</span> también.
                        </h1>
                        <p className={s.lead}>
                            Tu cartera de microcrédito en el teléfono: clientes, cuotas, cobros con recibo, la ruta del
                            día y la caja, para quien presta y cobra en la calle.
                        </p>
                        <div className={s.actions}>
                            <a href={`${APP_SITE}/probar.html`} className={s.primary}>
                                Quiero probarla
                            </a>
                            <a href="#demo-cuotas" className={s.ghost}>
                                Probar el cobro aquí <span aria-hidden="true">↓</span>
                            </a>
                        </div>
                        <p className={s.status}>
                            <span className={s.liveDot} aria-hidden="true" /> En prueba cerrada · Próximamente en Google Play
                        </p>
                    </div>

                    <div className={s.heroStage}>
                        <TiltPhone>
                            <div className={`${s.phone} ${s.phoneHero}`}>
                                <Image
                                    src={`${IMG}agenda.webp`}
                                    alt="Agenda del día de Cobros Seguros con los clientes pendientes y su mora"
                                    fill
                                    priority
                                    sizes="(max-width: 700px) 62vw, 320px"
                                    className={s.screenStatic}
                                />
                            </div>
                            <div className={`${s.float} ${s.floatPaid}`} aria-hidden="true">
                                <span className={s.floatCheck}>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} />
                                    </svg>
                                </span>
                                <span>
                                    <b>¡Pago registrado!</b>
                                    <small>$ 129.505 · Recibo R-2026-0214</small>
                                </span>
                            </div>
                            <div className={`${s.float} ${s.floatSaved}`} aria-hidden="true">
                                <svg viewBox="0 0 24 24">
                                    <path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4 4 0 0 1-.5 8.5Z" />
                                    <path d="M4 4l16 16" />
                                </svg>
                                <span>1 guardado · sale con la señal</span>
                            </div>
                        </TiltPhone>
                    </div>
                </section>

                {/* ─── Franja de hechos ─── */}
                <section className={s.facts} aria-label="En pocas palabras">
                    <ul>
                        <li>
                            <b>Sin señal</b>
                            <span>cobra, visita y cuadra igual</span>
                        </li>
                        <li>
                            <b>3 roles</b>
                            <span>jefe, cobrador y cliente</span>
                        </li>
                        <li>
                            <b>Recibo al instante</b>
                            <span>por WhatsApp, como imagen</span>
                        </li>
                        <li>
                            <b>+2.800 pruebas</b>
                            <span>automáticas antes de cada versión</span>
                        </li>
                    </ul>
                </section>

                {/* ─── Un día de cobro ─── */}
                <section className={s.section} aria-labelledby="dia-titulo">
                    <div className={s.wrap}>
                        <p className={s.kicker}>Un día de cobro</p>
                        <h2 id="dia-titulo" className={s.h2}>
                            Del cuaderno a una app que hace las cuentas por ti.
                        </h2>
                        <DayStory />
                    </div>
                </section>

                {/* ─── Demo de cuotas ─── */}
                <section className={`${s.section} ${s.raised}`} id="demo-cuotas" aria-labelledby="cuotas-titulo">
                    <div className={s.wrap}>
                        <p className={s.kicker}>Pruébalo aquí</p>
                        <h2 id="cuotas-titulo" className={s.h2}>
                            ¿Paga una cuota o se pone al día?
                        </h2>
                        <p className={s.lead}>
                            El cliente atrasado rara vez paga justo una cuota. Eliges cuántas cubre y la app te dice qué
                            queda pagado y qué sigue vencido, antes de guardar.
                        </p>
                        <CuotasDemo />
                    </div>
                </section>

                {/* ─── Demo sin señal ─── */}
                <section className={s.section} aria-labelledby="senal-titulo">
                    <div className={`${s.wrap} ${s.split}`}>
                        <div>
                            <p className={s.kicker}>Sin señal</p>
                            <h2 id="senal-titulo" className={s.h2}>
                                La vereda no tiene cobertura. Tu cobro sí queda.
                            </h2>
                            <p className={s.lead}>
                                Lo que registras se guarda cifrado en el teléfono y se envía solo cuando vuelve la conexión.
                                Una sola vez, aunque toques dos veces: nadie paga doble en el papel.
                            </p>
                        </div>
                        <SinSenalDemo />
                    </div>
                </section>

                {/* ─── Roles ─── */}
                <section className={`${s.section} ${s.raised}`} aria-labelledby="roles-titulo">
                    <div className={s.wrap}>
                        <p className={s.kicker}>Equipo</p>
                        <h2 id="roles-titulo" className={s.h2}>
                            Cada quien ve lo suyo.
                        </h2>
                        <RolesTabs />
                    </div>
                </section>

                {/* ─── Claro / oscuro ─── */}
                <section className={s.section} aria-labelledby="modo-titulo">
                    <div className={`${s.wrap} ${s.split} ${s.splitReverse}`}>
                        <CompareSlider />
                        <div>
                            <p className={s.kicker}>De día o de noche</p>
                            <h2 id="modo-titulo" className={s.h2}>
                                Se lee al sol del mediodía y a las seis de la tarde.
                            </h2>
                            <p className={s.lead}>
                                Modo claro y oscuro, letra grande que se respeta en cada pantalla y botones a la medida
                                del dedo, pensada para teléfonos sencillos.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ─── Lo que no hace ─── */}
                <section className={`${s.section} ${s.paper}`} aria-labelledby="honesto-titulo">
                    <div className={s.wrap}>
                        <p className={s.kicker}>Lo que no hace</p>
                        <p id="honesto-titulo" className={s.honest}>
                            Cobros Seguros <em>no presta plata</em>, no capta dinero y no mueve pagos. Es una herramienta
                            para llevar en orden los préstamos que tú ya haces.
                        </p>
                    </div>
                </section>

                {/* ─── Preguntas ─── */}
                <section className={s.section} aria-labelledby="faq-titulo">
                    <div className={`${s.wrap} ${s.faqWrap}`}>
                        <h2 id="faq-titulo" className={s.h2}>
                            Preguntas frecuentes
                        </h2>
                        <div className={s.faq}>
                            {FAQ.map((f) => (
                                <details key={f.q}>
                                    <summary>{f.q}</summary>
                                    <p>{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── Cierre ─── */}
                <section className={s.cta} aria-labelledby="cta-titulo">
                    <div className={s.wrap}>
                        <Logo size={64} />
                        <h2 id="cta-titulo" className={s.ctaTitle}>
                            Deja el cuaderno.
                            <br />
                            Lleva la cartera.
                        </h2>
                        <div className={s.actions}>
                            <a href={`${APP_SITE}/probar.html`} className={s.primary}>
                                Entrar a la prueba cerrada
                            </a>
                            <span className={s.play}>Próximamente en Google Play</span>
                        </div>
                    </div>
                </section>
            </main>

            <footer className={s.footer}>
                <div className={s.wrap}>
                    <p>
                        Cobros Seguros es un producto de <Link href="/">SentraLabs</Link>, empresa colombiana de desarrollo de
                        software. Las pantallas usan datos de muestra.
                    </p>
                    <nav aria-label="Documentos de la app">
                        <a href={`${APP_SITE}/privacy-policy.html`}>Privacidad</a>
                        <a href={`${APP_SITE}/terms.html`}>Términos</a>
                        <a href={`${APP_SITE}/eliminar-cuenta.html`}>Borrar cuenta</a>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
