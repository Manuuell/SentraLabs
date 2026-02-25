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
}

export const teamMembers: TeamMember[] = [
    {
        slug: "manuel-esteban",
        name: "Manuel Esteban",
        role: "Fundador",
        image: "/images/team/miembro1.webp",
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
                    "App oficial de TransCaribe con mapa interactivo, ETAs en vivo y chatbot GPT-4. Flutter + Mapbox.",
                link: "https://github.com/Manuuell/Trascaribe-APP",
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
                    "App móvil oficial de TransCaribe. Mapa interactivo con rutas en tiempo real, ETAs en vivo, chatbot con IA (GPT-4), consulta de saldo y noticias del sistema.",
                tags: ["Flutter", "Dart", "Mapbox", "OpenAI", "Google Sign-In"],
                link: "https://github.com/Manuuell/Trascaribe-APP",
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
        slug: "nino-nina",
        name: "Niño Niña",
        role: "Co-founder / Dev",
        image: "/images/team/miembro2.webp",
        oneLiner: "Co-fundador de SentraLabs.",
        bio: "Desarrollador comprometido con crear soluciones de calidad.",
        socials: {
            github: "https://github.com/Angelsistemas7",
        },
        highlights: [],
        projects: [],
        skills: [],
    },
    {
        slug: "matamba",
        name: "Matamba",
        role: "Database Manager",
        image: "/images/team/miembro3.webp",
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
        name: "Jerson Diaz",
        role: "Developer",
        image: "/images/team/miembro4.webp",
        oneLiner: "Developer en SentraLabs.",
        bio: "Desarrollador enfocado en construir soluciones digitales efectivas.",
        socials: {
            github: "https://github.com/jerdiaz",
        },
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
