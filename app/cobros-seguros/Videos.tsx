"use client";

import { useRef, useState } from "react";
import s from "./videos.module.css";

/* Tráiler y videos de la app (tomas reales). Se bajan solo al dar play. */
const BASE = "/cobros-seguros/medios/";
const VIDEOS = [
    { id: "trailer", title: "Tráiler", text: "La app en 55 segundos", dur: "0:55" },
    { id: "cuaderno", title: "El cuaderno que se desarma", text: "Por qué dejar el cuaderno", dur: "0:32" },
    { id: "cuotas-video", title: "Cobrar por cuotas", text: "Una, varias o ponerse al día", dur: "0:41" },
    { id: "sin-senal-video", title: "Sin señal", text: "Se guarda y sube solo", dur: "0:41" },
    { id: "recorrido", title: "Recorrido completo", text: "Un día de punta a punta", dur: "0:42" },
];

export function Videos() {
    const [i, setI] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef<HTMLVideoElement>(null);
    const v = VIDEOS[i];

    const play = (k: number) => {
        setI(k);
        setStarted(true);
        requestAnimationFrame(() => ref.current?.play().catch(() => {}));
    };

    return (
        <div className={s.videos}>
            <div className={s.screen16}>
                <video
                    ref={ref}
                    key={v.id}
                    src={`${BASE}${v.id}.mp4`}
                    poster={`${BASE}${v.id}.webp`}
                    preload="none"
                    playsInline
                    controls={started}
                    autoPlay={started}
                    className={s.video16}
                    aria-label={`${v.title}: ${v.text}`}
                />
                {!started && (
                    <button type="button" className={s.bigPlay} onClick={() => play(i)} aria-label={`Ver el ${v.title.toLowerCase()}`}>
                        <span aria-hidden="true">
                            <svg viewBox="0 0 24 24">
                                <path d="M8 5.5v13l11-6.5Z" />
                            </svg>
                        </span>
                        <b>Ver el {v.title.toLowerCase()}</b>
                        <small>{v.dur} · con sonido</small>
                    </button>
                )}
            </div>
            <ul className={s.vlist}>
                {VIDEOS.map((x, k) => (
                    <li key={x.id}>
                        <button type="button" aria-pressed={k === i} onClick={() => play(k)} className={s.vitem}>
                            <img src={`${BASE}${x.id}.webp`} alt="" width={1280} height={720} loading="lazy" decoding="async" />
                            <span>
                                <strong>{x.title}</strong>
                                <small>
                                    {x.text} · {x.dur}
                                </small>
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
