import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

/**
 * La CSP solo abre los dominios de Google Tag Manager si hay contenedor
 * configurado. Sin analitica, la politica se queda igual de cerrada que antes.
 */
const hasAnalytics = Boolean(process.env.NEXT_PUBLIC_GTM_ID);
const gtm = "https://www.googletagmanager.com";
const gaHosts = [
  "https://www.google-analytics.com",
  "https://*.google-analytics.com",
  "https://*.analytics.google.com",
];
const analytics = {
  script: hasAnalytics ? ` ${gtm} ${gaHosts[0]}` : "",
  connect: hasAnalytics ? ` ${gtm} ${gaHosts.join(" ")}` : "",
  img: hasAnalytics ? ` ${gtm} ${gaHosts.join(" ")}` : "",
  frame: hasAnalytics ? ` ${gtm}` : "",
};

/**
 * Content-Security-Policy: lista blanca de lo que el navegador puede cargar.
 * Es el complemento del saneamiento de entradas (app/lib/sanitize.ts): si algo
 * se colara igual, esto limita lo que podria hacer.
 */
const contentSecurityPolicy = [
  "default-src 'self'",

  // Next inyecta scripts en linea con la carga de RSC. Quitar 'unsafe-inline'
  // exige nonces por middleware, y eso volveria dinamicas paginas que hoy son
  // estaticas. En dev, ademas, Turbopack y react-refresh necesitan eval.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${analytics.script}`,

  // Los estilos en linea salen de los style={{ }} de React y de framer-motion.
  // googleapis sirve la hoja de fuentes que importa globals.css.
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",

  // Todas las imagenes son locales; data:/blob: los usa next/image internamente.
  `img-src 'self' data: blob:${analytics.img}`,

  // En dev el websocket de HMR va contra el mismo host.
  `connect-src 'self'${isDev ? " ws: wss:" : ""}${analytics.connect}`,

  "object-src 'none'",
  `frame-src ${hasAnalytics ? analytics.frame.trim() : "'none'"}`,
  "frame-ancestors 'none'", // nadie puede meter el sitio en un iframe
  "base-uri 'self'", // impide reescribir la base de las URLs relativas
  "form-action 'self'",
  "manifest-src 'self'",
  "worker-src 'self' blob:",

  // En dev no: la pagina se sirve por http y romperia los recursos locales.
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },

  // Fuerza HTTPS en visitas siguientes. Sin includeSubDomains ni preload: solo
  // tiene sentido añadirlos cuando todos los subdominios sirven ya por TLS.
  { key: "Strict-Transport-Security", value: "max-age=31536000" },

  // No adivinar el tipo de un recurso a partir de su contenido.
  { key: "X-Content-Type-Options", value: "nosniff" },

  // Solo el origen (sin ruta) al salir del sitio, y nada al bajar a http.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

  // Anti clickjacking para navegadores viejos que no leen frame-ancestors.
  { key: "X-Frame-Options", value: "DENY" },

  // La pagina no usa ninguna de estas APIs: se apagan todas.
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), interest-cohort=()",
  },

  // Aisla la ventana de las pestañas que abrimos con target="_blank".
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Genera .next/standalone: un servidor Node autocontenido, con solo las
  // dependencias que la app realmente usa en runtime. El build se hace en
  // GitHub Actions y al VPS se copia únicamente esa salida, que PM2 ejecuta.
  output: "standalone",

  // Sin "X-Powered-By: Next.js": no hace falta anunciar el stack.
  poweredByHeader: false,

  // Las cabeceras las emite el servidor Node de Next; Nginx solo hace de proxy.
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  // www y raiz servian el mismo HTML con 200, o sea contenido duplicado. Esto
  // solo funciona si Nginx reenvia el Host original (proxy_set_header Host
  // $host); si no, hay que hacer el 301 en el propio vhost.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.sentralabs.co" }],
        destination: "https://sentralabs.co/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
