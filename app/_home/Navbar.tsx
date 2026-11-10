"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Lang, Translations } from "../i18n/dictionaries";
import { readStoredOption, writeStoredOption } from "../lib/sanitize";
import styles from "./Navbar.module.css";

/* Valores válidos del tema: cualquier otra cosa en localStorage se ignora. */
const THEMES = ["dark", "light"] as const;
type Theme = (typeof THEMES)[number];

/**
 * Barra flotante ("isla"). En movil no hay menu hamburguesa: quedan el logo,
 * el idioma, el tema y una sola accion. Los enlaces son anclas de la misma
 * pagina, asi que esconderlos no deja nada inaccesible.
 */
export function Navbar({
  lang,
  t,
  base = "",
  showLang = true,
}: {
  lang: Lang;
  t: Translations["nav"];
  /** Prefijo de las anclas: "" en la home, "/" en las demas paginas. */
  base?: string;
  /** Las paginas sin version en ingles no muestran el cambio de idioma. */
  showLang?: boolean;
}) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const saved = readStoredOption("theme", THEMES, "dark");
    setTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    writeStoredOption("theme", next, THEMES);
  };

  const links = [
    { href: `${base}#proyectos`, label: t.projects },
    { href: `${base}#como-trabajamos`, label: t.how },
    { href: `${base}#equipo`, label: t.team },
    { href: `${base}#preguntas`, label: t.faq },
  ];

  return (
    <header className={styles.bar} data-scrolled={scrolled}>
      <a href={`${base}#inicio`} className={styles.logo} aria-label={t.home}>
        <Image
          src={theme === "dark" ? "/logo-dark.png" : "/logo-light.png"}
          alt="SentraLabs"
          width={102}
          height={36}
          priority
          style={{ height: 30, width: "auto" }}
        />
      </a>

      <nav aria-label={lang === "es" ? "Secciones" : "Sections"} className={styles.nav}>
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>

      <div className={styles.tools}>
        {/* Enlace, no botón: cada idioma tiene su propia URL indexable. */}
        {showLang && (
          <Link
            href={lang === "es" ? "/en" : "/"}
            hrefLang={lang === "es" ? "en" : "es"}
            className={styles.icon}
            aria-label={t.langSwitch}
          >
            {lang === "es" ? "EN" : "ES"}
          </Link>
        )}
        <button
          type="button"
          className={styles.icon}
          onClick={toggleTheme}
          aria-label={theme === "dark" ? t.themeLight : t.themeDark}
        >
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
        <a href={`${base}#contacto`} className={styles.cta}>
          {t.cta}
        </a>
      </div>
    </header>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}
