"use client";

import { useEffect } from "react";
import type { Lang } from "../i18n/context";

/**
 * Corrige el atributo lang de <html> en las rutas que no son español.
 *
 * El layout raíz es único y sirve las dos versiones, así que el HTML sale
 * siempre con lang="es"; esto lo ajusta al hidratar. Para los buscadores la
 * señal que manda es el hreflang de los metadatos, no este atributo.
 */
export function HtmlLang({ lang }: { lang: Lang }) {
  useEffect(() => {
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "es";
    };
  }, [lang]);

  return null;
}
