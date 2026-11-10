import { es, type Translations } from "./es";
import { en } from "./en";

/* Sin "use client": los Server Components leen los textos de aqui. El
   contexto de React (context.tsx) queda solo para las piezas interactivas. */

/* Idiomas válidos: cualquier otro valor recibido cae en "es". */
export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];

export const translations: Record<Lang, Translations> = { es, en };

export type { Translations };
