"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { Lang, Translations } from "../i18n/dictionaries";
import { projects, type Project } from "../content/projects";
import { safeUrl } from "../lib/sanitize";
import { BrowserFrame, PhoneFrame, ProjectMark } from "./PhoneFrame";
import { SELECT_PROJECT_EVENT } from "./events";
import styles from "./Showcase.module.css";

/* Los destacados van en pestañas con sus capturas; el resto, en la rejilla de
   logos de abajo. Los dos abren la misma ficha. */
const featured = projects.filter((p) => p.featured);
const more = projects.filter((p) => !p.featured);

/** Dominio sin protocolo ni "www" para la barra del navegador. */
function siteLabel(p: Project) {
  const site = p.links.find((l) => l.kind === "site");
  return site ? site.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : p.name.toLowerCase();
}

/**
 * Escaparate (el de nativosia): pestañas por proyecto a la izquierda y la
 * ficha del proyecto elegido a la derecha. Debajo, el muro de logos (el de
 * basement) con el resto de proyectos. El hero puede elegir un proyecto con un
 * evento cuando tocan uno de sus dispositivos.
 */
export function Showcase({ lang, t }: { lang: Lang; t: Translations["showcase"] }) {
  const [active, setActive] = useState<string>(featured[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onSelect = (e: Event) => {
      const id = (e as CustomEvent<string>).detail;
      if (projects.some((p) => p.id === id)) setActive(id);
    };
    window.addEventListener(SELECT_PROJECT_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_PROJECT_EVENT, onSelect);
  }, []);

  const project = projects.find((p) => p.id === active) ?? featured[0];
  const copy = project.text[lang];
  const screens = project.screens.length > 0 ? project.screens : [undefined];
  const featuredIndex = featured.findIndex((p) => p.id === active);
  const site = project.links.find((l) => l.kind === "site");

  /* Flechas para moverse entre pestañas, como pide el patron de ARIA. */
  const onKey = (e: KeyboardEvent) => {
    const step = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const from = featuredIndex < 0 ? 0 : featuredIndex;
    const next = (from + step + featured.length) % featured.length;
    setActive(featured[next].id);
    tabs.current[next]?.focus();
  };

  /* Desde la rejilla la ficha queda arriba: se lleva a la vista. */
  const openFromGrid = (id: string) => {
    setActive(id);
    requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
  };

  return (
    <section className={styles.showcase} id="proyectos">
      <div className={`wrap ${styles.inner}`}>
        <div className={styles.side}>
          <span className="kicker">{t.kicker}</span>
          <h2 className="h2">{t.title}</h2>
          <p className="lead">{t.desc}</p>

          <div role="tablist" aria-label={t.tabsLabel} aria-orientation="vertical" className={styles.tabs} onKeyDown={onKey}>
            {featured.map((p, i) => {
              const selected = p.id === active;
              return (
                <button
                  key={p.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${p.id}`}
                  aria-selected={selected}
                  aria-controls="panel-proyecto"
                  tabIndex={selected || (featuredIndex < 0 && i === 0) ? 0 : -1}
                  className={styles.tab}
                  style={{ ["--c" as string]: p.accent }}
                  onClick={() => setActive(p.id)}
                >
                  <ProjectMark project={p} size={40} />
                  <span className={styles.tabText}>
                    <strong>{p.name}</strong>
                    <span>{p.text[lang].tagline}</span>
                  </span>
                  <span className={styles.tabArrow} aria-hidden="true">→</span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={panelRef}
          role="tabpanel"
          id="panel-proyecto"
          aria-labelledby={featuredIndex >= 0 ? `tab-${project.id}` : `mas-${project.id}`}
          className={styles.panel}
          style={{ ["--c" as string]: project.accent }}
        >
          <div className={styles.stage} key={project.id}>
            {project.device === "web" ? (
              // Web: la ventana de escritorio y, encima, la version movil si existe.
              <div className={styles.webStage}>
                <BrowserFrame
                  src={project.screens[0]}
                  project={project}
                  url={siteLabel(project)}
                  alt={`${t.screenAlt} ${project.name}`}
                  sizes="(max-width: 900px) 80vw, 520px"
                  className={styles.webDesktop}
                />
                {project.screens[1] && (
                  <PhoneFrame
                    project={project}
                    src={project.screens[1]}
                    alt={`${t.screenAlt} ${project.name} (${lang === "es" ? "móvil" : "mobile"})`}
                    sizes="(max-width: 900px) 24vw, 150px"
                    className={styles.webPhone}
                  />
                )}
              </div>
            ) : (
              screens.map((src, i) => (
                <PhoneFrame
                  key={src ?? "splash"}
                  project={project}
                  src={src}
                  alt={`${t.screenAlt} ${project.name} ${i + 1}`}
                  sizes="(max-width: 900px) 30vw, 200px"
                  className={styles[`shot${screens.length === 1 ? "Solo" : i}` as "shot0"]}
                />
              ))
            )}
          </div>

          <div className={styles.details}>
            <h3>{project.name}</h3>
            <p>{copy.desc}</p>
            {copy.facts.length > 0 && (
              <ul className={styles.facts}>
                {copy.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            )}
            {site && (
              <a href={safeUrl(site.href, "#proyectos")} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {t.site} <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Muro de logos: hairlines entre celdas, sin tarjetas. */}
      <div className={`wrap ${styles.moreWrap}`}>
        <h3 className={styles.moreTitle}>{t.more}</h3>
        <ul className={styles.grid}>
          {more.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                id={`mas-${p.id}`}
                className={styles.cell}
                aria-controls="panel-proyecto"
                aria-pressed={p.id === active}
                style={{ ["--c" as string]: p.accent }}
                onClick={() => openFromGrid(p.id)}
              >
                <ProjectMark project={p} size={48} />
                <span className={styles.cellText}>
                  <strong>{p.name}</strong>
                  <span>{p.text[lang].tagline}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
