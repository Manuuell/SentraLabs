"use client";

import { createContext, useContext, type ReactNode } from "react";
import { es } from "./es";
import { LANGS, translations, type Lang, type Translations } from "./dictionaries";
import { sanitizeOption } from "../lib/sanitize";

export { LANGS, translations };
export type { Lang };

interface I18nContextType {
    lang: Lang;
    t: Translations;
}

const I18nContext = createContext<I18nContextType>({
    lang: "es",
    t: es,
});

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
