"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { es, type Translations } from "./es";
import { en } from "./en";

type Lang = "es" | "en";

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
        const saved = localStorage.getItem("lang") as Lang | null;
        if (saved && (saved === "es" || saved === "en")) {
            setLangState(saved);
        }
    }, []);

    const setLang = (l: Lang) => {
        setLangState(l);
        localStorage.setItem("lang", l);
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
