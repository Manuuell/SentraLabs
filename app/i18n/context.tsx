"use client";

import { createContext, useContext, type ReactNode } from "react";
import { es, type Translations } from "./es";
import { en } from "./en";
import { sanitizeOption } from "../lib/sanitize";

/* Idiomas válidos: cualquier otro valor recibido cae en "es". */
export const LANGS = ["es", "en"] as const;
export type Lang = (typeof LANGS)[number];

interface I18nContextType {
    lang: Lang;
    t: Translations;
}

const I18nContext = createContext<I18nContextType>({
    lang: "es",
    t: es,
});

export const translations: Record<Lang, Translations> = { es, en };

/**
 * El idioma lo manda la URL ("/" en español, "/en" en inglés), no localStorage:
 * así cada versión tiene su propia dirección indexable y el contenido no puede
 * contradecir a la URL que el buscador guardó.
 */
export function I18nProvider({ children, lang }: { children: ReactNode; lang: Lang }) {
    const safe = sanitizeOption(lang, LANGS, "es");

    return (
        <I18nContext.Provider value={{ lang: safe, t: translations[safe] }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    return useContext(I18nContext);
}
