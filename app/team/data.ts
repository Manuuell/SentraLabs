export interface TeamMember {
    slug: string;
    name: string;
    role: string;
    image: string;
    oneLiner: string;
    bio: string;
    socials: {
        github?: string;
        linkedin?: string;
        email?: string;
    };
    highlights: {
        title: string;
        description: string;
        link?: string;
    }[];
    projects: {
        name: string;
        description: string;
        tags: string[];
        link?: string;
    }[];
    skills: string[];
    awards?: string[];
    certifications?: {
        title: string;
        issuer: string;
        link?: string;
    }[];
    scholarships?: string[];
    experience?: TimelineItem[];
    education?: TimelineItem[];
    languages?: string[];
    /** Traducción al inglés. Lo que falte se muestra en español. */
    en?: TeamMemberTranslation;
}

export interface TimelineItem {
    title: string;
    org: string;
    period?: string;
}

export type TeamMemberTranslation = Partial<
    Pick<
        TeamMember,
        | "role"
        | "oneLiner"
        | "bio"
        | "highlights"
        | "projects"
        | "skills"
        | "awards"
        | "certifications"
        | "scholarships"
        | "experience"
        | "education"
        | "languages"
    >
>;

export const teamMembers: TeamMember[] = [
    {
        slug: "manuel-esteban",
        name: "Manuel Esteban",
        role: "Fundador",
        image: "/images/team/manuel-esteban-fundador-sentralabs.jpg",
        oneLiner: "Fundador de SentraLabs. Desarrollador fullstack & mobile.",
        bio: "Apasionado por construir productos digitales que resuelven problemas reales. Lidero SentraLabs con la visión de crear software de alto impacto — desde aplicaciones móviles hasta plataformas web completas. Creo en el código limpio, la iteración rápida y el lanzamiento constante.",
        socials: {
            github: "https://github.com/Manuuell",
            linkedin: "https://www.linkedin.com/in/manuuell/",
            email: "Estebanmanuel600@gmail.com",
        },
        highlights: [
            {
                title: "TransCar",
                description:
                    "App para el sistema TransCaribe con mapa interactivo, ETAs en vivo, recarga de tarjeta y chatbot con IA. Flutter + Firebase.",
            },
            {
                title: "MarSec — Mejor Proyecto TalentoTech 2025",
                description:
                    "Plataforma de ciberseguridad para embarcaciones. Ganador del premio al mejor proyecto TalentoTech.",
                link: "https://github.com/Manuuell/MarSec",
            },
        ],
        projects: [
            {
                name: "TransCar",
                description:
                    "App de transporte para el sistema TransCaribe en Cartagena. Mapa con buses en tiempo real, ETAs con datos de tráfico, recarga de tarjeta desde el celular, membresía premium y chatbot con IA. En fase beta con usuarios reales.",
                tags: ["Flutter", "Firebase", "Mapbox", "OpenAI"],
            },
            {
                name: "MarSec",
                description:
                    "Plataforma de ciberseguridad para embarcaciones. Lecciones interactivas, cuestionarios y asistente virtual 'Capitán Ciber' con IA.",
                tags: ["Node.js", "Express", "Flutter", "SQL Server", "Azure"],
                link: "https://github.com/Manuuell/MarSec",
            },
            {
                name: "SentraLabs",
                description:
                    "Sitio web oficial del estudio. Dark terminal aesthetic, animaciones con Framer Motion.",
                tags: ["Next.js", "React", "TypeScript", "Framer Motion"],
                link: "https://github.com/Manuuell/SentraLabs",
            },
            {
                name: "EcoOne",
                description:
                    "App móvil multiplataforma que incentiva el reciclaje con EcoCoins. Conecta ciudadanos, operadores, comercios y administradores. Chatbot IA, QR y billetera digital.",
                tags: ["Flutter", "Clean Architecture", "OpenAI", "Firebase"],
                link: "https://github.com/Manuuell/EcoOnee",
            },
        ],
        skills: [
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Flutter",
            "Dart",
            "Node.js",
            "Express",
            "SQL Server",
            "Git",
            "Mapbox",
            "OpenAI API",
            "Azure",
            "Vercel",
        ],
        awards: [
            "Ganador Mejor Proyecto TalentoTech — MarSec 2025",
            "Ganador Hackathon Inteligencia Artificial — TalentoTech",
        ],
        certifications: [
            {
                title: "Ciberseguridad",
                issuer: "MinTIC TalentoTech",
                link: "https://wallet.xertify.co/certificates/7D7A1006A002",
            },
            {
                title: "Inteligencia Artificial",
                issuer: "MinTIC TalentoTech",
                link: "https://wallet.xertify.co/certificates/7D7A1006A004",
            },
        ],
    },
    {
        slug: "angel-acero",
        name: "Ángel Acero",
        role: "Co-founder / Dev",
        image: "/images/team/angel-acero-cofundador-desarrollador.jpg",
        oneLiner:
            "Co-fundador de SentraLabs. Desarrollador full-stack con foco en IA, visión por computador y ciberseguridad.",
        bio: "Desarrollador full-stack y estudiante de Ingeniería de Sistemas en la Universidad Tecnológica de Bolívar. Construyo productos completos —apps móviles y web, backend, bases de datos, infraestructura y modelos de Machine Learning— y los llevo a producción para clientes como Ecopetrol y la UTB. Me formé en ciberseguridad Blue Team con Trend Micro y AWS, y diseñé mi propio sistema de orquestación de agentes de IA para desarrollar más rápido sin bajar el estándar. Casi todo lo que hago nace de un problema real: transporte público, seguridad industrial, salud, transparencia electoral y personas desaparecidas.",
        socials: {
            github: "https://github.com/Angelsistemas7",
            email: "angelacero_sistemas@hotmail.com",
        },
        highlights: [
            {
                title: "SafeWatch — Ecopetrol",
                description:
                    "Monitoreo de equipos de protección personal con visión por computador (YOLO): detecta y alerta en tiempo real cuando un trabajador entra a una zona sin el EPP requerido.",
            },
            {
                title: "Tooli — proyecto de grado en la UTB",
                description:
                    "Chatbot de WhatsApp para la Universidad Tecnológica de Bolívar con asistente de IA, turnos, pagos y captación de aspirantes a posgrado. Los aliados del proyecto lo aprobaron y lo van a adoptar.",
            },
            {
                title: "El Mundo Te Busca",
                description:
                    "Plataforma ciudadana sin ánimo de lucro, en producción, para localizar personas desaparecidas y coordinar ayuda tras el terremoto de Venezuela de 2026.",
                link: "https://elmundotebusca.com",
            },
            {
                title: "Ojo al Voto",
                description:
                    "Auditoría ciudadana de las actas E-14 de la elección presidencial de 2026: lee 121.041 actas reales con IA y señala inconsistencias aritméticas.",
                link: "https://github.com/Manuuell/ojoalvoto",
            },
        ],
        projects: [
            {
                name: "Tooli",
                description:
                    "App para estudiantes universitarios de Cartagena: notas, horario, tareas y aula virtual en un solo lugar. Un mismo código genera una app por institución: Universidad del Sinú (en beta cerrada) y Tecnológico Comfenalco (en desarrollo). Independiente, no oficial.",
                tags: ["Flutter", "Dart", "Moodle"],
            },
            {
                name: "SafeWatch",
                description:
                    "Detección de EPP en tiempo real para Ecopetrol, con panel web, streaming de video y alertas.",
                tags: ["YOLO", "FastAPI", "Next.js"],
            },
            {
                name: "FastFood",
                description:
                    "Plataforma white-label de pedidos y fidelización por QR, ya usada por 5 restaurantes.",
                tags: ["Next.js", "Supabase", "WhatsApp API"],
            },
            {
                name: "SentraWash",
                description:
                    "SaaS multi-tenant para lavaderos: escaneo de placa, foto del vehículo y tablero en tiempo real.",
                tags: ["Flutter", "NestJS", "PostgreSQL"],
                link: "https://github.com/Manuuell/SentraWash",
            },
            {
                name: "TransCar",
                description:
                    "App para usuarios de TransCaribe en Cartagena: mapa en vivo, tiempos de llegada y chatbot de rutas con IA. 500 usuarios en Google Play.",
                tags: ["Flutter", "Mapbox", "OpenAI"],
                link: "https://play.google.com/store/apps/details?id=com.transcar.app",
            },
            {
                name: "El Mundo Te Busca",
                description:
                    "Web y app móvil para encontrar personas desaparecidas tras el terremoto de Venezuela de 2026.",
                tags: ["Next.js", "Flutter", "Supabase"],
                link: "https://elmundotebusca.com",
            },
            {
                name: "Ojo al Voto",
                description:
                    "Lectura con IA de 121.041 actas E-14 para detectar inconsistencias aritméticas.",
                tags: ["Python", "IA / OCR", "PostgreSQL"],
                link: "https://github.com/Manuuell/ojoalvoto",
            },
            {
                name: "CrimenAI",
                description:
                    "Observatorio de criminalidad con datos oficiales de 18 países y más de 530.000 hechos registrados en Colombia en 2026.",
                tags: ["JavaScript", "Leaflet", "GitHub Actions"],
            },
            {
                name: "Semáforo Digital",
                description:
                    "Autodiagnóstico de madurez digital para empresas, con resultado por colores y panel administrador.",
                tags: ["Next.js", "Supabase", "Docker"],
                link: "https://github.com/Angelsistemas7/radar-digital",
            },
            {
                name: "Malecón Business Center",
                description:
                    "Sitio web del proyecto Malecón para Conversión Consultorías, pensado para presentar la propuesta y captar contactos.",
                tags: ["Next.js", "TypeScript"],
                link: "https://maleconbusiness.com",
            },
            {
                name: "Error Atlas",
                description:
                    "Enciclopedia abierta de errores de desarrollo, con servidor MCP para consultarla desde Claude o Cursor.",
                tags: ["Next.js", "MCP", "Open source"],
                link: "https://github.com/Angelsistemas7/error-atlas",
            },
            {
                name: "HelpSearch",
                description:
                    "Red de auxilio SOS que funciona sin internet, por Bluetooth (malla BLE), pensada para emergencias y terremotos.",
                tags: ["Bluetooth LE", "Mobile", "Open source"],
                link: "https://github.com/Angelsistemas7/HelpSearch",
            },
            {
                name: "DevAtlas",
                description:
                    "Formato abierto compartido para atlas de conocimiento técnico. Error Atlas es su primer módulo; Vuln Atlas (vulnerabilidades) y Package Atlas (deprecaciones de paquetes) se construyen sobre la misma base.",
                tags: ["TypeScript", "JSON", "Open source"],
                link: "https://github.com/Angelsistemas7/devatlas",
            },
            {
                name: "Radar Digital",
                description:
                    "Diagnóstico de madurez digital en 8 dimensiones con radar interactivo y plan de acción por fases.",
                tags: ["Next.js", "React", "Supabase"],
                link: "https://github.com/Angelsistemas7/conversion",
            },
            {
                name: "Qubi",
                description:
                    "Gestor de equipos y tareas tipo Notion: tableros, calendario, registro de horas y páginas colaborativas en tiempo real.",
                tags: ["Next.js", "Prisma", "Yjs"],
                link: "https://github.com/Manuuell/Qubi",
            },
            {
                name: "Malecón Residences",
                description:
                    "Landing inmersiva para residencias frente al mar en Cartagena, hecha en colaboración con el equipo de SentraLabs.",
                tags: ["Next.js", "TypeScript", "Tailwind"],
                link: "https://github.com/jerdiaz/malecon-residences",
            },
        ],
        skills: [
            "Flutter",
            "Dart",
            "Expo",
            "React",
            "React Native",
            "Next.js",
            "TypeScript",
            "Tailwind",
            "Python",
            "FastAPI",
            "Node.js",
            "NestJS",
            "PostgreSQL",
            "Supabase",
            "Firebase",
            "SQLite",
            "Machine Learning",
            "Deep Learning",
            "PyTorch",
            "YOLO",
            "LLMs y agentes de IA",
            "MCP",
            "Docker",
            "Nginx",
            "AWS",
            "GitHub Actions",
            "Git",
            "Ciberseguridad (Blue Team)",
        ],
        awards: [
            "Proyecto ganador — Hackathon 2026 con Ecopetrol, la UTB, el SENA y la Alcaldía",
            "Entre los 20 mejores proyectos — Nexus Rural 2026",
            "Mejor proyecto de análisis de datos — Talento Tech 2024",
            "Proyecto ganador — Trend Micro 2023",
            "Proyecto ganador — MinTIC 2023",
            "Mejor proyecto del curso — Oracle 2022",
            "Primeros puestos por excelencia académica en 10.º y 11.º grado — Corporación Educativa Maddox",
        ],
        scholarships: [
            "Becas con Corazón — Ecopetrol, para estudiar Ingeniería de Sistemas en la UTB",
            "Beca de formación en ciberseguridad — Trend Micro",
            "Beca de formación en desarrollo de software — ICETEX",
            "Beca escolar — Corporación Educativa Maddox",
        ],
        certifications: [
            { title: "CyberSecurity Professional", issuer: "Trend Micro" },
            { title: "Deep Security 20", issuer: "Trend Micro" },
            { title: "Apex One as a Service", issuer: "Trend Micro" },
            { title: "Seguridad para TI", issuer: "Trend Micro" },
            { title: "Arquitectura en la nube", issuer: "AWS" },
            { title: "Ethical Hacking Red Team", issuer: "Hacker Mentor" },
            { title: "Diplomado en Desarrollo de Aplicaciones Móviles", issuer: "MinTIC y UTB" },
            { title: "Diplomado en Desarrollo de Software", issuer: "MinTIC y UTB" },
            { title: "Diplomados en Python y Java", issuer: "MinTIC y UTB" },
            { title: "Diplomado en Habilidades de la Investigación", issuer: "UTB" },
            { title: "Redes, ciberseguridad, IoT y SCRUM", issuer: "SENA" },
            { title: "Procesos para software de calidad", issuer: "SENA" },
            { title: "Diseño de páginas web", issuer: "SENA" },
            { title: "Excel avanzado", issuer: "SENA" },
            { title: "Inglés", issuer: "SENA" },
        ],
        experience: [
            {
                title: "Co-fundador y desarrollador full-stack",
                org: "SentraLabs",
                period: "2025 – hoy",
            },
            {
                title: "Desarrollador de software independiente",
                org: "Freelance — Conversión Consultorías (Malecón Business Center) y otros clientes",
                period: "2025 – hoy",
            },
            {
                title: "Auxiliar de soporte de software",
                org: "Nueva EPS",
                period: "6 meses",
            },
            {
                title: "Técnico en sistemas",
                org: "Bienestar IPS",
                period: "6 meses",
            },
        ],
        education: [
            {
                title: "Ingeniería de Sistemas",
                org: "Universidad Tecnológica de Bolívar",
                period: "2022 – en curso",
            },
            {
                title: "Técnico en Sistemas",
                org: "SENA",
            },
            {
                title: "Semillero de Medios Masivos y Productos Culturales",
                org: "UTB",
            },
            {
                title: "Bachiller",
                org: "Corporación Educativa Maddox",
                period: "2020",
            },
        ],
        languages: ["Español — nativo", "Inglés — B1 (MCER)"],
        en: {
            oneLiner:
                "Co-founder of SentraLabs. Full-stack developer focused on AI, computer vision and cybersecurity.",
            bio: "Full-stack developer and Systems Engineering student at Universidad Tecnológica de Bolívar. I build complete products — mobile and web apps, backends, databases, infrastructure and machine learning models — and ship them to production for clients such as Ecopetrol and UTB. I trained in Blue Team cybersecurity with Trend Micro and AWS, and I built my own AI agent orchestration system to move faster without lowering the bar. Most of my work starts from a real problem: public transit, industrial safety, healthcare, election transparency and missing persons.",
            highlights: [
                {
                    title: "SafeWatch — Ecopetrol",
                    description:
                        "Personal protective equipment monitoring with computer vision (YOLO): detects and alerts in real time when a worker enters an area without the required PPE.",
                },
                {
                    title: "Tooli — capstone project at UTB",
                    description:
                        "WhatsApp chatbot for Universidad Tecnológica de Bolívar with an AI assistant, appointments, payments and graduate-program lead capture. The project's partners approved it and are adopting it.",
                },
                {
                    title: "El Mundo Te Busca",
                    description:
                        "Non-profit civic platform, live in production, to find missing people and coordinate aid after the 2026 Venezuela earthquake.",
                    link: "https://elmundotebusca.com",
                },
                {
                    title: "Ojo al Voto",
                    description:
                        "Citizen audit of the E-14 tally sheets from Colombia's 2026 presidential election: reads 121,041 real sheets with AI and flags arithmetic inconsistencies.",
                    link: "https://github.com/Manuuell/ojoalvoto",
                },
            ],
            projects: [
                {
                    name: "Tooli",
                    description:
                        "App for university students in Cartagena: grades, schedule, assignments and the virtual classroom in one place. One codebase builds a separate app per institution: Universidad del Sinú (closed beta) and Tecnológico Comfenalco (in development). Independent, not official.",
                    tags: ["Flutter", "Dart", "Moodle"],
                },
                {
                    name: "SafeWatch",
                    description:
                        "Real-time PPE detection for Ecopetrol, with a web dashboard, video streaming and alerts.",
                    tags: ["YOLO", "FastAPI", "Next.js"],
                },
                {
                    name: "FastFood",
                    description:
                        "White-label QR ordering and loyalty platform, already used by 5 restaurants.",
                    tags: ["Next.js", "Supabase", "WhatsApp API"],
                },
                {
                    name: "SentraWash",
                    description:
                        "Multi-tenant SaaS for car washes: plate scanning, vehicle photos and a real-time board.",
                    tags: ["Flutter", "NestJS", "PostgreSQL"],
                    link: "https://github.com/Manuuell/SentraWash",
                },
                {
                    name: "TransCar",
                    description:
                        "App for TransCaribe riders in Cartagena: live map, arrival times and an AI route chatbot. 500 users on Google Play.",
                    tags: ["Flutter", "Mapbox", "OpenAI"],
                    link: "https://play.google.com/store/apps/details?id=com.transcar.app",
                },
                {
                    name: "El Mundo Te Busca",
                    description:
                        "Web and mobile app to find people missing after the 2026 Venezuela earthquake.",
                    tags: ["Next.js", "Flutter", "Supabase"],
                    link: "https://elmundotebusca.com",
                },
                {
                    name: "Ojo al Voto",
                    description:
                        "AI reading of 121,041 E-14 tally sheets to detect arithmetic inconsistencies.",
                    tags: ["Python", "AI / OCR", "PostgreSQL"],
                    link: "https://github.com/Manuuell/ojoalvoto",
                },
                {
                    name: "CrimenAI",
                    description:
                        "Crime observatory built on official data from 18 countries, with over 530,000 incidents recorded in Colombia in 2026.",
                    tags: ["JavaScript", "Leaflet", "GitHub Actions"],
                },
                {
                    name: "Semáforo Digital",
                    description:
                        "Digital maturity self-assessment for businesses, with color-coded results and an admin panel.",
                    tags: ["Next.js", "Supabase", "Docker"],
                    link: "https://github.com/Angelsistemas7/radar-digital",
                },
                {
                    name: "Malecón Business Center",
                    description:
                        "Website for the Malecón project by Conversión Consultorías, built to present the proposal and capture leads.",
                    tags: ["Next.js", "TypeScript"],
                    link: "https://maleconbusiness.com",
                },
                {
                    name: "Error Atlas",
                    description:
                        "Open encyclopedia of development errors, with an MCP server to query it from Claude or Cursor.",
                    tags: ["Next.js", "MCP", "Open source"],
                    link: "https://github.com/Angelsistemas7/error-atlas",
                },
                {
                    name: "HelpSearch",
                    description:
                        "SOS relief network that works without internet over Bluetooth (BLE mesh), built for emergencies and earthquakes.",
                    tags: ["Bluetooth LE", "Mobile", "Open source"],
                    link: "https://github.com/Angelsistemas7/HelpSearch",
                },
                {
                    name: "DevAtlas",
                    description:
                        "Shared open format for technical knowledge atlases. Error Atlas is its first module; Vuln Atlas (vulnerabilities) and Package Atlas (package deprecations) are built on the same base.",
                    tags: ["TypeScript", "JSON", "Open source"],
                    link: "https://github.com/Angelsistemas7/devatlas",
                },
                {
                    name: "Radar Digital",
                    description:
                        "Digital maturity assessment across 8 dimensions with an interactive radar chart and a phased action plan.",
                    tags: ["Next.js", "React", "Supabase"],
                    link: "https://github.com/Angelsistemas7/conversion",
                },
                {
                    name: "Qubi",
                    description:
                        "Notion-style team and task manager: boards, calendar, time tracking and real-time collaborative pages.",
                    tags: ["Next.js", "Prisma", "Yjs"],
                    link: "https://github.com/Manuuell/Qubi",
                },
                {
                    name: "Malecón Residences",
                    description:
                        "Immersive landing page for seafront residences in Cartagena, built together with the SentraLabs team.",
                    tags: ["Next.js", "TypeScript", "Tailwind"],
                    link: "https://github.com/jerdiaz/malecon-residences",
                },
            ],
            skills: [
                "Flutter",
                "Dart",
                "Expo",
                "React",
                "React Native",
                "Next.js",
                "TypeScript",
                "Tailwind",
                "Python",
                "FastAPI",
                "Node.js",
                "NestJS",
                "PostgreSQL",
                "Supabase",
                "Firebase",
                "SQLite",
                "Machine Learning",
                "Deep Learning",
                "PyTorch",
                "YOLO",
                "LLMs & AI agents",
                "MCP",
                "Docker",
                "Nginx",
                "AWS",
                "GitHub Actions",
                "Git",
                "Cybersecurity (Blue Team)",
            ],
            awards: [
                "Winning project — 2026 Hackathon with Ecopetrol, UTB, SENA and the Mayor's Office",
                "Top 20 project — Nexus Rural 2026",
                "Best data analytics project — Talento Tech 2024",
                "Winning project — Trend Micro 2023",
                "Winning project — MinTIC 2023",
                "Best course project — Oracle 2022",
                "Top of the class for academic excellence in 10th and 11th grade — Corporación Educativa Maddox",
            ],
            scholarships: [
                "Becas con Corazón — Ecopetrol, to study Systems Engineering at UTB",
                "Cybersecurity training scholarship — Trend Micro",
                "Software development training scholarship — ICETEX",
                "School scholarship — Corporación Educativa Maddox",
            ],
            certifications: [
                { title: "CyberSecurity Professional", issuer: "Trend Micro" },
                { title: "Deep Security 20", issuer: "Trend Micro" },
                { title: "Apex One as a Service", issuer: "Trend Micro" },
                { title: "Security for IT", issuer: "Trend Micro" },
                { title: "Cloud Architecture", issuer: "AWS" },
                { title: "Ethical Hacking Red Team", issuer: "Hacker Mentor" },
                { title: "Mobile App Development Diploma", issuer: "MinTIC & UTB" },
                { title: "Software Development Diploma", issuer: "MinTIC & UTB" },
                { title: "Python and Java Diplomas", issuer: "MinTIC & UTB" },
                { title: "Research Skills Diploma", issuer: "UTB" },
                { title: "Networking, cybersecurity, IoT and SCRUM", issuer: "SENA" },
                { title: "Quality software processes", issuer: "SENA" },
                { title: "Web page design", issuer: "SENA" },
                { title: "Advanced Excel", issuer: "SENA" },
                { title: "English", issuer: "SENA" },
            ],
            experience: [
                {
                    title: "Co-founder & full-stack developer",
                    org: "SentraLabs",
                    period: "2025 – present",
                },
                {
                    title: "Freelance software developer",
                    org: "Conversión Consultorías (Malecón Business Center) and other clients",
                    period: "2025 – present",
                },
                {
                    title: "Software support assistant",
                    org: "Nueva EPS",
                    period: "6 months",
                },
                {
                    title: "IT technician",
                    org: "Bienestar IPS",
                    period: "6 months",
                },
            ],
            education: [
                {
                    title: "Systems Engineering",
                    org: "Universidad Tecnológica de Bolívar",
                    period: "2022 – in progress",
                },
                {
                    title: "IT Technician",
                    org: "SENA",
                },
                {
                    title: "Mass Media and Cultural Products research group",
                    org: "UTB",
                },
                {
                    title: "High school diploma",
                    org: "Corporación Educativa Maddox",
                    period: "2020",
                },
            ],
            languages: ["Spanish — native", "English — B1 (CEFR)"],
        },
    },
    {
        slug: "javier-mercado",
        name: "Javier Mercado",
        role: "Database Manager",
        image: "/images/team/javier-mercado-database-manager.webp",
        oneLiner: "Database Manager en SentraLabs.",
        bio: "Especialista en bases de datos y gestión de infraestructura de datos.",
        socials: {
            github: "https://github.com/Javimercadobolivar",
            linkedin:
                "https://www.linkedin.com/in/javier-enrique-mercado-bolivar-203781359/",
        },
        highlights: [],
        projects: [],
        skills: [],
    },
    {
        slug: "jerson-diaz",
        name: "Jerson Díaz",
        role: "Co-founder / Dev",
        image: "/images/team/jerson-diaz-cofundador-desarrollador.jpg",
        oneLiner: "Co-fundador de SentraLabs.",
        bio: "Me especializo en el desarrollo móvil y web utilizando tecnologías como Flutter, Dart, Python y SQL. Creo en el código limpio, la iteración rápida y el lanzamiento constante de software de alto impacto, abarcando desde aplicaciones hasta arquitecturas soportadas en la nube y bases de datos.",
        socials: {
            github: "https://github.com/jerdiaz",
            linkedin: "https://www.linkedin.com/in/jerson-diaz-07b97333b/",
            email: "djerson347@gmail.com",
        },
        highlights: [
            {
                title: "TransCar",
                description: "App para el sistema TransCaribe con mapa interactivo, ETAs en vivo, recarga de tarjeta y chatbot con IA. Flutter + Firebase.",
            },
            {
                title: "MarSec — Mejor Proyecto TalentoTech 2025",
                description: "Plataforma de ciberseguridad para embarcaciones. Ganador del premio al mejor proyecto TalentoTech.",
                link: "https://github.com/Manuuell/MarSec",
            },
        ],
        projects: [
            {
                name: "TransCar",
                description: "App de transporte para el sistema TransCaribe en Cartagena. Mapa con buses en tiempo real, ETAs con datos de tráfico, recarga de tarjeta desde el celular, membresía premium y chatbot con IA. En fase beta con usuarios reales.",
                tags: ["Flutter", "Firebase", "Mapbox", "OpenAI"],
            },
            {
                name: "MarSec",
                description: "Plataforma de ciberseguridad para embarcaciones. Lecciones interactivas, cuestionarios y asistente virtual 'Capitán Ciber' con IA.",
                tags: ["Node.js", "Express", "Flutter", "SQL Server", "Azure"],
                link: "https://github.com/Manuuell/MarSec",
            },
            {
                name: "SentraLabs",
                description: "Sitio web oficial del estudio. Dark terminal aesthetic, animaciones con Framer Motion.",
                tags: ["Next.js", "React", "TypeScript", "Framer Motion"],
                link: "https://github.com/Manuuell/SentraLabs",
            },
            {
                name: "EcoOne",
                description: "App móvil multiplataforma que incentiva el reciclaje con EcoCoins. Conecta ciudadanos, operadores, comercios y administradores. Chatbot IA, QR y billetera digital.",
                tags: ["Flutter", "Clean Architecture", "OpenAI", "Firebase"],
                link: "https://github.com/Manuuell/EcoOnee",
            },
            {
                name: "tunometescabra",
                description: "Variante del juego de dominó desarrollada en Dart que cuenta con una mecánica especializada para la detección de trampas.",
                tags: ["Dart", "Flutter", "Firebase", "Google Cloud Platform"],
                link: "https://tunometescabra-c7741.web.app/",
            },
        ],
        skills: [
            "Flutter",
            "Dart",
            "Python",
            "SQL",
            "JavaScript",
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "Express",
            "SQL Server",
            "Firebase",
            "Google Cloud Platform",
            "Git",
            "Mapbox",
            "OpenAI API",
            "Azure",
            "Vercel",
        ],
        awards: [
            "Ganador Mejor Proyecto TalentoTech — MarSec 2025",
        ],
        certifications: [
            {
                title: "Ciberseguridad",
                issuer: "MinTIC TalentoTech",
                link: "https://wallet.xertify.co/certificates/7297FB1EA009",
            },
        ],
    },
    {
        slug: "gelbert-cantillo",
        name: "Gelbert Cantillo",
        role: "Diseñador UX/UI",
        image: "/images/team/gelbert-cantillo-disenador-ux-ui.jpg",
        oneLiner: "Diseñador UX/UI en SentraLabs.",
        bio: "Diseñador UX/UI enfocado en crear experiencias digitales atractivas, funcionales y centradas en el usuario para los productos de SentraLabs.",
        socials: {},
        highlights: [],
        projects: [],
        skills: [],
    },
];

export function getTeamMember(slug: string): TeamMember | undefined {
    return teamMembers.find((m) => m.slug === slug);
}

export function getAllSlugs(): string[] {
    return teamMembers.map((m) => m.slug);
}

/** Perfiles con versión en inglés: son los que tienen ruta /en/team/<slug>. */
export function getEnglishSlugs(): string[] {
    return teamMembers.filter((m) => m.en).map((m) => m.slug);
}

/**
 * Devuelve el miembro en el idioma pedido. En inglés se superpone su
 * traducción; lo que no esté traducido se queda en español.
 */
export function localizeMember(member: TeamMember, lang: "es" | "en"): TeamMember {
    if (lang !== "en" || !member.en) return member;
    const localized = { ...member, ...member.en };
    if (!member.en.role && member.role === "Fundador") localized.role = "Founder";
    return localized;
}
