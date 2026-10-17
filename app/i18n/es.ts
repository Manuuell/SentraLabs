export const es = {
    // Navbar
    nav: { home: "Inicio", about: "Nosotros", projects: "Proyectos", team: "Equipo", contact: "Contacto" },
    // Hero
    hero: {
        // El gancho de marca pasa a ser el kicker: el H1 tiene que llevar la
        // keyword ("desarrollo de software a medida en Cartagena").
        kicker: "// creamos · probamos · lanzamos",
        tagline1: "Creamos software",
        tagline2: "a medida",
        tagline3: "en Cartagena",
        sub: "Estudio de desarrollo de software en Cartagena. Convertimos ideas en productos digitales de alto impacto: apps móviles, plataformas web e integraciones de IA.",
        cta1: "Agenda una reunión",
        cta2: "Ver proyectos",
    },
    // Code Window
    code: { comment: "// Tu próximo proyecto empieza aquí", filename: "SentraLabs.tsx", tip: "// Tip: Presiona [Enter] para magia ✨" },
    // About
    about: {
        label: "// nosotros",
        title: "Desarrollo de software que resuelve problemas reales",
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
    // Beneficios
    benefits: {
        label: "// beneficios",
        title: "Por qué trabajar con nosotros",
        desc: "Somos un equipo pequeño, y eso se nota en cómo trabajamos contigo.",
        items: [
            {
                icon: "🎯",
                title: "Hecho a tu medida",
                desc: "El producto se ajusta a cómo trabajas, no al revés. Nada de adaptar tu operación a una plantilla que compraste.",
            },
            {
                icon: "📦",
                title: "Entregas cada semana",
                desc: "Ves avances reales desde el primer sprint. Si algo no va por donde esperabas, lo corregimos en días, no en meses.",
            },
            {
                icon: "🔑",
                title: "El código es tuyo",
                desc: "Te entregamos el repositorio y la documentación. Puedes auditarlo, moverlo o seguirlo con otro equipo cuando quieras.",
            },
            {
                icon: "💬",
                title: "Hablas con quien programa",
                desc: "Sin capas de gestión ni intermediarios. Preguntas técnicas contestadas por la persona que escribió esa parte.",
            },
        ],
    },
    // Proceso
    process: {
        label: "// proceso",
        title: "Cómo trabajamos",
        desc: "Un flujo ágil, con entregas incrementales y comunicación constante en cada fase.",
        steps: [
            {
                n: "01",
                title: "Descubrimiento",
                desc: "Entendemos el problema antes de escribir una línea de código: objetivos, usuarios y qué entra —y qué no— en el primer lanzamiento.",
                file: "descubrimiento.sh",
                lines: ["$ definir objetivos", "$ mapear usuarios", "$ acotar el alcance del MVP", "✓ backlog priorizado"],
            },
            {
                n: "02",
                title: "Diseño",
                desc: "Wireframes y prototipo navegable. Validamos flujos y pantallas contigo antes de construirlos, cuando cambiar todavía es barato.",
                file: "diseno.sh",
                lines: ["$ wireframes", "$ prototipo navegable", "$ sistema de diseño", "✓ flujos validados"],
            },
            {
                n: "03",
                title: "Desarrollo",
                desc: "Sprints cortos con entregas incrementales. Ves el producto crecer semana a semana, no en una sola entrega al final.",
                file: "desarrollo.sh",
                lines: ["$ sprint 01 ✓", "$ sprint 02 ✓", "$ sprint 03 ...", "✓ entregas semanales"],
            },
            {
                n: "04",
                title: "Pruebas",
                desc: "QA funcional, pruebas en dispositivos reales y ajustes de rendimiento. Nada sale a producción sin haberse roto antes aquí.",
                file: "pruebas.sh",
                lines: ["$ qa funcional", "$ dispositivos reales", "$ rendimiento", "✓ listo para publicar"],
            },
            {
                n: "05",
                title: "Lanzamiento",
                desc: "Publicación, monitoreo y soporte. El lanzamiento es el principio de la vida del producto, no el final del proyecto.",
                file: "lanzamiento.sh",
                lines: ["$ deploy a producción", "$ monitoreo activo", "$ soporte y mejoras", "🚀 en producción"],
            },
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
    // Asistente
    chat: {
        name: "SentraLabs AI",
        status: "En línea · Responde al instante",
        badge: "asistente virtual",
        greeting: "¡Hola! Soy el asistente de SentraLabs. ¿En qué puedo ayudarte?",
        suggestionsLabel: "sugerencias",
        suggestions: [
            { icon: "💰", text: "Quiero cotizar un proyecto" },
            { icon: "🚀", text: "¿Qué servicios ofrecen?" },
            { icon: "⏱️", text: "¿Cuánto tarda un MVP?" },
            { icon: "🛠️", text: "¿Con qué tecnologías trabajan?" },
        ],
        placeholder: "Escribe tu mensaje...",
        send: "Enviar",
        open: "Abrir el asistente",
        close: "Cerrar el asistente",
        reset: "Reiniciar la conversación",
        teaser: "¿Quieres cotizar un proyecto o resolver una duda?",
        teaserClose: "Cerrar el aviso",
        disclaimer: "Respuestas generadas por IA.",
        error: "No pude responder ahora mismo. Escríbenos a atencionsentralabs@gmail.com y te contestamos.",
        rateLimited: "Demasiados mensajes seguidos. Espera un momento antes de continuar.",
        unavailable: "El asistente todavía no está disponible. Escríbenos a atencionsentralabs@gmail.com.",
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
