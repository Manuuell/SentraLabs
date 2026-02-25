export const es = {
    // Navbar
    nav: { home: "Inicio", about: "Nosotros", projects: "Proyectos", team: "Equipo", contact: "Contacto" },
    // Hero
    hero: {
        tagline1: "Creamos.",
        tagline2: "Probamos.",
        tagline3: "Lanzamos.",
        sub: "Estudio de desarrollo de software en Cartagena. Convertimos ideas en productos digitales de alto impacto.",
        cta1: "Agenda una reunión",
        cta2: "Ver proyectos",
    },
    // Code Window
    code: { comment: "// Tu próximo proyecto empieza aquí", filename: "SentraLabs.tsx", tip: "// Tip: Presiona [Enter] para magia ✨" },
    // About
    about: {
        label: "// nosotros",
        title: "Software que resuelve problemas reales",
        desc: "En SentraLabs nos apasiona construir tecnología con propósito. Diseñamos, desarrollamos y lanzamos productos digitales que impulsan negocios y resuelven necesidades concretas — desde aplicaciones web hasta sistemas empresariales completos.",
        stats: { projects: "Proyectos", devs: "Desarrolladores", awards: "Premios" },
    },
    // Services
    services: {
        label: "// servicios",
        title: "Lo que hacemos",
        desc: "Soluciones digitales de alto impacto, desde la idea hasta el lanzamiento.",
        items: [
            { title: "Desarrollo Móvil", desc: "Apps nativas y multiplataforma con Flutter. Diseño intuitivo, rendimiento nativo y deploy en iOS y Android." },
            { title: "Desarrollo Web", desc: "Sitios y aplicaciones web modernas con Next.js, React y TypeScript. Rápidos, escalables y optimizados para SEO." },
            { title: "Inteligencia Artificial", desc: "Chatbots, asistentes virtuales y automatización con OpenAI. Integración de IA en productos existentes." },
            { title: "Ciberseguridad", desc: "Plataformas de formación, análisis de vulnerabilidades y soluciones de seguridad digital para empresas." },
        ],
    },
    // Projects
    projects: { label: "// proyectos", title: "Lo que construimos", desc: "Cada proyecto es una oportunidad de crear algo que importa." },
    // Tech Stack
    stack: { label: "// tecnologías", title: "Nuestro Stack", desc: "Las herramientas que usamos para construir productos de calidad." },
    // Team
    team: { label: "// equipo", title: "El equipo detrás del código", desc: "Personas con pasión por la tecnología y el impacto real." },
    // FAQ
    faq: {
        label: "// faq",
        title: "Preguntas Frecuentes",
        items: [
            { q: "¿Qué tipo de proyectos desarrollan?", a: "Desarrollamos aplicaciones móviles (Flutter), sitios web (Next.js/React), plataformas con IA (OpenAI) y soluciones de ciberseguridad. Desde MVPs hasta productos completos." },
            { q: "¿Cuánto tiempo tarda un proyecto?", a: "Depende de la complejidad. Un MVP puede estar listo en 4-8 semanas. Proyectos más complejos pueden tomar 3-6 meses. Siempre damos una estimación detallada antes de empezar." },
            { q: "¿Cómo es el proceso de trabajo?", a: "Seguimos un flujo ágil: descubrimiento → diseño → desarrollo → pruebas → lanzamiento. Mantenemos comunicación constante y entregas incrementales." },
            { q: "¿Ofrecen mantenimiento post-lanzamiento?", a: "Sí. Ofrecemos planes de mantenimiento y soporte continuo. Actualizaciones, corrección de bugs, nuevas features y monitoreo." },
            { q: "¿Trabajan con clientes fuera de Colombia?", a: "Sí, trabajamos de forma remota con clientes de cualquier parte del mundo. La comunicación es principalmente en español e inglés." },
        ],
    },
    // Contact
    contact: {
        title: "¿Tienes un proyecto en mente?",
        desc: "Cuéntanos tu idea y te ayudamos a hacerla realidad. Estamos listos para construir juntos.",
        email: "Escríbenos",
    },
    // Footer
    footer: {
        rights: "Todos los derechos reservados.",
        privacy: "Privacidad",
        terms: "Términos",
        home: "Inicio",
    },
};

export type Translations = typeof es;
