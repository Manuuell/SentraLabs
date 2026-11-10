/**
 * Textos de la home en español. en.ts tiene la misma forma (Translations).
 * Solo van afirmaciones que el equipo puede sostener: premios, plazos y
 * compromisos que ya estaban publicados en el sitio. Cifras nuevas (usuarios,
 * precios, garantias) se agregan cuando existan.
 */
export const es = {
    nav: {
        projects: "Proyectos",
        how: "Cómo trabajamos",
        team: "Equipo",
        faq: "Preguntas",
        cta: "Hablemos",
        home: "Inicio de SentraLabs",
        langSwitch: "Switch to English",
        themeLight: "Cambiar a tema claro",
        themeDark: "Cambiar a tema oscuro",
    },
    hero: {
        titleA: "Creamos software",
        titleMark: "a medida",
        titleB: "en",
        titleEnd: "Cartagena",
        sub: "Estudio de desarrollo de software. Convertimos ideas en productos digitales: apps móviles, plataformas web e integraciones de IA.",
        cta1: "Cuéntanos tu proyecto",
        cta2: "Ver proyectos",
        sceneLabel: "Una laptop con el sitio de Malecón Business Center y dos teléfonos con la app TransCar y El Mundo Te Busca, hechos por SentraLabs",
    },
    showcase: {
        kicker: "Proyectos",
        title: "Lo que construimos",
        desc: "Productos reales, en manos de usuarios reales.",
        tabsLabel: "Elige un proyecto",
        more: "Más proyectos",
        site: "Ver el sitio",
        screenAlt: "Pantalla de la app",
    },
    strip: {
        title: "¿Tienes una idea? La convertimos en producto.",
        cta: "Hablemos",
    },
    how: {
        kicker: "Cómo trabajamos",
        title: "De la primera llamada a producción, en tres pasos",
        steps: [
            {
                n: "01",
                title: "Hablamos",
                desc: "Una llamada para entender el problema, a tus usuarios y qué entra —y qué no— en el primer lanzamiento. Sales con una estimación detallada.",
            },
            {
                n: "02",
                title: "Construimos",
                desc: "Validamos el diseño contigo y trabajamos en sprints cortos. Cada semana ves avances reales, no una sola entrega al final.",
            },
            {
                n: "03",
                title: "Lanzamos",
                desc: "Pruebas en dispositivos reales, publicación y monitoreo. Después seguimos contigo con soporte y mejoras.",
            },
        ],
        marquee: [
            "Apps móviles",
            "Plataformas web",
            "Integraciones de IA",
            "Chatbots",
            "Ciberseguridad",
            "MVPs",
            "Paneles administrativos",
            "APIs",
        ],
    },
    services: {
        kicker: "Servicios",
        title: "Lo que hacemos",
        items: [
            {
                title: "Desarrollo móvil",
                desc: "Apps nativas y multiplataforma con Flutter. Diseño intuitivo, rendimiento nativo y publicación en iOS y Android.",
                tags: ["Flutter", "iOS", "Android"],
            },
            {
                title: "Desarrollo web",
                desc: "Sitios y plataformas con Next.js, React y TypeScript. Rápidos, escalables y optimizados para SEO.",
                tags: ["Next.js", "React", "TypeScript"],
            },
            {
                title: "Inteligencia artificial",
                desc: "Chatbots, asistentes virtuales y automatización con OpenAI, integrados en productos nuevos o existentes.",
                tags: ["OpenAI", "Chatbots", "Automatización"],
            },
            {
                title: "Ciberseguridad",
                desc: "Plataformas de formación, análisis de vulnerabilidades y soluciones de seguridad digital para empresas.",
                tags: ["Formación", "Vulnerabilidades"],
            },
        ],
    },
    why: {
        kicker: "Por qué nosotros",
        title: "Un equipo pequeño, y eso se nota en cómo trabajamos contigo",
        items: [
            {
                title: "Hecho a tu medida",
                desc: "El producto se ajusta a cómo trabajas, no al revés. Nada de adaptar tu operación a una plantilla.",
            },
            {
                title: "Entregas cada semana",
                desc: "Ves avances reales desde el primer sprint. Si algo no va por donde esperabas, lo corregimos en días, no en meses.",
            },
            {
                title: "El código es tuyo",
                desc: "Te entregamos el repositorio y la documentación. Puedes auditarlo, moverlo o seguirlo con otro equipo cuando quieras.",
            },
            {
                title: "Hablas con quien programa",
                desc: "Sin capas de gestión ni intermediarios. Las preguntas técnicas las responde quien escribió esa parte.",
            },
            {
                title: "Estimación clara antes de empezar",
                desc: "Tiempos y alcance por escrito antes de la primera línea de código. Sin sorpresas a mitad del proyecto.",
            },
            {
                title: "Seguimos después del lanzamiento",
                desc: "Planes de mantenimiento: actualizaciones, corrección de errores, nuevas funciones y monitoreo.",
            },
        ],
    },
    team: {
        kicker: "Quiénes lo construyen",
        title: "El equipo detrás del código",
        letter: "Fundé SentraLabs para construir software que resuelva problemas reales, empezando por los de nuestra ciudad. Somos un equipo pequeño a propósito: quien te atiende es quien diseña y programa tu producto, y respondemos por él después del lanzamiento.",
        signature: "Manuel Esteban · Fundador",
        creds: [
            "Mejor Proyecto TalentoTech 2025",
            "Hackathon de IA · TalentoTech",
            "Cartagena, Colombia",
            "Español e inglés",
        ],
        profile: "Ver perfil",
        roles: {
            "Fundador": "Fundador",
            "Co-founder / Dev": "Cofundador · Desarrollo",
            "Diseñador UX/UI": "Diseño UX/UI",
        } as Record<string, string>,
    },
    notFor: {
        kicker: "Antes de escribirnos",
        title: "SentraLabs no es para todos.",
        body: "Si buscas la opción más barata o una app lista en un fin de semana, no somos tu equipo. Si quieres un producto que funcione, que entiendas y que pueda crecer contigo, hablemos.",
        signature: "— Manuel Esteban, fundador",
    },
    compare: {
        kicker: "Tus opciones",
        title: "Tres formas de construir tu producto",
        columns: [
            {
                name: "Un freelance",
                featured: false,
                pros: ["Precio bajo al inicio"],
                cons: [
                    "Una sola persona: si se enferma o se va, el proyecto se detiene",
                    "Diseño, pruebas y publicación suelen quedar fuera",
                    "Sin proceso ni entregas fijas",
                ],
            },
            {
                name: "SentraLabs",
                featured: true,
                pros: [
                    "Equipo completo: diseño, desarrollo, pruebas y lanzamiento",
                    "Entregas cada semana",
                    "Hablas directo con quien programa",
                    "El código y la documentación son tuyos",
                    "Soporte después del lanzamiento",
                ],
                cons: [],
            },
            {
                name: "Una agencia grande",
                featured: false,
                pros: ["Mucha capacidad"],
                cons: [
                    "Capas de gestión entre tú y quien programa",
                    "Proyectos mínimos y costos altos",
                    "Tu proyecto compite con clientes más grandes",
                ],
            },
        ],
        cta: "Cotiza tu proyecto",
    },
    faq: {
        kicker: "Preguntas",
        title: "Las dudas de antes de empezar",
        items: [
            { q: "¿Qué tipo de proyectos desarrollan?", a: "Aplicaciones móviles (Flutter), sitios y plataformas web (Next.js/React), integraciones de IA (OpenAI) y soluciones de ciberseguridad. Desde MVPs hasta productos completos." },
            { q: "¿Cuánto tarda un proyecto?", a: "Depende de la complejidad. Un MVP puede estar listo en 4 a 8 semanas; un producto más complejo, en 3 a 6 meses. Siempre damos una estimación detallada antes de empezar." },
            { q: "¿Cuánto cuesta?", a: "Depende del alcance. Después de la primera llamada te enviamos una estimación detallada con tiempos y costo, sin compromiso." },
            { q: "¿El código es mío?", a: "Sí. Te entregamos el repositorio y la documentación. Puedes auditarlo, moverlo o seguirlo con otro equipo cuando quieras." },
            { q: "¿Cómo es el proceso de trabajo?", a: "Hablamos, construimos y lanzamos: descubrimiento y diseño validado contigo, sprints cortos con entregas cada semana, y pruebas en dispositivos reales antes de publicar." },
            { q: "¿Ofrecen mantenimiento después del lanzamiento?", a: "Sí. Tenemos planes de mantenimiento y soporte continuo: actualizaciones, corrección de errores, nuevas funciones y monitoreo." },
            { q: "¿Trabajan con clientes fuera de Colombia?", a: "Sí, trabajamos de forma remota con clientes de cualquier parte del mundo, en español y en inglés." },
        ],
    },
    contact: {
        kicker: "Contacto",
        titleA: "¿Tienes un",
        titleMid: "proyecto",
        titleB: "en mente?",
        desc: "Cuéntanos tu idea y te respondemos con los siguientes pasos. Hablamos español e inglés.",
        whatsapp: "Escríbenos por WhatsApp",
        email: "Escríbenos un correo",
    },
    footer: {
        rights: "Todos los derechos reservados.",
        privacy: "Privacidad",
        terms: "Términos",
        site: "Sitio",
        contact: "Contacto",
        legal: "Legal",
        location: "Cartagena, Colombia",
        terminal: "Pulsa Enter ↵ para abrir la terminal",
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
};

export type Translations = typeof es;
