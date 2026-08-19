/** Datos del sitio que se repiten en metadatos, sitemap, robots y JSON-LD. */

/* Dominio canonico. Ojo: es .co — sentralabs.com es un dominio ajeno. */
export const SITE_URL = "https://sentralabs.co";

export const SITE_NAME = "SentraLabs";

export const SITE_DESCRIPTION =
  "SentraLabs es un estudio de desarrollo de software. Creamos, probamos y lanzamos productos digitales a medida.";

export const SITE_TAGLINE = "Creamos el software que tu idea necesita.";

export const CONTACT_EMAIL = "atencionsentralabs@gmail.com";

/** URL absoluta a partir de una ruta interna ("/privacidad" -> "https://..."). */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).href;
}
