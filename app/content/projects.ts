import type { Lang } from "../i18n/dictionaries";

/**
 * Fuente unica de los proyectos: la usan el escaparate y la escena 3D del
 * hero. Cuando lleguen grabaciones de pantalla se agregan aqui sin tocar los
 * componentes.
 */

/** En que dispositivo se muestra: una app movil o una pagina web. */
export type Device = "phone" | "web";

export interface Project {
    id: string;
    name: string;
    device: Device;
    /** Logo cuadrado; si no hay, se dibuja un monograma con `accent`. */
    logo: string | null;
    /** Fondo de tesela para logos transparentes que no se leen sobre oscuro. */
    logoBg?: string;
    monogram: string;
    accent: string;
    /** Fondo de la pantalla de inicio cuando no hay capturas. */
    splash: { from: string; to: string };
    /**
     * Capturas. App: pantallas del telefono (1080 × 2400 o similar).
     * Web: la primera es la de escritorio (16:10) y la segunda la de movil.
     */
    screens: string[];
    /** Solo sitios en vivo con dominio propio: nunca enlaces al codigo. */
    links: { kind: "site"; href: string }[];
    /** Destacado: va en las pestanas del escaparate con sus capturas. */
    featured?: boolean;
    text: Record<Lang, { tagline: string; desc: string; facts: string[] }>;
}

export const projects: Project[] = [
    {
        id: "transcar",
        name: "TransCar",
        featured: true,
        device: "phone",
        logo: "/images/projects/transcar-logo.webp",
        monogram: "T",
        accent: "#f59e0b",
        splash: { from: "#1f2b4d", to: "#2e3d6b" },
        screens: [
            "/images/projects/transcar/transcar-app-inicio.webp",
            "/images/projects/transcar/transcar-app-mapa.webp",
            "/images/projects/transcar/transcar-app-ruta.webp",
        ],
        links: [],
        text: {
            es: {
                tagline: "Transporte urbano en Cartagena",
                desc: "App para el sistema TransCaribe: mapa de los buses en tiempo real, tiempos de llegada calculados con datos de tráfico, recarga de la tarjeta desde el celular, membresía premium y un chatbot con IA que resuelve dudas de rutas y saldo.",
                facts: ["En beta con usuarios reales", "Cartagena · TransCaribe"],
            },
            en: {
                tagline: "Public transit in Cartagena",
                desc: "App for the TransCaribe system: real-time bus map, arrival times calculated with traffic data, card top-ups from your phone, a premium membership and an AI chatbot that answers route and balance questions.",
                facts: ["In beta with real users", "Cartagena · TransCaribe"],
            },
        },
    },
    {
        id: "malecon",
        name: "Malecón Business Center",
        featured: true,
        device: "web",
        logo: "/images/projects/logos/malecon.webp",
        monogram: "M",
        accent: "#c9a45c",
        splash: { from: "#14213d", to: "#1d2d52" },
        screens: [
            "/images/projects/malecon/malecon-web-escritorio.webp",
            "/images/projects/malecon/malecon-web-movil.webp",
        ],
        links: [{ kind: "site", href: "https://www.maleconbusiness.com" }],
        text: {
            es: {
                tagline: "Oficinas frente al mar en Cartagena",
                desc: "Sitio web para un edificio de oficinas y locales de lujo en Marbella, Cartagena: el proyecto, galería, ubicación, amenidades y plantas, con un registro de interesados conectado a Google Sheets.",
                facts: ["En producción · maleconbusiness.com"],
            },
            en: {
                tagline: "Seaside offices in Cartagena",
                desc: "Website for a building of luxury offices and retail spaces in Marbella, Cartagena: the project, gallery, location, amenities and floor plans, with a lead sign-up connected to Google Sheets.",
                facts: ["Live · maleconbusiness.com"],
            },
        },
    },
    {
        id: "conceptos",
        name: "Fundación Conceptos",
        featured: true,
        device: "web",
        logo: "/images/projects/logos/conceptos.webp",
        logoBg: "#ffffff",
        monogram: "C",
        accent: "#e5187e",
        splash: { from: "#1b1e26", to: "#2a2f3b" },
        screens: [
            "/images/projects/conceptos/conceptos-web-escritorio.webp",
            "/images/projects/conceptos/conceptos-web-movil.webp",
        ],
        links: [{ kind: "site", href: "https://funconceptos.org" }],
        text: {
            es: {
                tagline: "Sitio institucional de la fundación",
                desc: "Sitio web de la Fundación Conceptos, construido con Astro como sitio estático: carga rápida, sin servidor ni base de datos y fácil de alojar.",
                facts: ["En producción · funconceptos.org"],
            },
            en: {
                tagline: "The foundation's website",
                desc: "Website for Fundación Conceptos, built with Astro as a static site: fast to load, no server or database, and easy to host.",
                facts: ["Live · funconceptos.org"],
            },
        },
    },
    {
        id: "mundo-te-busca",
        name: "El Mundo Te Busca",
        featured: true,
        device: "web",
        logo: "/images/projects/logos/mundo-te-busca.webp",
        logoBg: "#ffffff",
        monogram: "E",
        accent: "#f59e0b",
        splash: { from: "#13182b", to: "#1f2742" },
        screens: [
            "/images/projects/mundo-te-busca/mundo-te-busca-web-escritorio.webp",
            "/images/projects/mundo-te-busca/mundo-te-busca-web-movil.webp",
        ],
        links: [{ kind: "site", href: "https://elmundotebusca.com" }],
        text: {
            es: {
                tagline: "Búsqueda de personas desaparecidas",
                desc: "Plataforma ciudadana, gratuita y sin fines de lucro para localizar personas desaparecidas y coordinar ayuda ante emergencias, con web y app móvil.",
                facts: ["Sin fines de lucro"],
            },
            en: {
                tagline: "Missing persons search",
                desc: "Free, non-profit citizen platform to locate missing people and coordinate help during emergencies, with a website and a mobile app.",
                facts: ["Non-profit"],
            },
        },
    },
    {
        id: "marsec",
        name: "MarSec",
        device: "phone",
        logo: "/images/projects/marsec-logo.webp",
        monogram: "M",
        accent: "#38bdf8",
        splash: { from: "#0b1736", to: "#13254f" },
        screens: [
            "/images/projects/marsec/marsec-app-pantalla-1.webp",
            "/images/projects/marsec/marsec-app-pantalla-2.webp",
            "/images/projects/marsec/marsec-app-pantalla-3.webp",
        ],
        links: [],
        text: {
            es: {
                tagline: "Ciberseguridad para embarcaciones",
                desc: "Plataforma de formación en ciberseguridad para tripulaciones: lecciones interactivas, cuestionarios y “Capitán Ciber”, un asistente virtual con IA.",
                facts: ["Mejor Proyecto TalentoTech 2025"],
            },
            en: {
                tagline: "Cybersecurity for vessels",
                desc: "Cybersecurity training platform for crews: interactive lessons, quizzes and “Capitán Ciber”, an AI virtual assistant.",
                facts: ["Best Project, TalentoTech 2025"],
            },
        },
    },
    {
        id: "ecoone",
        name: "EcoOne",
        device: "phone",
        logo: null,
        monogram: "E",
        accent: "#22c55e",
        splash: { from: "#0c1f14", to: "#14331f" },
        screens: [
            "/images/projects/ecoone/ecoone-app-pantalla-1.webp",
            "/images/projects/ecoone/ecoone-app-pantalla-2.webp",
            "/images/projects/ecoone/ecoone-app-pantalla-3.webp",
        ],
        links: [],
        text: {
            es: {
                tagline: "Reciclaje con recompensas",
                desc: "App multiplataforma que incentiva el reciclaje urbano con EcoCoins, una moneda digital ecológica. Conecta ciudadanos, operadores, comercios y administradores, con chatbot de IA, códigos QR, billetera digital y mapa de centros.",
                facts: ["EcoCoins y billetera digital", "Chatbot con IA"],
            },
            en: {
                tagline: "Recycling with rewards",
                desc: "Cross-platform app that rewards urban recycling with EcoCoins, an eco-friendly digital currency. It connects citizens, operators, shops and admins, with an AI chatbot, QR codes, a digital wallet and a map of drop-off points.",
                facts: ["EcoCoins and digital wallet", "AI chatbot"],
            },
        },
    },
    {
        id: "innvita",
        name: "Innvita",
        device: "web",
        logo: "/images/projects/logos/innvita.webp",
        logoBg: "#ffffff",
        monogram: "I",
        accent: "#16a34a",
        splash: { from: "#14201a", to: "#1f2f26" },
        screens: [
            "/images/projects/innvita/innvita-web-escritorio.webp",
            "/images/projects/innvita/innvita-web-movil.webp",
        ],
        links: [],
        text: {
            es: {
                tagline: "Cartelera de eventos",
                desc: "Cartelera de eventos comunitaria para la Fundación Conceptos: publicación de eventos, mapa con su ubicación y avisos por correo.",
                facts: ["Para la Fundación Conceptos"],
            },
            en: {
                tagline: "Events board",
                desc: "Community events board for Fundación Conceptos: event listings, a map with each location and email notifications.",
                facts: ["For Fundación Conceptos"],
            },
        },
    },
    {
        id: "qubi",
        name: "Qubi",
        device: "web",
        logo: "/images/projects/logos/qubi.webp",
        monogram: "Q",
        accent: "#a78bfa",
        splash: { from: "#16131f", to: "#241d36" },
        screens: [],
        links: [],
        text: {
            es: {
                tagline: "Agenda de equipo",
                desc: "Agenda gratuita para organizar el trabajo por proyectos: equipos, tareas asignadas a sus miembros, un tablero para seguir su estado y registro de horas, con inicio de sesión con Google.",
                facts: ["Gratuita"],
            },
            en: {
                tagline: "Team planner",
                desc: "Free planner to organize work by project: teams, tasks assigned to members, a board to track their status and time tracking, with Google sign-in.",
                facts: ["Free"],
            },
        },
    },
    {
        id: "sentrawash",
        name: "SentraWash",
        device: "phone",
        logo: null,
        monogram: "S",
        accent: "#0ea5e9",
        splash: { from: "#0b1a26", to: "#12283a" },
        screens: [
            "/images/projects/sentrawash/sentrawash-app-panel.webp",
        ],
        links: [],
        text: {
            es: {
                tagline: "Gestión de lavaderos de vehículos",
                desc: "SaaS multiempresa para lavaderos: app móvil con escaneo de placa y foto del vehículo, y un tablero operativo en tiempo real sobre una API con NestJS.",
                facts: ["SaaS multiempresa"],
            },
            en: {
                tagline: "Car wash management",
                desc: "Multi-tenant SaaS for car washes: a mobile app with license plate scanning and vehicle photos, and a real-time operations board on a NestJS API.",
                facts: ["Multi-tenant SaaS"],
            },
        },
    },
    {
        id: "simbia",
        name: "SIMBIA",
        device: "web",
        logo: "/images/projects/logos/simbia.webp",
        monogram: "S",
        accent: "#f2762e",
        splash: { from: "#0b1621", to: "#0d3b4a" },
        screens: [
            "/images/projects/simbia/simbia-web-escritorio.webp",
            "/images/projects/simbia/simbia-web-movil.webp",
        ],
        links: [{ kind: "site", href: "https://simbia.sentralabs.co" }],
        text: {
            es: {
                tagline: "Agua entre vecinos industriales",
                desc: "Plataforma para el Reto Cabot: encuentra a las empresas vecinas de la planta en Mamonal, lee sus permisos de vertimiento y simula en un gemelo digital de la torre de enfriamiento cuánta agua cruda se deja de captar.",
                facts: ["En vivo · simbia.sentralabs.co", "Reto Cabot"],
            },
            en: {
                tagline: "Water between industrial neighbors",
                desc: "Platform for the Cabot Challenge: it finds the plant's neighboring companies in Mamonal, reads their discharge permits and simulates, in a digital twin of the cooling tower, how much raw water stops being drawn.",
                facts: ["Live · simbia.sentralabs.co", "Cabot Challenge"],
            },
        },
    },
    {
        id: "sentrasecurity",
        name: "SentraSecurity",
        device: "web",
        logo: "/images/projects/logos/sentrasecurity.webp",
        logoBg: "#ffffff",
        monogram: "S",
        accent: "#22d3ee",
        splash: { from: "#0a1426", to: "#10213d" },
        screens: [
            "/images/projects/sentrasecurity/sentrasecurity-web-escritorio.webp",
            "/images/projects/sentrasecurity/sentrasecurity-web-movil.webp",
        ],
        links: [],
        text: {
            es: {
                tagline: "Rastreo GPS de vehículos",
                desc: "Monitoreo GPS en tiempo real y corte remoto de motor, con panel web y app móvil propias.",
                facts: ["Web y app móvil"],
            },
            en: {
                tagline: "Vehicle GPS tracking",
                desc: "Real-time GPS monitoring and remote engine cut-off, with its own web dashboard and mobile app.",
                facts: ["Web and mobile app"],
            },
        },
    },
    {
        id: "tooli",
        name: "Tooli",
        device: "phone",
        logo: "/images/projects/logos/tooli.webp",
        monogram: "T",
        accent: "#2563eb",
        splash: { from: "#0b1a3a", to: "#13295a" },
        screens: [
            "/images/projects/tooli/tooli-app-inicio.webp",
        ],
        links: [],
        text: {
            es: {
                tagline: "Chatbot de WhatsApp de la UTB",
                desc: "Plataforma conversacional de WhatsApp de la Universidad Tecnológica de Bolívar: atiende a aspirantes y responde consultas sobre la universidad.",
                facts: ["Universidad Tecnológica de Bolívar"],
            },
            en: {
                tagline: "WhatsApp chatbot for UTB",
                desc: "WhatsApp conversational platform for Universidad Tecnológica de Bolívar: it assists prospective students and answers questions about the university.",
                facts: ["Universidad Tecnológica de Bolívar"],
            },
        },
    },
    {
        id: "radar-digital",
        name: "Radar Digital",
        device: "web",
        logo: "/images/projects/logos/radar-digital.webp",
        monogram: "R",
        accent: "#7c3aed",
        splash: { from: "#120d22", to: "#1e1538" },
        screens: [
            "/images/projects/radar-digital/radar-digital-web-escritorio.webp",
            "/images/projects/radar-digital/radar-digital-web-movil.webp",
        ],
        links: [],
        text: {
            es: {
                tagline: "Diagnóstico de madurez digital",
                desc: "Cuestionario web que mide la madurez digital de una empresa en 8 dimensiones y entrega un radar interactivo, un diagnóstico y un plan de acción por fases, con panel de administración.",
                facts: ["8 dimensiones"],
            },
            en: {
                tagline: "Digital maturity assessment",
                desc: "Web questionnaire that measures a company's digital maturity across 8 dimensions and delivers an interactive radar chart, a diagnosis and a phased action plan, with an admin panel.",
                facts: ["8 dimensions"],
            },
        },
    },
    {
        id: "redesplus",
        name: "RedesPlus",
        device: "web",
        logo: "/images/projects/logos/redesplus.webp",
        monogram: "R",
        accent: "#facc15",
        splash: { from: "#1c1a0d", to: "#2c2810" },
        screens: [],
        links: [],
        text: {
            es: {
                tagline: "Videos cortos con IA",
                desc: "Orquestador de IA para videos cortos: a partir de una idea escribe el guion, genera la voz, busca los visuales, monta un video vertical con subtítulos y lo publica en YouTube, TikTok o Facebook.",
                facts: ["Publica en YouTube, TikTok y Facebook"],
            },
            en: {
                tagline: "Short videos with AI",
                desc: "AI orchestrator for short videos: from an idea it writes the script, generates the voice, finds the visuals, edits a vertical video with subtitles and publishes it to YouTube, TikTok or Facebook.",
                facts: ["Publishes to YouTube, TikTok and Facebook"],
            },
        },
    },
    {
        id: "smart-mobility",
        name: "Smart Mobility Cartagena",
        device: "web",
        logo: null,
        monogram: "SM",
        accent: "#10b981",
        splash: { from: "#0b1f1a", to: "#103028" },
        screens: [
            "/images/projects/smart-mobility/smart-mobility-web-escritorio.webp",
        ],
        links: [{ kind: "site", href: "https://smartcity.sentralabs.co" }],
        text: {
            es: {
                tagline: "Observatorio de tráfico urbano",
                desc: "Observatorio académico de tráfico de la Universidad Tecnológica de Bolívar: recolecta, guarda y publica datos de tráfico en tiempo real de 113 puntos de Cartagena.",
                facts: ["En vivo · smartcity.sentralabs.co", "113 puntos de la ciudad"],
            },
            en: {
                tagline: "Urban traffic observatory",
                desc: "Academic traffic observatory for Universidad Tecnológica de Bolívar: it collects, stores and publishes real-time traffic data from 113 points across Cartagena.",
                facts: ["Live · smartcity.sentralabs.co", "113 points across the city"],
            },
        },
    },
    {
        id: "infotarifa",
        name: "InfoTarifa",
        device: "phone",
        logo: null,
        monogram: "I",
        accent: "#22c55e",
        splash: { from: "#0c1f14", to: "#14331f" },
        screens: [],
        links: [],
        text: {
            es: {
                tagline: "Tarifas justas para conductores",
                desc: "App para conductores que evalúa si una tarifa de Uber, DiDi, Bolt, Cabify o 99 está bien pagada: precio por kilómetro, por hora y rating del pasajero frente a los umbrales de cada conductor.",
                facts: ["Uber · DiDi · Bolt · Cabify · 99"],
            },
            en: {
                tagline: "Fair fares for drivers",
                desc: "App for drivers that checks whether an Uber, DiDi, Bolt, Cabify or 99 fare pays well: price per kilometer, per hour and passenger rating against each driver's own thresholds.",
                facts: ["Uber · DiDi · Bolt · Cabify · 99"],
            },
        },
    },
    {
        id: "campo-plus",
        name: "Campo+",
        device: "phone",
        logo: null,
        monogram: "C+",
        accent: "#84cc16",
        splash: { from: "#141f0c", to: "#1f3013" },
        screens: [],
        links: [],
        text: {
            es: {
                tagline: "Gestión agropecuaria sin señal",
                desc: "App de gestión agropecuaria offline-first con diseño nativo de iOS, pensada para campesinos, trabajadores, compradores y transportistas que trabajan en campo sin señal.",
                facts: ["Funciona sin conexión"],
            },
            en: {
                tagline: "Farm management without signal",
                desc: "Offline-first farm management app with a native iOS design, built for farmers, workers, buyers and carriers who work in the field without signal.",
                facts: ["Works offline"],
            },
        },
    },
];

/**
 * Los tres dispositivos del hero, de izquierda a derecha.
 *
 * El tercero esta en blanco a proposito: es el lugar para el proyecto de otro
 * compañero. Para llenarlo, agrega el proyecto a la lista de arriba y cambia
 * `id: null` por su id (por ejemplo `id: "mi-proyecto"`). Si es una pagina web,
 * cambia tambien `device` a "web".
 */
export const heroLineup: { id: string | null; device: Device }[] = [
    { id: "transcar", device: "phone" },
    { id: "malecon", device: "web" },
    { id: null, device: "phone" },
];

export function getProject(id: string | null): Project | undefined {
    return id ? projects.find((p) => p.id === id) : undefined;
}
