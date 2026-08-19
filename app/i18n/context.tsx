"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { es, type Translations } from "./es";
import { en } from "./en";
import { readStoredOption, sanitizeOption, writeStoredOption } from "../lib/sanitize";

/* Idiomas válidos: cualquier otro valor guardado o recibido cae en "es". */
const LANGS = ["es", "en"] as const;
type Lang = (typeof LANGS)[number];

interface I18nContextType {
    lang: Lang;
    t: Translations;
    setLang: (lang: Lang) => void;
}

const I18nContext = createContext<I18nContextType>({
    lang: "es",
    t: es,
    setLang: () => { },
});

const translations: Record<Lang, Translations> = { es, en };

export function I18nProvider({ children }: { children: ReactNode }) {
    const [lang, setLangState] = useState<Lang>("es");

    useEffect(() => {
        setLangState(readStoredOption("lang", LANGS, "es"));
    }, []);

    const setLang = (l: Lang) => {
        const safe = sanitizeOption(l, LANGS, "es");
        setLangState(safe);
        writeStoredOption("lang", safe, LANGS);
    };

    return (
        <I18nContext.Provider value={{ lang, t: translations[lang], setLang }}>
            {children}
        </I18nContext.Provider>
    );
}

export function useI18n() {
    return useContext(I18nContext);
}
