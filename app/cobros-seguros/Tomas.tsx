"use client";

import { useEffect, useRef, useState } from "react";
import gestos from "./gestos.json";
import s from "./tomas.module.css";

/* Tomas reales grabadas en el teléfono (cuentas de muestra). Cada toma trae el
   registro de sus gestos (tiempo y posición), y aquí se dibuja el dedo encima
   en sincronía con el video: un requestAnimationFrame lee currentTime y mueve
   el punto con transform; React no se entera de cada cuadro. */

type Paso = { t: number; a: string; x?: number; y?: number; x2?: number; y2?: number; ms?: number };
type Meta = { dur: number; pasos: Paso[] };
const META = gestos as Record<string, Meta>;
const BASE = "/cobros-seguros/medios/";

const GRUPOS = [
    {
        id: "cobrador",
        label: "Cobrador",
        tomas: [
            { id: "agenda-gestos", title: "Agenda con gestos", text: "Desliza para cobrar o marcar visita; mantén presionado para el menú." },
            { id: "cobro-cuotas", title: "Cobro por cuotas", text: "Mantener el «+» sube solo; la frase dice qué queda pagado." },
            { id: "recibo", title: "El recibo", text: "Del «¡Pago registrado!» al recibo con QR." },
            { id: "sin-senal", title: "Sin señal", text: "Modo avión, cobro guardado y sube solo al volver." },
            { id: "rutas", title: "La ruta del día", text: "Paradas por cercanía y por zona." },
            { id: "caja-pestanas", title: "La Caja", text: "Hoy, Historial y Negocio deslizando a los lados." },
            { id: "oscuro-letra-grande", title: "Oscuro y letra grande", text: "Cambia en vivo y cada pantalla se re-mide." },
        ],
    },
    {
        id: "jefe",
        label: "Jefe",
        tomas: [
            { id: "alertas-jefe", title: "Alertas", text: "Avisa que pagó, vence hoy, sin visita." },
            { id: "solicitudes-gestos", title: "Aprobar deslizando", text: "Préstamos y clientes nuevos de tu equipo." },
            { id: "equipo-gestos", title: "Mi equipo", text: "Ver perfil o reasignar con un gesto." },
            { id: "caja-jefe-entrega", title: "Plata por confirmar", text: "La entrega del cobrador, confirmada o no." },
            { id: "mora-intereses", title: "Gestión de mora", text: "Quién debe, cuánto y desde cuándo." },
            { id: "aviso-pago", title: "Aviso de pago", text: "El cliente avisa; tú lo registras." },
        ],
    },
    {
        id: "cliente",
        label: "Cliente",
        tomas: [
            { id: "cliente-cuenta-cap6-s55", title: "Mi cuenta", text: "Lo que debe, sus pagos y cada recibo." },
            { id: "cliente-simulador", title: "¿Cuánto pagaría?", text: "Simula un préstamo antes de pedirlo." },
        ],
    },
] as const;

const TAP_MS = 420;

export function Tomas() {
    const [g, setG] = useState(0);
    const [i, setI] = useState(0);
    const [visible, setVisible] = useState(false);
    const [reduced, setReduced] = useState(false);
    const video = useRef<HTMLVideoElement>(null);
    const dot = useRef<HTMLSpanElement>(null);
    const chip = useRef<HTMLSpanElement>(null);
    const box = useRef<HTMLDivElement>(null);
    const playerRef = useRef<HTMLDivElement>(null);
    const grupo = GRUPOS[g];
    const toma = grupo.tomas[i];
    const meta = META[toma.id];

    useEffect(() => {
        setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
        const el = playerRef.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    /* Solo corre cuando se ve; con «reducir movimiento» no arranca solo. */
    useEffect(() => {
        const v = video.current;
        if (!v) return;
        if (visible && !reduced) v.play().catch(() => {});
        else v.pause();
    }, [visible, reduced, toma.id]);

    /* El dedo, en sincronía con el video. */
    useEffect(() => {
        const v = video.current;
        const d = dot.current;
        if (!v || !d) return;
        let frame = 0;
        let last = "";
        const name = (kind: string) => (kind === "swipe" ? "Desliza" : kind === "hold" ? "Mantén presionado" : "Toca");
        const tick = () => {
            frame = requestAnimationFrame(tick);
            const t = v.currentTime * 1000;
            let shown = false;
            for (const p of meta.pasos) {
                const start = p.t * 1000;
                const len = p.a === "swipe" ? (p.ms ?? 500) + 200 : Math.max(TAP_MS, (p.ms ?? 0) + 150);
                if (t < start - 120 || t > start + len) continue;
                const k = Math.min(1, Math.max(0, (t - start) / (p.a === "swipe" ? p.ms ?? 500 : 1)));
                const x = p.a === "swipe" && p.x2 !== undefined ? p.x! + (p.x2 - p.x!) * k : p.x!;
                const y = p.a === "swipe" && p.y2 !== undefined ? p.y! + (p.y2 - p.y!) * k : p.y!;
                if (x === undefined || y === undefined) continue;
                const press = t >= start ? 1 : 0.6;
                d.style.transform = `translate(${x * 100}%, ${y * 100}%)`;
                const kind = p.a === "swipe" ? "swipe" : p.ms && p.ms > 300 ? "hold" : "tap";
                d.dataset.kind = kind;
                if (chip.current && kind !== last) {
                    chip.current.textContent = name(kind);
                    last = kind;
                }
                d.style.setProperty("--press", String(press));
                shown = true;
                break;
            }
            d.style.opacity = shown ? "1" : "0";
            if (chip.current) chip.current.style.opacity = shown ? "1" : "0";
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [meta]);

    const pick = (gi: number, ti: number) => {
        setG(gi);
        setI(ti);
    };
    const next = () => {
        if (i + 1 < grupo.tomas.length) setI(i + 1);
        else setI(0);
    };

    return (
        <div className={s.tomas} ref={box}>
            <div className={s.player} ref={playerRef}>
                <div className={s.phone}>
                    <video
                        ref={video}
                        key={toma.id}
                        className={s.video}
                        src={`${BASE}${toma.id}.mp4`}
                        poster={`${BASE}${toma.id}.webp`}
                        muted
                        playsInline
                        preload="none"
                        onEnded={next}
                        aria-label={`${toma.title}: ${toma.text}`}
                        controls={reduced}
                    />
                    <span ref={chip} className={s.chip} aria-hidden="true" />
                    <div className={s.dotLayer} aria-hidden="true">
                        <span ref={dot} className={s.dot} />
                    </div>
                </div>
                <p className={s.now} aria-live="polite">
                    <b>{toma.title}</b> · {meta.dur.toFixed(0)} s
                </p>
            </div>

            <div className={s.list}>
                <div role="tablist" aria-label="Tomas por rol" className={s.groups}>
                    {GRUPOS.map((gr, gi) => (
                        <button key={gr.id} role="tab" aria-selected={gi === g} onClick={() => pick(gi, 0)}>
                            {gr.label} <span>{gr.tomas.length}</span>
                        </button>
                    ))}
                </div>
                <ul className={s.items}>
                    {grupo.tomas.map((t, ti) => (
                        <li key={t.id}>
                            <button type="button" aria-pressed={ti === i} className={s.item} onClick={() => pick(g, ti)}>
                                <img src={`${BASE}${t.id}.webp`} alt="" width={432} height={898} loading="lazy" decoding="async" />
                                <span>
                                    <strong>{t.title}</strong>
                                    <small>{t.text}</small>
                                </span>
                                {ti === i && <span className={s.playing} aria-hidden="true" />}
                            </button>
                        </li>
                    ))}
                </ul>
                <p className={s.note}>Grabadas en un teléfono real con cuentas de muestra. El punto azul es el dedo.</p>
            </div>
        </div>
    );
}
