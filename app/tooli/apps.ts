/**
 * Las nueve apps de Tooli. Las que tienen `pagina` ya están en
 * public/tooli/<id>/ (build estático de web_unisinu_tooli) y en TOOLI_WEBS de
 * next.config.ts. Los datos salen de la configuración de cada app
 * (tooli_app/lib/core/config/universidades/<id>.dart) y de su ficha de Play.
 */
export type AppTooli = {
    id: string;
    /** Nombre de la app tal como sale en el teléfono. */
    app: string;
    institucion: string;
    /** Sedes o modalidades que se eligen al empezar. */
    donde: string;
    /** Lo que la distingue, en una línea (comprobado en su código). */
    rasgo: string;
    /** Color de marca (el de su página). */
    color: string;
    /** Ícono: la página propia trae el suyo; las dos sin página usan uno de images/. */
    icono: string;
    pagina: boolean;
};

export const APPS: AppTooli[] = [
    {
        id: "unisinu",
        app: "Unisinú App",
        institucion: "Universidad del Sinú",
        donde: "Cartagena y Montería",
        rasgo: "Moodle o Canvas según tu sede, y Elysa con tus notas oficiales.",
        color: "#e42313",
        icono: "/tooli/unisinu/icono-128.webp",
        pagina: true,
    },
    {
        id: "comfenalco",
        app: "Comfenalco App",
        institucion: "Tecnológico Comfenalco",
        donde: "Cartagena",
        rasgo: "Ferrum y Campus dentro, y el QR de los torniquetes en tu carné.",
        color: "#314491",
        icono: "/tooli/comfenalco/icono-128.webp",
        pagina: true,
    },
    {
        id: "sanbuenaventura",
        app: "USB App",
        institucion: "Universidad de San Buenaventura",
        donde: "Cartagena, Medellín, Cali y Bogotá",
        rasgo: "El aula de tu sede, con los pesos de corte de cada ciudad.",
        color: "#b35900",
        icono: "/tooli/sanbuenaventura/icono-128.webp",
        pagina: true,
    },
    {
        id: "unicartagena",
        app: "UdeC App",
        institucion: "Universidad de Cartagena",
        donde: "Presencial y a distancia",
        rasgo: "Campus, centros tutoriales y tu aula, sin perderte entre portales.",
        color: "#a63c24",
        icono: "/tooli/unicartagena/icono-128.webp",
        pagina: true,
    },
    {
        id: "unitecnar",
        app: "Unitecnar App",
        institucion: "Fundación Universitaria Antonio de Arévalo",
        donde: "Presencial y virtual",
        rasgo: "Tus módulos virtuales y su calendario, semana por semana.",
        color: "#123d65",
        icono: "/tooli/unitecnar/icono-128.webp",
        pagina: true,
    },
    {
        id: "uninunez",
        app: "Uninúñez App",
        institucion: "Corporación Universitaria Rafael Núñez",
        donde: "Cartagena, Barranquilla y Medicina",
        rasgo: "Notas con centésimas, como las calcula tu institución.",
        color: "#1e8074",
        icono: "/tooli/uninunez/icono-128.webp",
        pagina: true,
    },
    {
        id: "umayor",
        app: "Umayor App",
        institucion: "Institución Universitaria Mayor de Cartagena",
        donde: "Cartagena y Regionalización",
        rasgo: "Génesis y Ulyses a un toque, y tu carné con tu número de identificación.",
        color: "#007f3a",
        icono: "/tooli/umayor/icono-128.webp",
        pagina: true,
    },
    {
        id: "unicolombo",
        app: "Unicolombo App",
        institucion: "Fundación Universitaria Colombo Internacional",
        donde: "Cartagena",
        rasgo: "Su página llega con las primeras tomas de la app.",
        color: "#004f9f",
        icono: "/images/projects/tooli/unicolombo.webp",
        pagina: false,
    },
    {
        id: "elyonyireh",
        app: "Elyon Yireh App",
        institucion: "Fundación Internacional de Educación Elyon Yireh",
        donde: "Cartagena",
        rasgo: "Su página llega con las primeras tomas de la app.",
        color: "#0073a8",
        icono: "/images/projects/tooli/elyonyireh.webp",
        pagina: false,
    },
];
