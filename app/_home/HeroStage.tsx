"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Translations } from "../i18n/dictionaries";
import { getProject, heroLineup, screenFor } from "../content/projects";
import { BrowserFrame, PhoneFrame } from "./PhoneFrame";
import { SELECT_PROJECT_EVENT } from "./events";
import styles from "./HeroStage.module.css";

/* three.js pesa: se descarga aparte, solo en el navegador y solo si se va a
   usar. Mientras tanto (y si nunca se usa) se ven los dispositivos en CSS. */
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export function HeroStage({ t }: { t: Translations["hero"] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [eventSource, setEventSource] = useState<HTMLElement | null>(null);
  const [can3D, setCan3D] = useState(false);
  const [load, setLoad] = useState(false);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [finePointer, setFinePointer] = useState(false);

  /* ¿Vale la pena el 3D? No con movimiento reducido, sin WebGL ni con ahorro
     de datos: en esos casos se quedan los dispositivos en CSS. */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    let webgl = false;
    try {
      const c = document.createElement("canvas");
      webgl = Boolean(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webgl = false;
    }
    setFinePointer(window.matchMedia("(pointer: fine)").matches);
    if (reduce || saveData || !webgl) return;

    setCan3D(true);
    setEventSource(stageRef.current?.closest("section") ?? null);

    // Se espera a que el navegador este libre: el texto del hero va primero.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setLoad(true), { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setLoad(true), 300);
    return () => window.clearTimeout(id);
  }, []);

  /* Fuera de pantalla la escena no dibuja: ahorra bateria y GPU. */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting), {
      rootMargin: "80px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onSelect = useCallback((id: string) => {
    window.dispatchEvent(new CustomEvent(SELECT_PROJECT_EVENT, { detail: id }));
    document.getElementById("proyectos")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const onReady = useCallback(() => setReady(true), []);

  return (
    <div ref={stageRef} className={styles.stage} data-ready={ready}>
      <div className={styles.glow} aria-hidden="true" />

      {/* Respaldo en CSS: tambien es lo que se ve mientras carga el 3D. */}
      <div className={styles.fallback} aria-hidden={can3D}>
        {heroLineup.map((slot, i) => {
          const p = getProject(slot.id);
          const position = styles[`slot${i}` as "slot0"];
          if (slot.device === "web" && p?.screens[0]) {
            return (
              <BrowserFrame
                key={i}
                src={p.screens[0]}
                url={siteLabel(p.links)}
                alt={p.name}
                priority
                sizes="(max-width: 900px) 70vw, 420px"
                className={`${styles.web} ${position}`}
              />
            );
          }
          return (
            <PhoneFrame
              key={i}
              project={p}
              src={screenFor(p, slot.device)}
              alt={p?.name ?? ""}
              sizes="(max-width: 900px) 30vw, 180px"
              className={`${styles.phone} ${position}`}
            />
          );
        })}
      </div>

      {can3D && load && (
        <div className={styles.canvas} role="img" aria-label={t.sceneLabel}>
          <HeroScene
            paused={paused}
            interactive={finePointer}
            eventSource={eventSource}
            onReady={onReady}
            onSelect={onSelect}
          />
        </div>
      )}
    </div>
  );
}

/** Dominio sin protocolo ni "www" para la barra del navegador. */
function siteLabel(links: { kind: string; href: string }[]) {
  const site = links.find((l) => l.kind === "site");
  return site ? site.href.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : "";
}
