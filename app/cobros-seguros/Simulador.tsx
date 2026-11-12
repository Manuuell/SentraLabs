"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import s from "./simulador.module.css";

/* Simulador de la app con capturas reales (siembra de prueba, sin clientes
   reales). Cada pantalla trae sus zonas táctiles en fracciones de la captura
   (1080 × 2340). Gestos: tocar, mantener presionado (350 ms, como la app),
   deslizar una tarjeta, desplazar la pantalla y el gesto de atrás de Android
   desde el borde izquierdo. Todo con transform/opacity. */

const SRC = "/images/projects/cobros-seguros/app/";
type Rect = [number, number, number, number]; // x, y, ancho, alto (0..1)
type Kind = "push" | "pop" | "sheet" | "replace" | "tab";

type Hot = {
    r: Rect;
    label: string;
    to?: string;
    kind?: Kind;
    /** Mensaje cuando la pantalla no está en la demo. */
    note?: string;
    hold?: boolean;
    back?: boolean;
    /** Evento para la lista de «qué probar». */
    done?: string;
    reset?: string;
};
type Swipe = {
    r: Rect;
    right: { label: string; color: string; to?: string; note?: string; done?: string };
    left: { label: string; color: string; to?: string; note?: string; done?: string };
};
type Screen = {
    img: string;
    alt: string;
    tall?: number;
    hots: Hot[];
    swipes?: Swipe[];
    /** Desplazar hacia arriba o abajo cambia a esta pantalla (la misma, más abajo). */
    down?: string;
    up?: string;
    hint: string;
    focus?: number | "swipe" | "scroll";
    overlay?: "recibo";
};

const TABS_COBRADOR = (current: string): Hot[] => [
    { r: [0.06, 0.9, 0.16, 0.06], label: "Clientes", note: "Clientes: la lista con buscador y filtros por estado." },
    { r: [0.23, 0.9, 0.16, 0.06], label: "Agenda", to: current === "agenda" ? undefined : "agenda", kind: "tab" },
    { r: [0.42, 0.9, 0.16, 0.06], label: "Inicio", note: "Inicio: lo cobrado, la meta del día y los clientes en riesgo." },
    { r: [0.59, 0.9, 0.16, 0.06], label: "Caja", to: current === "caja" ? undefined : "caja", kind: "tab", done: "caja" },
    { r: [0.77, 0.9, 0.16, 0.06], label: "Perfil", note: "Perfil: tema, letra grande, avisos y seguridad." },
];
const TABS_JEFE = (current: string): Hot[] => [
    { r: [0.06, 0.9, 0.16, 0.06], label: "Clientes", note: "Clientes de todo el equipo, con quién cobra a cada uno." },
    { r: [0.23, 0.9, 0.16, 0.06], label: "Equipo", to: current === "equipo" ? undefined : "mi-equipo", kind: "tab", done: "equipo" },
    { r: [0.42, 0.9, 0.16, 0.06], label: "Inicio", to: current === "alertas" ? undefined : "alertas-jefe", kind: "tab" },
    { r: [0.59, 0.9, 0.16, 0.06], label: "Reportes", note: "Reportes: cobros por día, mora y rendimiento de cada cobrador." },
    { r: [0.77, 0.9, 0.16, 0.06], label: "Perfil", note: "Perfil: datos del negocio, reglas de mora y seguridad." },
];

const BACK: Rect = [0.02, 0.065, 0.22, 0.05];

const SCREENS: Record<string, Screen> = {
    /* ── Cobrador ── */
    agenda: {
        img: "agenda",
        alt: "Agenda del día con tres clientes pendientes",
        hint: "Mantén presionada la tarjeta de Jorge Iván",
        focus: 1,
        hots: [
            { r: [0.56, 0.06, 0.12, 0.06], label: "Ruta del día", to: "rutas", kind: "push", done: "ruta" },
            { r: [0.17, 0.62, 0.79, 0.15], label: "Jorge Iván Torres (mantener presionado)", to: "hoja-acciones", kind: "sheet", hold: true, done: "hold" },
            { r: [0.77, 0.77, 0.18, 0.06], label: "Cobrar a Jorge Iván", to: "una-cuota-jorge", kind: "push" },
            { r: [0.17, 0.855, 0.79, 0.04], label: "Abrir el préstamo de Rosa Elena", to: "prestamo", kind: "push" },
            { r: [0.77, 0.535, 0.18, 0.06], label: "Cobrar a Luz Dary", note: "Luz Dary es el cobro sin señal: apaga la señal y tócala." },
            ...TABS_COBRADOR("agenda"),
        ],
        swipes: [
            {
                r: [0.175, 0.62, 0.785, 0.205],
                right: { label: "Cobrar", color: "#12b76a", to: "una-cuota-jorge", done: "swipe" },
                left: { label: "Visita", color: "#f59e0b", to: "hoja-acciones", done: "swipe" },
            },
        ],
    },
    "hoja-acciones": {
        img: "hoja-acciones",
        alt: "Hoja de acciones de la visita: cobrar ahora, prometió pagar, no encontrado",
        hint: "Toca «Cobrar ahora» o arrastra la hoja hacia abajo",
        focus: 0,
        hots: [
            { r: [0.06, 0.435, 0.9, 0.06], label: "Cobrar ahora", to: "una-cuota-jorge", kind: "push" },
            { r: [0.06, 0.505, 0.9, 0.06], label: "Prometió pagar", note: "Guarda la promesa con fecha; si no cumple, el jefe recibe una alerta." },
            { r: [0.06, 0.59, 0.9, 0.06], label: "No encontrado", note: "Queda la visita con hora y ubicación, sin cobro." },
            { r: [0.06, 0.85, 0.9, 0.06], label: "Mover las cuotas", note: "Reprograma las cuotas vencidas sin perder la mora." },
            { r: [0, 0, 1, 0.27], label: "Cerrar la hoja", back: true },
        ],
        down: "@back",
    },
    "una-cuota-jorge": {
        img: "una-cuota-jorge",
        alt: "Registrar cobro de una cuota a Jorge Iván",
        hint: "Toca «Revisar pago»",
        focus: 0,
        hots: [
            { r: [0.04, 0.915, 0.92, 0.055], label: "Revisar pago", to: "exito", kind: "sheet", done: "cobro" },
            { r: [0.03, 0.065, 0.14, 0.05], label: "Cerrar", back: true },
            { r: [0.12, 0.51, 0.12, 0.06], label: "Una cuota menos", note: "Ya está en una cuota." },
            { r: [0.77, 0.51, 0.12, 0.06], label: "Una cuota más", note: "Cada cuota cambia la frase: qué paga y qué sigue vencido." },
        ],
    },
    exito: {
        img: "exito",
        alt: "Pago registrado con el recibo R-2026-0214",
        hint: "Toca «Listo»",
        focus: 0,
        hots: [
            { r: [0.12, 0.845, 0.76, 0.05], label: "Listo", to: "agenda-gestionados", kind: "replace", reset: "agenda-gestionados" },
            { r: [0.12, 0.775, 0.76, 0.045], label: "Ver recibo", note: "El recibo sale como imagen con QR. Míralo cobrándole a Rosa Elena." },
            { r: [0.12, 0.715, 0.76, 0.045], label: "Compartir recibo", note: "Se comparte por WhatsApp como imagen, al instante." },
        ],
    },
    prestamo: {
        img: "prestamo",
        alt: "Préstamo #L007 de Rosa Elena con 5 cuotas vencidas",
        hint: "Toca «Registrar cobro»",
        focus: 0,
        hots: [
            { r: [0.04, 0.635, 0.47, 0.06], label: "Registrar cobro", to: "cobro-inicial", kind: "push" },
            { r: [0.53, 0.635, 0.43, 0.06], label: "Prestar más", note: "Prestar más muestra el resumen antes de aprobar." },
            { r: BACK, label: "Volver a la Agenda", back: true },
        ],
    },
    "cobro-inicial": {
        img: "cobro-inicial",
        alt: "Cobro por cuotas: 6 cuotas, ponerse al día, $ 330.000",
        hint: "Prueba el «−» o «Una cuota»; luego «Revisar pago»",
        focus: 2,
        hots: [
            { r: [0.1, 0.505, 0.14, 0.065], label: "Una cuota menos", to: "cuotas-3", kind: "replace", note: "Para la demo saltamos a 3 cuotas." },
            { r: [0.04, 0.595, 0.45, 0.06], label: "Una cuota", to: "cuotas-1", kind: "replace" },
            { r: [0.04, 0.91, 0.92, 0.055], label: "Revisar pago", to: "revision", kind: "sheet" },
            { r: [0.03, 0.065, 0.14, 0.05], label: "Cerrar", back: true },
        ],
    },
    "cuotas-1": stepper(1),
    "cuotas-2": stepper(2),
    "cuotas-3": stepper(3),
    "ponerse-al-dia": {
        ...stepper(6),
    },
    revision: {
        img: "revision",
        alt: "Revisa antes de guardar: $ 330.000, cuotas 1 a 6 de 10",
        hint: "Toca «Confirmar y guardar»",
        focus: 0,
        hots: [
            { r: [0.08, 0.89, 0.84, 0.045], label: "Confirmar y guardar", to: "recibo-imagen", kind: "push", done: "cuotas" },
            { r: [0.08, 0.82, 0.84, 0.045], label: "Corregir", back: true },
        ],
    },
    "recibo-imagen": {
        img: "recibo-imagen",
        alt: "Recibo de pago R-2026-0213 con QR, total pagado $ 330.000",
        tall: 2475 / 2340,
        hint: "Así le llega el recibo al cliente. Toca «Listo»",
        hots: [],
        overlay: "recibo",
    },
    "agenda-gestionados": {
        img: "agenda-gestionados",
        alt: "Agenda con 3 de 3 gestionados y 100 %",
        hint: "Día cerrado. Mira la Caja",
        focus: 4,
        hots: [{ r: [0.69, 0.06, 0.12, 0.06], label: "Ruta del día", to: "rutas", kind: "push", done: "ruta" }, ...TABS_COBRADOR("agenda")],
    },
    rutas: {
        img: "rutas",
        alt: "Ruta de hoy con 3 paradas ordenadas por cercanía",
        hint: "Baja con la flecha o arrastrando; para volver, desliza desde el borde izquierdo",
        focus: "scroll",
        down: "rutas-abajo",
        hots: [
            { r: [0.04, 0.135, 0.92, 0.065], label: "Abrir ruta en Google Maps", note: "Abre Google Maps con las 3 paradas en orden." },
            { r: [0, 0, 0.05, 1], label: "Atrás", back: true },
        ],
    },
    "rutas-abajo": {
        img: "rutas-abajo",
        alt: "Ruta de hoy, más abajo: paradas con su mora",
        hint: "Desliza desde el borde izquierdo para volver",
        up: "rutas",
        hots: [{ r: [0, 0, 0.05, 1], label: "Atrás", back: true }],
    },
    caja: {
        img: "caja",
        alt: "Caja de hoy: $ 627.638 recogidos, capital 59 % e interés 40 %",
        hint: "Baja con la flecha para ver la plata en tu poder",
        focus: "scroll",
        down: "caja-abajo",
        hots: [
            { r: [0.35, 0.125, 0.6, 0.05], label: "Historial y Negocio", note: "Historial de días y finanzas del negocio: se cambia deslizando a los lados." },
            { r: [0.74, 0.21, 0.22, 0.05], label: "Cerrar el día", note: "Cerrar la jornada: el jefe recibe el cuadre y la entrega." },
            ...TABS_COBRADOR("caja"),
        ],
    },
    "caja-abajo": {
        img: "caja-abajo",
        alt: "Caja más abajo: jornada en curso, kilómetros y visitas del día",
        hint: "Sube con la flecha",
        up: "caja",
        hots: [...TABS_COBRADOR("caja")],
    },

    /* ── Sin señal ── */
    "agenda-sin-senal": {
        img: "agenda-sin-senal",
        alt: "Agenda sin conexión: así estaba a las 6:53 p. m.",
        hint: "Toca el rayo de Luz Dary para cobrar sin señal",
        focus: 0,
        hots: [
            { r: [0.77, 0.6, 0.18, 0.05], label: "Cobrar a Luz Dary sin señal", to: "cobro-sin-senal", kind: "push" },
            ...TABS_COBRADOR("agenda").filter((h) => h.label !== "Caja"),
        ],
    },
    "cobro-sin-senal": {
        img: "cobro-sin-senal",
        alt: "Registrar cobro sin conexión: $ 168.133, cubre la mora y la cuota 1",
        hint: "Toca «Revisar pago»",
        focus: 0,
        hots: [{ r: [0.05, 0.455, 0.9, 0.06], label: "Revisar pago", to: "revision-sin-senal", kind: "sheet" }],
    },
    "revision-sin-senal": {
        img: "revision-sin-senal",
        alt: "Revisa antes de guardar, sin conexión",
        hint: "Toca «Confirmar y guardar»",
        focus: 0,
        hots: [
            { r: [0.08, 0.89, 0.84, 0.045], label: "Confirmar y guardar", to: "exito-sin-senal", kind: "sheet" },
            { r: [0.08, 0.82, 0.84, 0.045], label: "Corregir", back: true },
        ],
    },
    "exito-sin-senal": {
        img: "exito-sin-senal",
        alt: "Guardado en este teléfono: se envía solo cuando vuelva la señal",
        hint: "Toca «Listo»",
        focus: 0,
        hots: [{ r: [0.12, 0.875, 0.76, 0.06], label: "Listo", to: "agenda-1-guardado", kind: "replace", reset: "agenda-1-guardado", done: "offline-save" }],
    },
    "agenda-1-guardado": {
        img: "agenda-1-guardado",
        alt: "Agenda con «1 guardado · Sin conexión»",
        hint: "Ahora prende la señal con el interruptor",
        hots: [...TABS_COBRADOR("agenda").filter((h) => h.label !== "Caja")],
    },
    "al-dia": {
        img: "al-dia",
        alt: "Agenda con la señal de vuelta: todo enviado",
        hint: "Se envió una sola vez. Nadie lo registró dos veces",
        hots: [...TABS_COBRADOR("agenda")],
    },

    /* ── Jefe ── */
    "alertas-jefe": {
        img: "alertas-jefe",
        alt: "Alertas del jefe: promesas incumplidas y cuotas vencidas",
        hint: "Toca «Equipo» en la barra de abajo",
        focus: 1,
        hots: [
            { r: [0.04, 0.4, 0.92, 0.1], label: "Promesa incumplida de Nelson Iván", note: "Abre la ficha: quién lo cobra, qué prometió y desde cuándo." },
            ...TABS_JEFE("alertas"),
        ],
    },
    "mi-equipo": {
        img: "mi-equipo",
        alt: "Mi equipo: 3 trabajadores con sus clientes y préstamos",
        hint: "Desliza la fila de un trabajador o toca «+»",
        focus: "swipe",
        hots: [
            { r: [0.7, 0.06, 0.12, 0.06], label: "Agregar trabajador", to: "agregar-trabajador", kind: "sheet", done: "invitar" },
            { r: [0.04, 0.53, 0.92, 0.13], label: "Trabajador Prueba (mantener presionado)", hold: true, note: "Menú: ver reporte, reasignar clientes o expulsar.", done: "hold-jefe" },
            ...TABS_JEFE("equipo"),
        ],
        swipes: [
            {
                r: [0.04, 0.39, 0.92, 0.13],
                right: { label: "Ver perfil", color: "#3d7bff", note: "Perfil del trabajador: cobros, visitas y su caja del día.", done: "swipe-jefe" },
                left: { label: "Reasignar", color: "#f59e0b", note: "Pasa sus clientes a otro trabajador, eligiendo a quién.", done: "swipe-jefe" },
            },
        ],
    },
    "agregar-trabajador": {
        img: "agregar-trabajador",
        alt: "Agregar trabajador con el código SUP-AH4C",
        hint: "Toca «Enviar invitación» o cierra la hoja",
        focus: 0,
        hots: [
            { r: [0.08, 0.855, 0.84, 0.05], label: "Enviar invitación", note: "Se comparte el código por WhatsApp; el trabajador entra con él." },
            { r: [0, 0, 1, 0.36], label: "Cerrar la hoja", back: true },
        ],
        down: "@back",
    },

    /* ── Cliente ── */
    "cliente-cuenta": {
        img: "cliente-cuenta",
        alt: "Cuenta del cliente: falta por pagar $ 521.027 y 12 cuotas vencidas",
        hint: "Toca «Ver plan de pagos»",
        focus: 0,
        hots: [
            { r: [0.58, 0.835, 0.38, 0.045], label: "Ver plan de pagos", to: "cliente-plan", kind: "push", done: "plan" },
            { r: BACK, label: "Inicio", note: "Inicio del cliente: todas sus cuentas con cada prestamista." },
        ],
    },
    "cliente-plan": {
        img: "cliente-plan",
        alt: "Plan de pagos del cliente con «¿Ya pagaste? Avísale»",
        hint: "Toca «¿Ya pagaste? Avísale»",
        focus: 0,
        hots: [
            { r: [0.03, 0.47, 0.94, 0.11], label: "¿Ya pagaste? Avísale", to: "cliente-avisar", kind: "push", done: "avisar" },
            { r: BACK, label: "Volver", back: true },
        ],
    },
    "cliente-avisar": {
        img: "cliente-avisar",
        alt: "Avisar que ya pagué: monto, medio de pago y foto del comprobante",
        hint: "Toca «Enviar aviso»",
        focus: 0,
        hots: [
            { r: [0.03, 0.925, 0.94, 0.05], label: "Enviar aviso", note: "Aviso enviado: tu prestamista lo confirma y te llega el recibo.", done: "aviso" },
            { r: BACK, label: "Volver", back: true },
        ],
    },
};

function stepper(n: 1 | 2 | 3 | 6): Screen {
    const id = n === 6 ? "ponerse-al-dia" : `cuotas-${n}`;
    const prev = n === 6 ? "cuotas-3" : n > 1 ? `cuotas-${n - 1}` : undefined;
    const next = n === 3 ? "ponerse-al-dia" : n < 3 ? `cuotas-${n + 1}` : undefined;
    return {
        img: id,
        alt: `Cobro por cuotas con ${n} ${n === 1 ? "cuota" : "cuotas"}`,
        hint: n === 6 ? "Toca «Revisar pago»" : "Usa «+» y «−»: la frase dice qué queda pagado",
        focus: n === 6 ? 2 : 1,
        hots: [
            { r: [0.1, 0.505, 0.14, 0.065], label: "Una cuota menos", to: prev, kind: "replace", note: prev ? undefined : "Mínimo una cuota." },
            { r: [0.76, 0.505, 0.14, 0.065], label: "Una cuota más", to: next, kind: "replace", note: next ? undefined : "Ya cubre todo lo vencido." },
            n === 6
                ? { r: [0.04, 0.91, 0.92, 0.055], label: "Revisar pago", to: "revision", kind: "sheet" }
                : { r: [0.04, 0.91, 0.92, 0.055], label: "Revisar pago", note: "En la demo se revisa el pago completo: toca «Ponerse al día»." },
            { r: [0.04, 0.595, 0.45, 0.06], label: "Una cuota", to: n === 1 ? undefined : "cuotas-1", kind: "replace" },
            { r: [0.51, 0.595, 0.45, 0.06], label: "Ponerse al día", to: n === 6 ? undefined : "ponerse-al-dia", kind: "replace" },
            { r: [0.03, 0.065, 0.14, 0.05], label: "Cerrar", back: true },
        ],
    };
}

const ROLES = {
    cobrador: {
        label: "Cobrador",
        start: "agenda",
        tasks: [
            { id: "hold", text: "Mantén presionada una tarjeta" },
            { id: "swipe", text: "Desliza la tarjeta de Jorge Iván" },
            { id: "cuotas", text: "Cobra a Rosa Elena por cuotas" },
            { id: "offline-save", text: "Cobra sin señal" },
            { id: "sync", text: "Prende la señal y mira que sube" },
            { id: "ruta", text: "Abre la ruta del día" },
            { id: "caja", text: "Revisa la Caja" },
        ],
    },
    jefe: {
        label: "Jefe",
        start: "alertas-jefe",
        tasks: [
            { id: "equipo", text: "Abre tu equipo" },
            { id: "swipe-jefe", text: "Desliza la fila de un trabajador" },
            { id: "hold-jefe", text: "Mantén presionado un trabajador" },
            { id: "invitar", text: "Invita a un trabajador" },
        ],
    },
    cliente: {
        label: "Cliente",
        start: "cliente-cuenta",
        tasks: [
            { id: "plan", text: "Mira tu plan de pagos" },
            { id: "avisar", text: "Abre «Ya pagué»" },
            { id: "aviso", text: "Envía el aviso con el comprobante" },
        ],
    },
} as const;
type Role = keyof typeof ROLES;

const DUR: Record<Kind, number> = { push: 420, pop: 380, sheet: 460, replace: 160, tab: 200 };

export function Simulador() {
    const [role, setRole] = useState<Role>("cobrador");
    const [stack, setStack] = useState<string[]>(["agenda"]);
    const [anim, setAnim] = useState<{ from: string; kind: Kind } | null>(null);
    const [online, setOnline] = useState(true);
    const [done, setDone] = useState<Set<string>>(new Set());
    const [note, setNote] = useState<{ text: string; id: number } | null>(null);
    const [syncing, setSyncing] = useState(false);
    const [ring, setRing] = useState<{ x: number; y: number; id: number } | null>(null);
    const [drag, setDrag] = useState<{ i: number; dx: number } | null>(null);
    const [pull, setPull] = useState(0);
    const [debug, setDebug] = useState(false);
    useEffect(() => setDebug(new URLSearchParams(window.location.search).has("debug")), []);
    const [edge, setEdge] = useState(0);
    const screenRef = useRef<HTMLDivElement>(null);
    const gesture = useRef<{
        x: number;
        y: number;
        t: number;
        mode: "none" | "swipe" | "scroll" | "edge" | "hold";
        swipe?: number;
        holdTimer?: number;
        consumed?: boolean;
    } | null>(null);
    const suppressClick = useRef(false);
    const timers = useRef<number[]>([]);

    const current = stack[stack.length - 1];
    const screen = SCREENS[current];

    useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);
    const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

    /* Precarga de las pantallas a las que se puede ir desde aquí, solo cuando el
       simulador está cerca de verse (la primera carga de la página queda liviana). */
    const [near, setNear] = useState(false);
    useEffect(() => {
        const el = screenRef.current;
        if (!el) return;
        const io = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "600px 0px" });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    useEffect(() => {
        if (!near) return;
        const next = new Set<string>();
        screen.hots.forEach((h) => h.to && next.add(h.to));
        screen.swipes?.forEach((w) => {
            if (w.right.to) next.add(w.right.to);
            if (w.left.to) next.add(w.left.to);
        });
        if (screen.down && screen.down !== "@back") next.add(screen.down);
        if (current === "agenda") next.add("agenda-sin-senal");
        next.forEach((id) => {
            const img = new Image();
            img.src = `${SRC}${SCREENS[id].img}.webp`;
        });
    }, [current, screen, near]);

    const mark = useCallback((id?: string) => {
        if (!id) return;
        setDone((d) => (d.has(id) ? d : new Set(d).add(id)));
    }, []);

    const toast = useCallback((text: string) => setNote({ text, id: Date.now() }), []);
    useEffect(() => {
        if (!note) return;
        const t = window.setTimeout(() => setNote(null), 2600);
        return () => window.clearTimeout(t);
    }, [note]);

    /* Con la señal apagada, la Agenda es la de «Sin conexión». */
    const mapOffline = useCallback(
        (id: string, on: boolean) => {
            if (!on && id === "agenda") return "agenda-sin-senal";
            if (on && id === "agenda-sin-senal") return "agenda";
            return id;
        },
        [],
    );

    const go = useCallback(
        (to: string, kind: Kind, reset?: string) => {
            const target = mapOffline(to, online);
            setAnim({ from: current, kind });
            if (reset) setStack([mapOffline(reset, online)]);
            else if (kind === "tab") setStack([target]);
            else if (kind === "replace") setStack((st) => [...st.slice(0, -1), target]);
            else setStack((st) => [...st, target]);
            later(() => setAnim(null), DUR[kind]);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [current, online, mapOffline],
    );

    const back = useCallback(() => {
        if (stack.length < 2) {
            toast("Esta es la pantalla principal.");
            return;
        }
        setAnim({ from: current, kind: "pop" });
        setStack((st) => st.slice(0, -1));
        later(() => setAnim(null), DUR.pop);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stack.length, current, toast]);

    const activate = (h: Hot) => {
        mark(h.done);
        if (h.back) return back();
        if (h.to) return go(h.to, h.kind ?? "push", h.reset);
        if (h.note) toast(h.note);
    };

    const switchRole = (r: Role) => {
        setRole(r);
        setStack([r === "cobrador" ? mapOffline("agenda", online) : ROLES[r].start]);
        setAnim(null);
    };

    const toggleSignal = () => {
        const on = !online;
        setOnline(on);
        if (role !== "cobrador") return;
        if (!on && current === "agenda") setStack((st) => [...st.slice(0, -1), "agenda-sin-senal"]);
        if (on && current === "agenda-sin-senal") setStack((st) => [...st.slice(0, -1), "agenda"]);
    };

    /* Con la señal de vuelta, lo guardado sale solo (una vez). */
    useEffect(() => {
        if (!online || current !== "agenda-1-guardado") return;
        setSyncing(true);
        const t1 = window.setTimeout(() => {
            setSyncing(false);
            setAnim({ from: "agenda-1-guardado", kind: "replace" });
            setStack(["al-dia"]);
            mark("sync");
        }, 1400);
        const t2 = window.setTimeout(() => setAnim(null), 1800);
        return () => {
            window.clearTimeout(t1);
            window.clearTimeout(t2);
        };
    }, [online, current, mark]);

    /* ─── Gestos ─── */
    const rel = (e: RPointerEvent) => {
        const r = screenRef.current!.getBoundingClientRect();
        return { fx: (e.clientX - r.left) / r.width, fy: (e.clientY - r.top) / r.height, w: r.width, h: r.height };
    };
    const inRect = (fx: number, fy: number, [x, y, w, h]: Rect) => fx >= x && fx <= x + w && fy >= y && fy <= y + h;

    const onDown = (e: RPointerEvent) => {
        if (anim) return;
        const { fx, fy } = rel(e);
        const g: NonNullable<typeof gesture.current> = { x: e.clientX, y: e.clientY, t: Date.now(), mode: "none" };
        gesture.current = g;
        suppressClick.current = false;
        const hold = screen.hots.find((h) => h.hold && inRect(fx, fy, h.r));
        if (hold) {
            g.holdTimer = window.setTimeout(() => {
                if (gesture.current !== g || g.mode !== "none") return;
                g.mode = "hold";
                g.consumed = true;
                suppressClick.current = true;
                navigator.vibrate?.(12);
                activate(hold);
            }, 350);
            setRing({ x: fx, y: fy, id: Date.now() });
        }
    };

    const onMove = (e: RPointerEvent) => {
        const g = gesture.current;
        if (!g || g.consumed) return;
        const dx = e.clientX - g.x;
        const dy = e.clientY - g.y;
        const { fx, fy, w } = rel(e);
        if (g.mode === "none" && Math.hypot(dx, dy) > 8) {
            window.clearTimeout(g.holdTimer);
            setRing(null);
            const startFx = fx - dx / w;
            const startFy = fy - dy / rel(e).h;
            if (Math.abs(dx) > Math.abs(dy)) {
                const i = screen.swipes?.findIndex((sw) => inRect(startFx, startFy, sw.r)) ?? -1;
                if (startFx < 0.07 && dx > 0) g.mode = "edge";
                else if (i >= 0) {
                    g.mode = "swipe";
                    g.swipe = i;
                } else if (startFx < 0.15 && dx > 0) g.mode = "edge";
            } else if (screen.down || screen.up) g.mode = "scroll";
            if (g.mode !== "none") {
                suppressClick.current = true;
                (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
            }
        }
        if (g.mode === "swipe") setDrag({ i: g.swipe!, dx: Math.max(-w * 0.5, Math.min(w * 0.5, dx)) });
        if (g.mode === "scroll") setPull(Math.max(-140, Math.min(140, dy)));
        if (g.mode === "edge") setEdge(Math.max(0, Math.min(w * 0.4, dx)));
    };

    /* Si el navegador se queda con el gesto (desplazar la página), se suelta todo. */
    const onCancel = () => {
        const g = gesture.current;
        gesture.current = null;
        if (g) window.clearTimeout(g.holdTimer);
        setRing(null);
        setDrag(null);
        setPull(0);
        setEdge(0);
    };

    const onUp = (e: RPointerEvent) => {
        const g = gesture.current;
        gesture.current = null;
        setRing(null);
        /* El clic que sigue a un gesto se descarta; después, la bandera se apaga
           para que el teclado y el siguiente toque funcionen. */
        window.setTimeout(() => (suppressClick.current = false), 0);
        if (!g) return;
        window.clearTimeout(g.holdTimer);
        const w = screenRef.current!.getBoundingClientRect().width;
        const dx = e.clientX - g.x;
        const dy = e.clientY - g.y;
        if (g.mode === "swipe" && g.swipe !== undefined) {
            const sw = screen.swipes![g.swipe];
            setDrag(null);
            if (Math.abs(dx) > w * 0.22) {
                const side = dx > 0 ? sw.right : sw.left;
                mark(side.done);
                if (side.to) go(side.to, side.to === "hoja-acciones" ? "sheet" : "push");
                else if (side.note) toast(side.note);
            }
        } else if (g.mode === "scroll") {
            setPull(0);
            if (dy < -50 && screen.down) {
                if (screen.down === "@back") return;
                go(screen.down, "replace");
            } else if (dy > 50 && screen.up) go(screen.up, "replace");
            else if (dy > 70 && screen.down === "@back") back();
        } else if (g.mode === "edge") {
            setEdge(0);
            if (dx > w * 0.18) back();
        }
    };

    /* Arrastrar una hoja hacia abajo la cierra (down: "@back"). */
    const sheetDrag = screen.down === "@back";

    const focus = screen.focus;
    const focusHot = typeof focus === "number" ? screen.hots[focus] : undefined;
    const tasks = ROLES[role].tasks;
    const doneCount = tasks.filter((t) => done.has(t.id)).length;

    const layer = (id: string, cls: string, active: boolean) => {
        const sc = SCREENS[id];
        return (
            <div className={`${s.layer} ${cls}`} key={`${id}-${active ? "cur" : "from"}`} aria-hidden={!active}>
                <img
                    src={`${SRC}${sc.img}.webp`}
                    alt={active ? sc.alt : ""}
                    width={720}
                    height={Math.round(1560 * (sc.tall ?? 1))}
                    className={s.shot}
                    draggable={false}
                    decoding="async"
                    loading="lazy"
                />
            </div>
        );
    };

    const animCls = anim ? s[`in_${anim.kind}` as "in_push"] : "";
    const fromCls = anim ? s[`out_${anim.kind}` as "out_push"] : "";

    const steps = useMemo(() => tasks.map((t) => ({ ...t, ok: done.has(t.id) })), [tasks, done]);

    return (
        <div className={s.sim}>
            <div className={s.side}>
                <div role="tablist" aria-label="Elige un rol" className={s.roles} style={{ ["--i" as string]: Object.keys(ROLES).indexOf(role) }}>
                    <span className={s.rolePill} aria-hidden="true" />
                    {(Object.keys(ROLES) as Role[]).map((r) => (
                        <button key={r} role="tab" aria-selected={r === role} onClick={() => switchRole(r)}>
                            {ROLES[r].label}
                        </button>
                    ))}
                </div>

                <p className={s.hint} aria-live="polite" key={`${current}-hint`}>
                    <span className={s.hintIcon} aria-hidden="true">
                        <svg viewBox="0 0 24 24">
                            <path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0v3.5a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7l-2.3-3.6a1.5 1.5 0 0 1 2.5-1.6L9 13" />
                        </svg>
                    </span>
                    {screen.hint}
                </p>

                <div className={s.tasks}>
                    <div className={s.tasksHead}>
                        <span>Qué probar</span>
                        <span>
                            {doneCount}/{tasks.length}
                        </span>
                    </div>
                    <div className={s.progress} aria-hidden="true">
                        <span style={{ transform: `scaleX(${doneCount / tasks.length})` }} />
                    </div>
                    <ul>
                        {steps.map((t) => (
                            <li key={t.id} data-ok={t.ok}>
                                <span className={s.check} aria-hidden="true">
                                    <svg viewBox="0 0 24 24">
                                        <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} />
                                    </svg>
                                </span>
                                {t.text}
                                {t.ok && <span className={s.sr}> (hecho)</span>}
                            </li>
                        ))}
                    </ul>
                </div>

                {role === "cobrador" && (
                    <button type="button" role="switch" aria-checked={online} className={s.signal} onClick={toggleSignal}>
                        <span className={s.track} aria-hidden="true">
                            <span className={s.thumb} />
                        </span>
                        <span>
                            <b>{online ? "Con señal" : "Sin señal"}</b>
                            <small>{online ? "Apágala para cobrar como en una vereda" : "Lo que cobres se guarda en el teléfono"}</small>
                        </span>
                    </button>
                )}

                <button type="button" className={s.restart} onClick={() => switchRole(role)}>
                    Volver a empezar
                </button>
            </div>

            <div className={s.device}>
                <div className={s.phone}>
                    <div
                        ref={screenRef}
                        className={`${s.screen} ${debug ? s.debug : ""}`}
                        onPointerDown={onDown}
                        onPointerMove={onMove}
                        onPointerUp={onUp}
                        onPointerCancel={onCancel}
                        onClickCapture={(e) => {
                            if (suppressClick.current) {
                                e.stopPropagation();
                                e.preventDefault();
                                suppressClick.current = false;
                            }
                        }}
                        style={{
                            ["--pull" as string]: `${sheetDrag ? Math.max(0, pull) : pull * 0.35}px`,
                            ["--edge" as string]: `${edge}px`,
                        }}
                    >
                        <div className={`${s.stage} ${sheetDrag ? s.stageSheet : ""}`}>
                            {anim && layer(anim.from, `${s.from} ${fromCls}`, false)}
                            {layer(current, `${s.cur} ${animCls}`, true)}
                        </div>

                        {/* Tarjetas que se deslizan: un recorte de la misma captura encima de su acción. */}
                        {!anim &&
                            screen.swipes?.map((sw, i) => {
                                const [x, y, w, h] = sw.r;
                                const dx = drag?.i === i ? drag.dx : 0;
                                const side = dx >= 0 ? sw.right : sw.left;
                                return (
                                    <div
                                        key={i}
                                        className={s.swipeWrap}
                                        style={{ left: `${x * 100}%`, top: `${y * 100}%`, width: `${w * 100}%`, height: `${h * 100}%` }}
                                        aria-hidden="true"
                                    >
                                        <div className={s.swipeAction} style={{ background: side.color, justifyContent: dx >= 0 ? "flex-start" : "flex-end", opacity: dx ? 1 : 0 }}>
                                            <span>{side.label}</span>
                                        </div>
                                        <div
                                            className={`${s.swipeCard} ${drag?.i === i ? s.dragging : ""}`}
                                            style={{
                                                backgroundImage: `url(${SRC}${screen.img}.webp)`,
                                                backgroundSize: `${100 / w}% auto`,
                                                backgroundPosition: `${(x / (1 - w)) * 100}% ${(y / (1 - h)) * 100}%`,
                                                transform: `translateX(${dx}px)`,
                                            }}
                                        />
                                    </div>
                                );
                            })}

                        {/* Zonas táctiles: botones de verdad (teclado y lector de pantalla). */}
                        {!anim &&
                            screen.hots.map((h, i) => (
                                <button
                                    key={`${current}-${i}`}
                                    type="button"
                                    className={s.hot}
                                    style={{ left: `${h.r[0] * 100}%`, top: `${h.r[1] * 100}%`, width: `${h.r[2] * 100}%`, height: `${h.r[3] * 100}%` }}
                                    aria-label={h.label}
                                    onClick={() => (h.hold ? toast("Mantén presionado un momento, como en la app.") : activate(h))}
                                    onKeyDown={(e) => {
                                        if (h.hold && (e.key === "Enter" || e.key === " ")) {
                                            e.preventDefault();
                                            activate(h);
                                        }
                                    }}
                                />
                            ))}

                        {/* Pista: dónde tocar, deslizar o desplazar. */}
                        {!anim && focusHot && (
                            <span
                                className={`${s.finger} ${focusHot.hold ? s.fingerHold : ""}`}
                                style={{ left: `${(focusHot.r[0] + focusHot.r[2] / 2) * 100}%`, top: `${(focusHot.r[1] + focusHot.r[3] / 2) * 100}%` }}
                                aria-hidden="true"
                                key={`f-${current}`}
                            />
                        )}
                        {!anim && focus === "swipe" && screen.swipes?.[0] && (
                            <span
                                className={`${s.finger} ${s.fingerSwipe}`}
                                style={{ left: `${(screen.swipes[0].r[0] + 0.25) * 100}%`, top: `${(screen.swipes[0].r[1] + screen.swipes[0].r[3] / 2) * 100}%` }}
                                aria-hidden="true"
                            />
                        )}
                        {!anim && focus === "scroll" && <span className={`${s.finger} ${s.fingerScroll}`} style={{ left: "50%", top: "62%" }} aria-hidden="true" />}

                        {/* En el teléfono el dedo desplaza la página: para bajar dentro de una pantalla hay flecha. */}
                        {!anim && screen.down && screen.down !== "@back" && (
                            <button type="button" className={s.scrollBtn} aria-label="Bajar en la pantalla" onClick={() => go(screen.down!, "replace")}>
                                <span aria-hidden="true">↓</span>
                            </button>
                        )}
                        {!anim && screen.up && (
                            <button type="button" className={s.scrollBtn} aria-label="Subir en la pantalla" onClick={() => go(screen.up!, "replace")}>
                                <span aria-hidden="true">↑</span>
                            </button>
                        )}

                        {ring && <span className={s.ring} key={ring.id} style={{ left: `${ring.x * 100}%`, top: `${ring.y * 100}%` }} aria-hidden="true" />}

                        {edge > 0 && (
                            <span className={s.edgeArrow} style={{ transform: `translate(${edge * 0.5 - 30}px, -50%)`, opacity: Math.min(1, edge / 60) }} aria-hidden="true">
                                ‹
                            </span>
                        )}

                        {current === "recibo-imagen" && !anim && (
                            <div className={s.reciboBar}>
                                <span className={s.reciboToast}>
                                    <svg viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M5 12.5l4.5 4.5L19 7.5" pathLength={1} />
                                    </svg>
                                    ¡Pago registrado! $ 330.000
                                </span>
                                <button type="button" onClick={() => go("agenda-gestionados", "replace", "agenda-gestionados")}>
                                    Listo
                                </button>
                            </div>
                        )}

                        {syncing && (
                            <div className={s.syncBar} role="status">
                                <span className={s.spinner} aria-hidden="true" /> Enviando 1 cobro…
                            </div>
                        )}

                        {note && (
                            <div className={s.note} key={note.id} role="status">
                                {note.text}
                            </div>
                        )}
                    </div>
                </div>
                <p className={s.caption}>Capturas reales de la app con datos de muestra.</p>
            </div>
        </div>
    );
}
