/** Datos del sitio que se repiten en metadatos, sitemap, robots y JSON-LD. */

/* Dominio canonico. Ojo: es .co — sentralabs.com es un dominio ajeno. */
export const SITE_URL = "https://sentralabs.co";

export const SITE_NAME = "SentraLabs";

export const SITE_DESCRIPTION =
  "Estudio de desarrollo de software a medida en Cartagena. Creamos apps móviles con Flutter, plataformas web con Next.js e integraciones de IA, del MVP al lanzamiento.";

export const SITE_TITLE =
  "Desarrollo de software a medida en Cartagena — SentraLabs";

export const SITE_TITLE_EN =
  "Custom software development in Cartagena — SentraLabs";

export const SITE_DESCRIPTION_EN =
  "Custom software development studio in Cartagena, Colombia. Flutter mobile apps, Next.js web platforms and AI integrations, from MVP to launch.";

export const SITE_TAGLINE = "Creamos el software que tu idea necesita.";

export const CONTACT_EMAIL = "atencionsentralabs@gmail.com";

/** URL absoluta a partir de una ruta interna ("/privacidad" -> "https://..."). */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).href;
}
