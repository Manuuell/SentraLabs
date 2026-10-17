/**
 * Saneamiento de toda entrada que no controlamos: lo que el usuario escribe,
 * lo que viene de localStorage y las URLs que terminan en un href.
 *
 * React ya escapa el texto que renderiza, asi que esto no es una defensa
 * contra XSS por si solo: sirve para que ningun valor externo llegue a un
 * lookup, a un atributo o al estado de la app con una forma que no esperamos.
 */

/* Rangos de caracteres que nunca deberian llegar desde una entrada de texto. */
const UNSAFE_RANGES: ReadonlyArray<readonly [number, number]> = [
  [0x0000, 0x001f], // controles C0 (NUL, saltos de linea, escapes ANSI)
  [0x007f, 0x009f], // DEL y controles C1
  [0x200b, 0x200f], // ancho cero y marcas bidi
  [0x2028, 0x2029], // separadores de linea y de parrafo
  [0x202a, 0x202e], // embeddings y overrides bidi
  [0x2066, 0x2069], // isolates bidi
  [0xfeff, 0xfeff], // BOM / espacio de ancho cero sin salto
];

function isUnsafeCodePoint(code: number): boolean {
  return UNSAFE_RANGES.some(([from, to]) => code >= from && code <= to);
}

/** Quita caracteres peligrosos sin recortar ni truncar. Pensado para onChange. */
export function stripUnsafeChars(value: unknown): string {
  if (typeof value !== "string") return "";
  let out = "";
  for (const char of value) {
    if (!isUnsafeCodePoint(char.codePointAt(0) ?? 0)) out += char;
  }
  return out;
}

/**
 * Normaliza (NFKC colapsa homoglifos y anchos completos), limpia, recorta
 * espacios y limita la longitud. Para el valor final que se usa o se guarda.
 */
export function sanitizeText(value: unknown, maxLength = 200): string {
  if (typeof value !== "string") return "";
  return stripUnsafeChars(value.normalize("NFKC")).trim().slice(0, maxLength);
}

/** Comando de terminal: solo minusculas, digitos, espacio, guion y guion bajo. */
export function sanitizeCommand(value: unknown, maxLength = 64): string {
  return sanitizeText(value, maxLength)
    .toLowerCase()
    .replace(/[^a-z0-9 _-]/g, "");
}

/** Slug de una ruta dinamica: minusculas, digitos y guiones. */
export function sanitizeSlug(value: unknown, maxLength = 80): string {
  return sanitizeText(value, maxLength)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
}

/** Devuelve el valor solo si esta en la lista blanca; si no, el respaldo. */
export function sanitizeOption<T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T
): T {
  return typeof value === "string" && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : fallback;
}

/**
 * Lee una opcion de localStorage validandola contra una lista blanca.
 * El acceso va en try/catch porque lanza si el almacenamiento esta bloqueado.
 */
export function readStoredOption<T extends string>(
  key: string,
  allowed: readonly T[],
  fallback: T
): T {
  if (typeof window === "undefined") return fallback;
  try {
    return sanitizeOption(window.localStorage.getItem(key), allowed, fallback);
  } catch {
    return fallback;
  }
}

/** Escribe en localStorage solo si el valor esta en la lista blanca. */
export function writeStoredOption<T extends string>(
  key: string,
  value: T,
  allowed: readonly T[]
): void {
  if (typeof window === "undefined") return;
  if (!(allowed as readonly string[]).includes(value)) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* almacenamiento lleno o bloqueado: no es critico */
  }
}

/* Protocolos aceptados en un href. Deja fuera javascript:, data: y vbscript:. */
const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

/**
 * Devuelve la URL solo si es navegable de forma segura; si no, el respaldo.
 * Acepta rutas internas ("/team/x"), anclas ("#team") y los protocolos de arriba.
 */
export function safeUrl(value: unknown, fallback = ""): string {
  const raw = stripUnsafeChars(value).trim();
  if (!raw) return fallback;

  // Ruta interna o ancla. "//host" queda fuera: es protocol-relative, no una ruta.
  if (raw.startsWith("#")) return raw;
  if (raw.startsWith("/") && !raw.startsWith("//")) return raw;

  try {
    const url = new URL(raw);
    return SAFE_PROTOCOLS.has(url.protocol) ? url.href : fallback;
  } catch {
    return fallback;
  }
}

/* Forma minima de un correo, sin caracteres que rompan el atributo href. */
const EMAIL_RE = /^[^\s@<>"']+@[^\s@<>"']+\.[a-z]{2,}$/i;

/** Construye un mailto: solo si la direccion tiene forma de correo. */
export function safeMailto(value: unknown, fallback = ""): string {
  const email = sanitizeText(value, 254);
  return EMAIL_RE.test(email) ? `mailto:${email}` : fallback;
}
