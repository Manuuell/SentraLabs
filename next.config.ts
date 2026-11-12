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
  // Las fuentes las sirve el propio sitio (next/font las descarga en el build).
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self'",

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

/**
 * Apps de Tooli con página propia: un build estático de Vite copiado en
 * public/tooli/<app>/ (index.html, assets/, medios/). Next quita la barra
 * final, así que /tooli/<app> se reescribe a su index.html y la página usa
 * rutas absolutas (/tooli/<app>/…). Al sumar una app, se agrega aquí.
 */
const TOOLI_WEBS = "unisinu";

const nextConfig: NextConfig = {
  // Genera .next/standalone: un servidor Node autocontenido, con solo las
  // dependencias que la app realmente usa en runtime. El build se hace en
  // GitHub Actions y al VPS se copia únicamente esa salida, que PM2 ejecuta.
  output: "standalone",

  // Sin "X-Powered-By: Next.js": no hace falta anunciar el stack.
  poweredByHeader: false,

  // Las cabeceras las emite el servidor Node de Next; Nginx solo hace de proxy.
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },

      // Páginas de las apps de Tooli (estáticas, en public/tooli/<app>/). El
      // teléfono de la portada se inclina con el giroscopio en Android: solo
      // aquí se permite, para el propio sitio.
      {
        source: `/tooli/:app(${TOOLI_WEBS})`,
        headers: [
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(self), accelerometer=(self), interest-cohort=()",
          },
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
      // JS, CSS y fuente llevan huella en el nombre: no cambian nunca.
      {
        source: `/tooli/:app(${TOOLI_WEBS})/assets/:file*`,
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      // Clips, pósters e íconos no llevan huella: una semana.
      {
        source: `/tooli/:app(${TOOLI_WEBS})/:dir(medios)/:file*`,
        headers: [{ key: "Cache-Control", value: "public, max-age=604800" }],
      },
    ];
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

      // El perfil de Angel usaba un apodo como slug y ya estaba en el sitemap.
      // Al pasar a nombre-apellido, la URL vieja daria 404: este 301 conserva
      // lo indexado y los enlaces que alguien haya compartido.
      {
        source: "/team/nino-nina",
        destination: "/team/angel-acero",
        permanent: true,
      },
    ];
  },

  // tooli.sentralabs.co sirve las páginas de /tooli (la de inicio y la
  // política de privacidad que pide Google Play): tooli.sentralabs.co/privacidad
  // es sentralabs.co/tooli/privacidad. No se tocan las rutas que ya empiezan
  // por /tooli, los archivos de Next, la API ni los archivos de la raíz
  // (imágenes, robots, sitemap, tarjetas Open Graph). Como en los redirects de
  // arriba, depende de que Nginx reenvíe el Host original.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source:
            "/:ruta((?!tooli|_next|api|favicon|icon|images|opengraph-image|robots\\.txt|sitemap\\.xml).*)",
          has: [{ type: "host", value: "tooli.sentralabs.co" }],
          destination: "/tooli/:ruta",
        },
        // La página de cada app: /tooli/unisinu → public/tooli/unisinu/index.html
        {
          source: `/tooli/:app(${TOOLI_WEBS})`,
          destination: "/tooli/:app/index.html",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
