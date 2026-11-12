import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Link from "next/link";
import { CONTACT_EMAIL } from "../lib/site";
import { APPS } from "./apps";
import s from "./tooli.module.css";

const title = "Tooli — tu semestre en el bolsillo";
const description =
    "Tooli, las apps para estudiantes hechas por SentraLabs: clases, tareas, notas y el aula virtual de tu universidad en un solo lugar. Nueve instituciones, una app para cada una.";

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

/* Transición entre documentos (informe 03 §6 de la ola 48): el ícono de la
   tarjeta tocada viaja hasta el kicker de la página de la app, y vuelve al
   regresar. Solo Chrome/Edge 126+ y Safari 18.2+; los demás navegan normal.
   Las páginas de cada app (public/tooli/<id>/) tienen la otra mitad. */
const VT = `
(function () {
  function icono(url) {
    try { var p = new URL(url, location.href).pathname.replace(/\\/$/, ''); } catch (e) { return null; }
    var a = document.querySelector('a[data-app][href="' + p + '"]');
    var i = a && a.querySelector('[data-app-icon]');
    if (!i) return null;
    var r = i.getBoundingClientRect();
    return r.bottom > 0 && r.top < innerHeight ? i : null;
  }
  function nombrar(i, vt) {
    if (!i) return;
    i.style.viewTransitionName = 'app-icon';
    vt.finished.finally(function () { i.style.viewTransitionName = ''; });
  }
  addEventListener('pageswap', function (e) {
    if (e.viewTransition && e.activation && e.activation.entry) nombrar(icono(e.activation.entry.url), e.viewTransition);
  });
  addEventListener('pagereveal', function (e) {
    var act = window.navigation && navigation.activation;
    if (e.viewTransition && act && act.from) nombrar(icono(act.from.url), e.viewTransition);
  });
})();
`;

/* Global a propósito (un módulo CSS no acepta pseudoelementos sin clase). Mismos
   tiempos que las páginas de las apps: el ícono viaja 600 ms con curva de hoja. */
const VT_CSS = `
@view-transition { navigation: auto; }
::view-transition-group(app-icon) { animation-duration: 600ms; animation-timing-function: cubic-bezier(.32,.72,0,1); }
::view-transition-old(root) { animation: 220ms cubic-bezier(.4,0,1,1) both tooliVtOut; }
::view-transition-new(root) { animation: 320ms cubic-bezier(0,0,.2,1) 80ms both tooliVtIn; }
@keyframes tooliVtOut { to { opacity: 0; } }
@keyframes tooliVtIn { from { opacity: 0; } }
@media (prefers-reduced-motion: reduce) {
  ::view-transition-group(app-icon) { animation-duration: 1ms; }
  ::view-transition-old(root), ::view-transition-new(root) { animation-duration: 120ms; animation-delay: 0ms; }
}
`;

/** Orden del abanico: el del centro va delante. */
const FAN = ["comfenalco", "uninunez", "unisinu", "umayor", "sanbuenaventura"];

export default function Tooli() {
    const conPagina = APPS.filter((a) => a.pagina).length;
    return (
        <div className={s.page}>
            <style dangerouslySetInnerHTML={{ __html: VT_CSS }} />
            <script dangerouslySetInnerHTML={{ __html: VT }} />
            <a href="#contenido" className={s.skip}>
                Saltar al contenido
            </a>

            <header className={s.top}>
                <div className={s.topInner}>
                    <Link href="/#proyectos" className={s.back}>
                        <span aria-hidden="true">←</span> <span className={s.backLabel}>SentraLabs</span>
                    </Link>
                    <span className={s.brand}>Tooli</span>
                    <a href="#apps" className={s.topCta}>
                        Elige la tuya
                    </a>
                </div>
            </header>

            <main id="contenido">
                <section className={s.hero}>
                    <div className={s.halo} aria-hidden="true" />
                    <div className={s.copy}>
                    <p className={s.kicker}>Tooli · apps para estudiantes</p>
                    <h1 className={s.title}>
                        Tu semestre en el <span className={s.mark}>bolsillo.</span>
                    </h1>
                    <p className={s.lede}>
                        Tus clases con su salón, tus tareas con cuenta atrás, tus notas por corte y el aula
                        virtual de tu universidad, en una sola app. Cada institución tiene la suya, con sus
                        colores, sus sistemas y sus reglas de notas. Tus datos se quedan en tu teléfono.
                    </p>
                    <ul className={s.stats} aria-label="En números">
                        <li>
                            <strong>{APPS.length}</strong> instituciones
                        </li>
                        <li>
                            <strong>{conPagina}</strong> con su página
                        </li>
                        <li>
                            <strong>1</strong> app para cada una
                        </li>
                    </ul>
                    </div>
                    {/* El Inicio real de cinco apps (semestre de muestra), en abanico: una
                        app por universidad, cada una con su color. */}
                    <div className={s.fan} aria-hidden="true">
                        {FAN.map((id, k) => (
                            <a key={id} href={`/tooli/${id}`} tabIndex={-1} className={s.phone} style={{ "--f": k - 2 } as CSSProperties}>
                                <picture>
                                    <source srcSet={`/tooli/${id}/medios/inicio-300.avif`} type="image/avif" />
                                    {/* eslint-disable-next-line @next/next/no-img-element -- archivo estático de cada página */}
                                    <img
                                        src={`/tooli/${id}/medios/inicio-300.webp`}
                                        alt=""
                                        width={300}
                                        height={650}
                                        decoding="async"
                                        fetchPriority={k === 2 ? "high" : "low"}
                                    />
                                </picture>
                            </a>
                        ))}
                    </div>
                </section>

                <section id="apps" className={s.apps} aria-labelledby="apps-titulo">
                    <h2 id="apps-titulo" className={s.h2}>
                        Elige tu universidad
                    </h2>
                    <ul className={s.grid}>
                        {APPS.map((a, k) => {
                            const estilo = { "--c": a.color, "--k": k } as CSSProperties;
                            const cuerpo = (
                                <>
                                    <span className={s.glow} aria-hidden="true" />
                                    <span className={s.cardTop}>
                                        {/* eslint-disable-next-line @next/next/no-img-element -- archivo estático de cada página */}
                                        <img
                                            data-app-icon=""
                                            className={s.icon}
                                            src={a.icono}
                                            alt=""
                                            width={56}
                                            height={56}
                                            loading={k < 6 ? "eager" : "lazy"}
                                            decoding="async"
                                        />
                                        <span className={a.pagina ? s.estado : `${s.estado} ${s.pronto}`}>
                                            {a.pagina ? "Conócela" : "Muy pronto"}
                                        </span>
                                    </span>
                                    <span className={s.appName}>{a.app}</span>
                                    <span className={s.inst}>{a.institucion}</span>
                                    <span className={s.donde}>{a.donde}</span>
                                    <span className={s.rasgo}>{a.rasgo}</span>
                                    {a.pagina && (
                                        <span className={s.ir} aria-hidden="true">
                                            Ver la app <span className={s.flecha}>→</span>
                                        </span>
                                    )}
                                </>
                            );
                            return (
                                <li key={a.id} className={s.item} style={estilo}>
                                    {a.pagina ? (
                                        /* <a> y no <Link>: la página de la app es un HTML estático
                                           y la transición necesita una navegación de documento. */
                                        <a href={`/tooli/${a.id}`} data-app={a.id} className={`${s.card} ${s.cardLink}`}>
                                            {cuerpo}
                                        </a>
                                    ) : (
                                        <div className={s.card}>{cuerpo}</div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                    <p className={s.nota}>
                        Unisinú App está en prueba en Google Play; las demás llegan después, cada una probada con
                        estudiantes de su institución antes de abrirla a todos.
                    </p>
                </section>

                <section className={s.fin}>
                    <p className={s.honesto}>
                        Tooli es un proyecto independiente de SentraLabs: no es una app oficial de ninguna
                        universidad. Habla directo con los sistemas de tu institución con tu propia cuenta y no
                        guarda tus datos en ningún servidor nuestro.
                    </p>
                    <p className={s.ayuda}>
                        ¿Dudas? Escríbenos a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. Lee nuestra{" "}
                        <Link href="/tooli/privacidad">política de privacidad</Link>; cada app tiene además la suya en
                        su página.
                    </p>
                    <p className={s.wordmark} aria-hidden="true">
                        Tooli
                    </p>
                </section>
            </main>
        </div>
    );
}
