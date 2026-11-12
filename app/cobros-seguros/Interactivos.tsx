"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import s from "./cobros.module.css";

/* Piezas que el visitante puede tocar. Todo con datos de muestra: ningún
   nombre ni cifra es de un cliente real. Las animaciones solo mueven
   transform y opacity; el giro del teléfono escribe variables CSS en un
   requestAnimationFrame, nunca estado de React por cuadro. */

const IMG = "/images/projects/cobros-seguros/cobros-seguros-app-";
const peso = (n: number) => `$ ${Math.round(n).toLocaleString("es-CO")}`;

function useReducedMotion() {
    const [reduced, setReduced] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        const on = () => setReduced(mq.matches);
        on();
        mq.addEventListener("change", on);
        return () => mq.removeEventListener("change", on);
    }, []);
    return reduced;
}

/* ─── Teléfono del héroe: se inclina con el puntero ─── */
export function TiltPhone({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();

    useEffect(() => {
        const el = ref.current;
        if (!el || reduced || !window.matchMedia("(pointer: fine)").matches) return;
        const zone = el.closest("section") ?? el;
        let frame = 0;
        let tx = 0;
        let ty = 0;
        const apply = () => {
            frame = 0;
            el.style.setProperty("--rx", `${(-ty * 9).toFixed(2)}deg`);
            el.style.setProperty("--ry", `${(tx * 12).toFixed(2)}deg`);
        };
        const move = (e: Event) => {
            const p = e as PointerEvent;
            const r = zone.getBoundingClientRect();
            tx = (p.clientX - r.left) / r.width - 0.5;
            ty = (p.clientY - r.top) / r.height - 0.5;
            if (!frame) frame = requestAnimationFrame(apply);
        };
        const leave = () => {
            tx = 0;
            ty = 0;
            if (!frame) frame = requestAnimationFrame(apply);
        };
        zone.addEventListener("pointermove", move);
        zone.addEventListener("pointerleave", leave);
        return () => {
            zone.removeEventListener("pointermove", move);
            zone.removeEventListener("pointerleave", leave);
            cancelAnimationFrame(frame);
        };
    }, [reduced]);

    return (
        <div ref={ref} className={s.tilt}>
            {children}
        </div>
    );
}

/* ─── Así va un día: el teléfono fijo cambia de pantalla con cada paso ─── */
const DAY = [
    {
        key: "agenda",
        kicker: "08:00 · Agenda",
        title: "Sales sabiendo a quién visitar.",
        body: "Lo vencido va primero, con cuántas cuotas debe cada cliente y cuánto suman. La ruta se ordena por cercanía y llamas o escribes por WhatsApp desde la misma tarjeta.",
        img: "agenda",
        alt: "Agenda del día con tres clientes pendientes, sus días de mora y lo que falta por pagar",
    },
    {
        key: "cobro",
        kicker: "10:30 · Cobro",
        title: "Cobras y el recibo sale solo.",
        body: "La app reparte el pago entre mora, interés y capital, y dice cuánto falta. El cliente recibe su recibo al instante: nadie discute lo que quedó escrito.",
        img: "pago",
        alt: "Pantalla de pago registrado con el recibo: interés, abono a capital y lo que falta por pagar",
    },
    {
        key: "caja",
        kicker: "18:00 · Caja",
        title: "Cierras el día sin sumar a mano.",
        body: "Lo recogido, cuánto es capital y cuánto interés, los gastos y la plata que tienes en tu poder. El jefe ve el mismo cuadre desde su teléfono.",
        img: "caja",
        alt: "Caja del día con el total recogido, lo esperado y la plata en poder del cobrador",
    },
];

export function DayStory() {
    const [active, setActive] = useState(0);
    const steps = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
                }
            },
            { rootMargin: "-45% 0px -45% 0px" },
        );
        steps.current.forEach((el) => el && io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <div className={s.day}>
            <div className={s.dayStage} aria-hidden="true">
                <div className={s.phone}>
                    {DAY.map((d, i) => (
                        <Image
                            key={d.key}
                            src={`${IMG}${d.img}.webp`}
                            alt=""
                            fill
                            sizes="300px"
                            className={`${s.screen} ${i === active ? s.screenOn : ""}`}
                        />
                    ))}
                </div>
                <ol className={s.dayDots}>
                    {DAY.map((d, i) => (
                        <li key={d.key} className={i === active ? s.dotOn : ""} />
                    ))}
                </ol>
            </div>
            <div className={s.daySteps}>
                {DAY.map((d, i) => (
                    <article
                        key={d.key}
                        data-i={i}
                        ref={(el) => {
                            steps.current[i] = el;
                        }}
                        className={`${s.dayStep} ${i === active ? s.dayStepOn : ""}`}
                    >
                        <span className={s.stepKicker}>{d.kicker}</span>
                        <h3>{d.title}</h3>
                        <p>{d.body}</p>
                        <div className={`${s.phone} ${s.phoneInline}`}>
                            <Image src={`${IMG}${d.img}.webp`} alt={d.alt} fill sizes="70vw" className={s.screenStatic} />
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

/* ─── Cobrar por cuotas: la misma regla de la app con un préstamo de muestra ─── */
const LOAN = { cuota: 43_333, total: 15, pagadas: 3, vencidas: 5, mora: 1_026 };

function coverage(n: number) {
    const { cuota, total, pagadas, vencidas, mora } = LOAN;
    const desde = pagadas + 1;
    const hasta = pagadas + n;
    const cuotas = n === 1 ? `la cuota ${desde}` : n === 2 ? `las cuotas ${desde} y ${hasta}` : `las cuotas ${desde} a ${hasta}`;
    const quedan = vencidas - n;
    let cola: string;
    if (quedan > 0) cola = `Siguen ${quedan === 1 ? "1 cuota vencida" : `${quedan} cuotas vencidas`} (${peso(quedan * cuota)}).`;
    else if (hasta === total) cola = "Queda a paz y salvo.";
    else if (quedan === 0) cola = "Queda al día.";
    else cola = `Queda al día y adelanta ${-quedan === 1 ? "1 cuota" : `${-quedan} cuotas`}.`;
    return {
        monto: mora + n * cuota,
        frase: `Cubre la mora (${peso(mora)}) y paga ${cuotas}. ${cola}`,
        rango: n === 1 ? `Cuota ${desde} de ${total}` : `Cuotas ${desde} ${n === 2 ? "y" : "a"} ${hasta} de ${total}`,
        falta: (total - hasta) * cuota,
        interes: Math.round(n * cuota * 0.3),
        capital: n * cuota - Math.round(n * cuota * 0.3),
    };
}

export function CuotasDemo() {
    const max = LOAN.total - LOAN.pagadas;
    const [n, setN] = useState(LOAN.vencidas);
    const [recibo, setRecibo] = useState<null | { num: number; n: number }>(null);
    const [count, setCount] = useState(214);
    const c = coverage(n);
    const r = recibo ? coverage(recibo.n) : null;

    const registrar = () => {
        setCount((k) => k + 1);
        setRecibo({ num: count + 1, n });
    };

    return (
        <div className={s.calc}>
            <div className={s.calcCard}>
                <div className={s.calcHead}>
                    <span className={s.avatar}>J</span>
                    <div>
                        <strong>Jorge Iván Torres</strong>
                        <span>#L011 · 15 cuotas diarias de {peso(LOAN.cuota)}</span>
                    </div>
                    <span className={s.badgeMora}>{LOAN.vencidas} vencidas</span>
                </div>

                <div className={s.quick} role="group" aria-label="Atajos">
                    <button type="button" aria-pressed={n === 1} onClick={() => setN(1)}>
                        Una cuota
                    </button>
                    <button type="button" aria-pressed={n === LOAN.vencidas} onClick={() => setN(LOAN.vencidas)}>
                        Ponerse al día ({LOAN.vencidas})
                    </button>
                </div>

                <div className={s.stepper}>
                    <button type="button" aria-label="Una cuota menos" disabled={n <= 1} onClick={() => setN(n - 1)}>
                        −
                    </button>
                    <output aria-live="polite" className={s.stepperValue}>
                        <b key={n}>{n}</b> {n === 1 ? "cuota" : "cuotas"}
                    </output>
                    <button type="button" aria-label="Una cuota más" disabled={n >= max} onClick={() => setN(n + 1)}>
                        +
                    </button>
                </div>

                <p className={s.amount}>
                    <span>Cobras</span>
                    <b key={c.monto}>{peso(c.monto)}</b>
                </p>
                <p className={s.phrase} aria-live="polite">
                    {c.frase}
                </p>

                <button type="button" className={s.primary} onClick={registrar}>
                    Registrar cobro
                </button>
                <p className={s.sample}>Préstamo y cifras de muestra. La regla (mora primero, luego cuotas en orden) es la de la app.</p>
            </div>

            <div className={s.receiptSlot} aria-live="polite">
                {r && recibo ? (
                    <div className={s.receipt} key={recibo.num}>
                        <svg className={s.receiptMark} viewBox="0 0 100 100" aria-hidden="true">
                            <circle cx="50" cy="50" r="44" pathLength={1} />
                            <path d="M30 51 L44 65 L71 37" pathLength={1} />
                        </svg>
                        <h4>¡Pago registrado!</h4>
                        <p className={s.receiptSub}>
                            <b>{peso(r.monto)}</b> cobrados a <b>Jorge Iván Torres</b>
                        </p>
                        <dl>
                            <div>
                                <dt>Recibo</dt>
                                <dd>R-2026-{String(recibo.num).padStart(4, "0")}</dd>
                            </div>
                            <div>
                                <dt>Cuotas</dt>
                                <dd>{r.rango.replace(/^Cuotas? /, "")}</dd>
                            </div>
                            <div>
                                <dt>Abono a mora</dt>
                                <dd className={s.red}>{peso(LOAN.mora)}</dd>
                            </div>
                            <div>
                                <dt>Interés</dt>
                                <dd className={s.amber}>{peso(r.interes)}</dd>
                            </div>
                            <div>
                                <dt>Abono a capital</dt>
                                <dd className={s.blue}>{peso(r.capital)}</dd>
                            </div>
                            <div>
                                <dt>Falta por pagar</dt>
                                <dd>{r.falta === 0 ? "Paz y salvo" : peso(r.falta)}</dd>
                            </div>
                        </dl>
                    </div>
                ) : (
                    <div className={s.receiptEmpty}>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M6 3h12v18l-3-2-3 2-3-2-3 2Z" />
                            <path d="M9 8h6M9 12h6M9 16h3" />
                        </svg>
                        <p>Elige cuántas cuotas paga y registra el cobro: aquí aparece el recibo que le llega al cliente.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─── Sin señal: lo cobrado se guarda en el teléfono y sale solo una vez ─── */
type Item = { id: number; name: string; amount: number; status: "guardado" | "enviando" | "enviado" };
const PEOPLE = [
    { name: "Luz Dary Gómez", amount: 168_133 },
    { name: "Jorge Iván Torres", amount: 129_505 },
    { name: "Rosa Elena Martínez", amount: 86_666 },
    { name: "Carlos Pérez", amount: 43_333 },
];

export function SinSenalDemo() {
    const [online, setOnline] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const next = useRef(0);
    const timers = useRef<number[]>([]);

    useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

    const later = (fn: () => void, ms: number) => {
        timers.current.push(window.setTimeout(fn, ms));
    };

    const send = useCallback((ids: number[]) => {
        ids.forEach((id, k) => {
            later(() => setItems((xs) => xs.map((x) => (x.id === id ? { ...x, status: "enviando" } : x))), k * 650);
            later(() => setItems((xs) => xs.map((x) => (x.id === id ? { ...x, status: "enviado" } : x))), k * 650 + 600);
        });
    }, []);

    const cobrar = () => {
        const p = PEOPLE[next.current % PEOPLE.length];
        const id = next.current++;
        setItems((xs) => [{ id, ...p, status: "guardado" as const }, ...xs].slice(0, 4));
        if (online) send([id]);
    };

    const toggle = () => {
        const on = !online;
        setOnline(on);
        if (on) send(items.filter((x) => x.status === "guardado").map((x) => x.id).reverse());
    };

    const guardados = items.filter((x) => x.status !== "enviado").length;
    const estado = !online
        ? guardados > 0
            ? `Sin conexión · ${guardados} ${guardados === 1 ? "guardado" : "guardados"}`
            : "Sin conexión"
        : guardados > 0
          ? "Enviando…"
          : "Todo enviado";

    return (
        <div className={s.offline}>
            <div className={s.offlineControls}>
                <button
                    type="button"
                    role="switch"
                    aria-checked={online}
                    className={s.switch}
                    onClick={toggle}
                >
                    <span className={s.switchTrack} aria-hidden="true">
                        <span className={s.switchThumb} />
                    </span>
                    <span>{online ? "Con señal" : "Sin señal"}</span>
                </button>
                <button type="button" className={s.primary} onClick={cobrar}>
                    Cobrar
                </button>
            </div>

            <div className={s.mini} data-online={online}>
                <div className={s.miniBar} aria-live="polite">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        {online ? (
                            <path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4 4 0 0 1-.5 8.5Z" />
                        ) : (
                            <>
                                <path d="M7 18a4.5 4.5 0 0 1-.6-8.96A6 6 0 0 1 18 9.5a4 4 0 0 1-.5 8.5Z" />
                                <path d="M4 4l16 16" />
                            </>
                        )}
                    </svg>
                    <span>{estado}</span>
                </div>
                <ul className={s.queue}>
                    {items.length === 0 && (
                        <li className={s.queueEmpty}>Estás sin señal, como en una vereda sin cobertura. Toca «Cobrar» una o dos veces y después prende la señal.</li>
                    )}
                    {items.map((x) => (
                        <li key={x.id} className={s.qItem} data-status={x.status}>
                            <span className={s.qIcon} aria-hidden="true">
                                {x.status === "enviado" ? (
                                    <svg viewBox="0 0 24 24">
                                        <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="8" />
                                        <path d="M12 8v4l2.5 2" />
                                    </svg>
                                )}
                            </span>
                            <span className={s.qText}>
                                <strong>{x.name}</strong>
                                <span>
                                    {x.status === "guardado"
                                        ? "Guardado en este teléfono"
                                        : x.status === "enviando"
                                          ? "Enviando…"
                                          : "Enviado una sola vez"}
                                </span>
                            </span>
                            <b>{peso(x.amount)}</b>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

/* ─── Tres roles, tres pantallas ─── */
const ROLES = [
    {
        id: "jefe",
        label: "Jefe",
        img: "alertas",
        alt: "Alertas del jefe: clientes atrasados y avisos de su equipo",
        points: [
            "Asigna clientes a cada cobrador y ve el avance del día.",
            "Recibe alertas: mora que crece, gastos fuera de lo normal, promesas sin cumplir.",
            "Aprueba préstamos y cambios antes de que cuenten.",
        ],
    },
    {
        id: "cobrador",
        label: "Cobrador",
        img: "rutas",
        alt: "Ruta del día ordenada por cercanía",
        points: [
            "Ve solo su cartera: nada de los clientes de otros.",
            "Ruta del día ordenada por cercanía.",
            "Cobra, registra visitas y cuadra su caja aunque no haya señal.",
        ],
    },
    {
        id: "cliente",
        label: "Cliente",
        img: "cliente",
        alt: "Vista del cliente con lo que falta por pagar y sus cuotas vencidas",
        points: [
            "Si el prestamista lo invita, consulta lo que debe y su plan de pagos.",
            "Avisa «Ya pagué» con una foto y recibe sus recibos.",
            "Nunca ve las notas internas ni la calificación que le pusieron.",
        ],
    },
];

export function RolesTabs() {
    const [i, setI] = useState(0);
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);
    const role = ROLES[i];

    const onKey = (e: KeyboardEvent) => {
        const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
        if (!step) return;
        e.preventDefault();
        const k = (i + step + ROLES.length) % ROLES.length;
        setI(k);
        tabs.current[k]?.focus();
    };

    return (
        <div className={s.roles}>
            <div
                role="tablist"
                aria-label="Roles de la app"
                className={s.segmented}
                style={{ ["--i" as string]: i }}
                onKeyDown={onKey}
            >
                <span className={s.segPill} aria-hidden="true" />
                {ROLES.map((r, k) => (
                    <button
                        key={r.id}
                        ref={(el) => {
                            tabs.current[k] = el;
                        }}
                        role="tab"
                        id={`rol-${r.id}`}
                        aria-selected={k === i}
                        aria-controls="rol-panel"
                        tabIndex={k === i ? 0 : -1}
                        onClick={() => setI(k)}
                    >
                        {r.label}
                    </button>
                ))}
            </div>
            <div role="tabpanel" id="rol-panel" aria-labelledby={`rol-${role.id}`} className={s.rolePanel}>
                <div className={s.phone} key={role.id}>
                    <Image src={`${IMG}${role.img}.webp`} alt={role.alt} fill sizes="(max-width: 700px) 64vw, 280px" className={s.screenStatic} />
                </div>
                <ul className={s.rolePoints} key={`p-${role.id}`}>
                    {role.points.map((p) => (
                        <li key={p}>{p}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

/* ─── Claro u oscuro: se arrastra la línea ─── */
export function CompareSlider() {
    const [pos, setPos] = useState(50);
    return (
        <div className={s.compare} style={{ ["--pos" as string]: `${pos}%` }}>
            <div className={s.compareFrame}>
                <Image src={`${IMG}agenda.webp`} alt="Agenda en modo claro" fill sizes="(max-width: 700px) 80vw, 340px" className={s.screenStatic} />
                <div className={s.compareTop}>
                    <Image src={`${IMG}oscuro.webp`} alt="La misma agenda en modo oscuro" fill sizes="(max-width: 700px) 80vw, 340px" className={s.screenStatic} />
                </div>
                <span className={s.compareLine} aria-hidden="true">
                    <span>⇆</span>
                </span>
            </div>
            <input
                type="range"
                min={0}
                max={100}
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                aria-label="Mover la línea entre modo oscuro y modo claro"
                className={s.compareRange}
            />
        </div>
    );
}
