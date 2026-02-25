"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { I18nProvider, useI18n } from "./i18n/context";

/* ────────────────── Navbar ────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const { t, lang, setLang } = useI18n();

  const links = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.team, href: "#team" },
  ];

  return (
    <header
      className="navbar"
      style={{
        background: scrolled
          ? theme === "dark" ? "rgba(10,10,15,0.85)" : "rgba(255,255,255,0.85)"
          : theme === "dark" ? "rgba(10,10,15,0.65)" : "rgba(255,255,255,0.65)",
      }}
    >
      <div className="navbar-inner">
        <a href="#hero" className="nav-logo">
          <span className="logo-dot" />
          SentraLabs
        </a>

        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menú"
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            className="theme-toggle"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            aria-label="Cambiar idioma"
            style={{ fontSize: "0.75rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Cambiar tema"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
            {t.nav.contact}
          </a>
        </div>
      </div>
    </header>
  );
}

/* ────────────────── Hero + Code Window ────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

function Hero() {
  const { t } = useI18n();
  return (
    <section className="hero section" id="hero">
      <div className="container">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-tagline" variants={fadeUp} custom={0}>
            {t.hero.tagline1} {t.hero.tagline2}{" "}
            <span className="word-accent">{t.hero.tagline3}</span>
          </motion.h1>

          <motion.p className="hero-sub" variants={fadeUp} custom={1}>
            {t.hero.sub}
          </motion.p>

          <motion.div className="hero-ctas" variants={fadeUp} custom={2}>
            <a href="mailto:atencionsentralabs@gmail.com" className="btn-primary">
              {t.hero.cta1}
            </a>
            <a href="#projects" className="btn-secondary">
              {t.hero.cta2}
            </a>
          </motion.div>

          <motion.div variants={fadeUp} custom={3}>
            <CodeWindow />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function CodeWindow() {
  const { t } = useI18n();
  return (
    <div className="code-window">
      <div className="code-titlebar">
        <span className="code-dot red" />
        <span className="code-dot yellow" />
        <span className="code-dot green" />
        <span className="code-filename">{t.code.filename}</span>
      </div>
      <div className="code-body">
        <pre>
          <span className="cm">{t.code.comment}</span>
          {"\n"}
          <span className="kw">const</span>{" "}
          <span className="var">project</span>{" "}
          <span className="op">=</span>{" "}
          <span className="kw">await</span>{" "}
          <span className="fn">SentraLabs</span>
          <span className="op">.</span>
          <span className="fn">create</span>
          <span className="op">({"{"}</span>
          {"\n"}
          {"  "}
          <span className="var">nombre</span>
          <span className="op">:</span>{" "}
          <span className="str">{'"Tu Idea"'}</span>
          <span className="op">,</span>
          {"\n"}
          {"  "}
          <span className="var">stack</span>
          <span className="op">:</span>{" "}
          <span className="op">[</span>
          <span className="str">{'"React"'}</span>
          <span className="op">,</span>{" "}
          <span className="str">{'"Node"'}</span>
          <span className="op">,</span>{" "}
          <span className="str">{'"Cloud"'}</span>
          <span className="op">],</span>
          {"\n"}
          {"  "}
          <span className="var">lanzamiento</span>
          <span className="op">:</span>{" "}
          <span className="str">{'"production"'}</span>
          {"\n"}
          <span className="op">{"}"})</span>
          <span className="op">;</span>
          {"\n\n"}
          <span className="fn">console</span>
          <span className="op">.</span>
          <span className="fn">log</span>
          <span className="op">(</span>
          <span className="var">project</span>
          <span className="op">.</span>
          <span className="var">status</span>
          <span className="op">)</span>
          <span className="op">;</span>
          {"\n"}
          <span className="cm">{"// → 🚀 Deployed"}</span>
          <span className="cursor" />
        </pre>
      </div>
    </div>
  );
}

/* ────────────────── Animated Counter Hook ────────────────── */
function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ────────────────── About ────────────────── */
function About() {
  const { t } = useI18n();
  const projects = useCountUp(3);
  const devs = useCountUp(4);
  const awards = useCountUp(2);

  const stats = [
    { ref: projects.ref, value: `${projects.count}+`, label: t.about.stats.projects, color: "blue" as const },
    { ref: devs.ref, value: `${devs.count}`, label: t.about.stats.devs, color: "purple" as const },
    { ref: awards.ref, value: `${awards.count}`, label: t.about.stats.awards, color: "green" as const },
  ];

  return (
    <section className="section" id="about">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">{t.about.label}</span>
          <h2 className="section-title">{t.about.title}</h2>
          <p className="section-desc">{t.about.desc}</p>
        </motion.div>

        <div className="about-grid">
          {stats.map((s, i) => (
            <motion.div
              className="about-stat"
              key={s.label}
              ref={s.ref}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <div className={`stat-value ${s.color}`}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────── Services ────────────────── */
const services = [
  { icon: "📱", title: "Desarrollo Móvil", desc: "Apps nativas y multiplataforma con Flutter. Diseño intuitivo, rendimiento nativo y deploy en iOS y Android." },
  { icon: "🌐", title: "Desarrollo Web", desc: "Sitios y aplicaciones web modernas con Next.js, React y TypeScript. Rápidos, escalables y optimizados para SEO." },
  { icon: "🤖", title: "Inteligencia Artificial", desc: "Chatbots, asistentes virtuales y automatización con OpenAI. Integración de IA en productos existentes." },
  { icon: "🔒", title: "Ciberseguridad", desc: "Plataformas de formación, análisis de vulnerabilidades y soluciones de seguridad digital para empresas." },
];

function Services() {
  const { t } = useI18n();
  const icons = ["📱", "🌐", "🤖", "🔒"];
  return (
    <section className="section" id="services">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">{t.services.label}</span>
          <h2 className="section-title">{t.services.title}</h2>
          <p className="section-desc">{t.services.desc}</p>
        </motion.div>

        <div className="services-grid">
          {t.services.items.map((s, i) => (
            <motion.div
              className="service-card"
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <span className="service-icon">{icons[i]}</span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ────────────────── FAQ ────────────────── */
const faqs = [
  { q: "¿Qué tipo de proyectos desarrollan?", a: "Desarrollamos aplicaciones móviles (Flutter), sitios web (Next.js/React), plataformas con IA (OpenAI) y soluciones de ciberseguridad. Desde MVPs hasta productos completos." },
  { q: "¿Cuánto tiempo tarda un proyecto?", a: "Depende de la complejidad. Un MVP puede estar listo en 4-8 semanas. Proyectos más complejos pueden tomar 3-6 meses. Siempre damos una estimación detallada antes de empezar." },
  { q: "¿Cómo es el proceso de trabajo?", a: "Seguimos un flujo ágil: descubrimiento → diseño → desarrollo → pruebas → lanzamiento. Mantenemos comunicación constante y entregas incrementales." },
  { q: "¿Ofrecen mantenimiento post-lanzamiento?", a: "Sí. Ofrecemos planes de mantenimiento y soporte continuo. Actualizaciones, corrección de bugs, nuevas features y monitoreo." },
  { q: "¿Trabajan con clientes fuera de Colombia?", a: "Sí, trabajamos de forma remota con clientes de cualquier parte del mundo. La comunicación es principalmente en español e inglés." },
];

function FAQ() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section" id="faq">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">{t.faq.label}</span>
          <h2 className="section-title">{t.faq.title}</h2>
        </motion.div>

        <div className="faq-list">
          {t.faq.items.map((f, i) => (
            <motion.div
              className={`faq-item ${open === i ? "faq-open" : ""}`}
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <button
                className="faq-question"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="faq-arrow">{open === i ? "▼" : "▶"}</span>
                {f.q}
              </button>
              {open === i && (
                <p className="faq-answer">{f.a}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────── Projects ────────────────── */
const projects = [
  {
    image: "/images/projects/icon.webp",
    name: "TransCar",
    desc: "App de transporte urbano en Cartagena. Mapa interactivo con rutas en tiempo real, ETAs en vivo, chatbot con IA (GPT-4), consulta de saldo y noticias del sistema.",
    tags: ["Flutter", "Mapbox", "OpenAI", "En desarrollo"],
    links: [
      { label: "GitHub →", href: "https://github.com/Manuuell/Trascaribe-APP" },
    ],
    mockups: [
      "/images/projects/transcar/mockup1.webp",
      "/images/projects/transcar/mockup2.webp",
      "/images/projects/transcar/mockup3.webp",
    ],
  },
  {
    image: "/images/projects/marsec_logo.webp",
    name: "MarSec",
    desc: "Plataforma de ciberseguridad para embarcaciones. Lecciones interactivas, cuestionarios y asistente virtual 'Capitán Ciber' con IA.",
    tags: ["Node.js", "Flutter", "SQL Server", "Azure"],
    links: [
      { label: "GitHub →", href: "https://github.com/Manuuell/MarSec" },
    ],
    mockups: [
      "/images/projects/marsec/mockup1.webp",
      "/images/projects/marsec/mockup2.webp",
      "/images/projects/marsec/mockup3.webp",
    ],
  },
  {
    image: "",
    name: "EcoOne",
    desc: "App móvil multiplataforma que incentiva el reciclaje urbano con EcoCoins — moneda digital ecológica. Conecta ciudadanos, operadores, comercios y administradores. Chatbot IA, gestión de QR, billetera digital y mapa de centros.",
    tags: ["Flutter", "Clean Architecture", "OpenAI", "Firebase"],
    links: [
      { label: "GitHub →", href: "https://github.com/Manuuell/EcoOnee" },
    ],
    mockups: [
      "/images/projects/ecoone/mockup1e.webp",
      "/images/projects/ecoone/mockup2e.webp",
      "/images/projects/ecoone/mockup3e.webp",
    ],
  },
];

function Projects() {
  const { t } = useI18n();
  const [lightbox, setLightbox] = useState<string | null>(null);
  return (
    <>
      {lightbox && (
        <div className="lightbox-overlay" onClick={() => setLightbox(null)}>
          <button className="lightbox-close" onClick={() => setLightbox(null)}>✕</button>
          <div className="lightbox-phone" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-screen">
              <Image src={lightbox} alt="Screenshot" fill style={{ objectFit: "cover" }} />
            </div>
          </div>
        </div>
      )}
      <section className="section" id="projects">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="section-label">{t.projects.label}</span>
            <h2 className="section-title">{t.projects.title}</h2>
            <p className="section-desc">{t.projects.desc}</p>
          </motion.div>

          <div className="projects-grid">
            {projects.map((p, i) => (
              <motion.div
                className="project-card"
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
              >
                <div className="project-icon">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={48}
                      height={48}
                      style={{ borderRadius: "12px", objectFit: "cover" }}
                    />
                  ) : (
                    <span style={{ fontSize: "1.5rem" }}>🌿</span>
                  )}
                </div>
                <div className="project-info">
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                  {p.links.length > 0 && (
                    <div className="project-links">
                      {p.links.map((l) => (
                        <a
                          href={l.href}
                          className="project-link"
                          key={l.label}
                          target="_blank"
                          rel="noopener"
                        >
                          {l.label}
                        </a>
                      ))}
                    </div>
                  )}
                  {/* Phone Mockups */}
                  {"mockups" in p && (p as { mockups?: string[] }).mockups && (
                    <div className="mockup-gallery">
                      {((p as { mockups?: string[] }).mockups ?? []).map((src, idx) => (
                        <div className="phone-mockup" key={idx} onClick={() => setLightbox(src)} style={{ cursor: "pointer" }}>
                          <div className="phone-screen">
                            <Image
                              src={src}
                              alt={`${p.name} screenshot ${idx + 1}`}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

/* ────────────────── Team ────────────────── */
const team = [
  {
    slug: "manuel-esteban",
    name: "Manuel Esteban",
    role: "Fundador",
    image: "/images/team/miembro1.webp",
    github: "https://github.com/Manuuell",
    linkedin: "https://www.linkedin.com/in/manuuell/",
  },
  {
    slug: "nino-nina",
    name: "Niño Niña",
    role: "Co-founder / Dev",
    image: "/images/team/miembro2.webp",
    github: "https://github.com/Angelsistemas7",
    linkedin: "",
  },
  {
    slug: "matamba",
    name: "Matamba",
    role: "Database Manager",
    image: "/images/team/miembro3.webp",
    github: "https://github.com/Javimercadobolivar",
    linkedin: "https://www.linkedin.com/in/javier-enrique-mercado-bolivar-203781359/",
  },
  {
    slug: "jerson-diaz",
    name: "Jerson Diaz",
    role: "Developer",
    image: "/images/team/miembro4.webp",
    github: "https://github.com/jerdiaz",
    linkedin: "",
  },
];

function Team() {
  const { t } = useI18n();
  return (
    <section className="section" id="team">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">{t.team.label}</span>
          <h2 className="section-title">{t.team.title}</h2>
          <p className="section-desc">{t.team.desc}</p>
        </motion.div>

        <div className="team-grid">
          {team.map((m, i) => (
            <motion.div
              className="team-card"
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Link href={`/team/${m.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div className="team-avatar">
                  <Image
                    src={m.image}
                    alt={m.name}
                    width={80}
                    height={80}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                </div>
                <h3 className="team-name">{m.name}</h3>
                <p className="team-role">{m.role}</p>
              </Link>
              <div className="team-links">
                {m.github && (
                  <a href={m.github} target="_blank" rel="noopener" aria-label="GitHub">GitHub</a>
                )}
                {m.linkedin && (
                  <a href={m.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn">LinkedIn</a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────── Contact ────────────────── */
function Contact() {
  const { t } = useI18n();
  return (
    <section className="section" id="contact">
      <div className="container">
        <motion.div
          className="contact-box"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="contact-title">{t.contact.title}</h2>
          <p className="contact-desc">{t.contact.desc}</p>
          <a href="mailto:atencionsentralabs@gmail.com" className="contact-email">
            ✉ atencionsentralabs@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ────────────────── Footer ────────────────── */
function Footer() {
  const { t } = useI18n();
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          © {new Date().getFullYear()} SentraLabs. {t.footer.rights}
        </p>
        <div className="footer-links">
          <a href="mailto:atencionsentralabs@gmail.com">Email</a>
          <Link href="/privacidad">{t.footer.privacy}</Link>
          <Link href="/terminos">{t.footer.terms}</Link>
          <a href="#hero">{t.footer.home}</a>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────── Terminal Easter Egg ────────────────── */
const terminalCommands: Record<string, string> = {
  help: "Comandos: help, projects, team, contact, skills, clear",
  projects: "→ TransCar — App de transporte urbano en Cartagena\n→ MarSec — Plataforma de ciberseguridad (🏆 Mejor Proyecto TalentoTech)\n→ EcoOne — Reciclaje con EcoCoins",
  team: "→ Manuel Esteban — Fundador\n→ Niño Niña — Co-founder / Dev\n→ Matamba — Database Manager\n→ Jerson Diaz — Developer",
  contact: "→ Email: atencionsentralabs@gmail.com\n→ WhatsApp: +57 321 564 0735\n→ GitHub: github.com/Manuuell",
  skills: "Flutter · React · Next.js · TypeScript · Node.js · Firebase · Azure · OpenAI · SQL Server · Mapbox",
};

function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ cmd: string; output: string }[]>([
    { cmd: "", output: "Bienvenido a SentraLabs Terminal v1.0\nEscribe 'help' para ver los comandos." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "`" && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    const output = terminalCommands[cmd] || `Comando no encontrado: '${cmd}'. Escribe 'help'.`;
    setHistory((h) => [...h, { cmd: input, output }]);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div className="terminal-overlay" onClick={() => setIsOpen(false)}>
      <div className="terminal-window" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-titlebar">
          <span className="code-dot red" />
          <span className="code-dot yellow" />
          <span className="code-dot green" />
          <span className="terminal-title">sentralabs@web:~$</span>
          <button className="terminal-close" onClick={() => setIsOpen(false)}>✕</button>
        </div>
        <div className="terminal-body" ref={scrollRef}>
          {history.map((h, i) => (
            <div key={i}>
              {h.cmd && (
                <p className="terminal-cmd">
                  <span className="terminal-prompt">{'>'}</span> {h.cmd}
                </p>
              )}
              <pre className="terminal-output">{h.output}</pre>
            </div>
          ))}
          <form onSubmit={handleSubmit} className="terminal-input-line">
            <span className="terminal-prompt">{'>'}</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="terminal-input"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </div>
  );
}


/* ────────────────── Page ────────────────── */
export default function Home() {
  return (
    <I18nProvider>
      <div className="page-content">
        <TerminalEasterEgg />

        <Navbar />
        <Hero />
        <hr className="divider" />
        <About />
        <hr className="divider" />
        <Services />
        <hr className="divider" />
        <Projects />
        <hr className="divider" />
        <Team />
        <hr className="divider" />
        <FAQ />
        <hr className="divider" />
        <Contact />
        <Footer />

        {/* WhatsApp Float */}
        <a
          href="https://wa.me/573215640735"
          target="_blank"
          rel="noopener"
          className="whatsapp-float"
          aria-label="Chat en WhatsApp"
        >
          <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
            <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.502 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958a15.907 15.907 0 008.832 2.666C24.826 31.998 32 24.822 32 16.004 32 7.176 24.826 0 16.004 0zm9.318 22.614c-.396 1.114-1.956 2.038-3.21 2.308-.856.182-1.974.328-5.738-1.234-4.818-1.998-7.92-6.882-8.162-7.202-.232-.32-1.95-2.6-1.95-4.96s1.234-3.52 1.672-4.002c.438-.482.954-.602 1.272-.602.318 0 .636.004.914.016.294.014.688-.112 1.078.822.396.954 1.352 3.312 1.47 3.554.118.242.198.524.04.844-.158.32-.238.52-.478.802-.24.282-.504.63-.72.844-.238.24-.488.498-.21.976.278.478 1.234 2.036 2.65 3.298 1.82 1.622 3.354 2.124 3.832 2.362.478.238.756.198 1.034-.118.278-.318 1.194-1.392 1.512-1.872.318-.478.636-.398 1.074-.238.438.158 2.794 1.318 3.272 1.558.478.238.796.358.914.558.118.198.118 1.154-.278 2.27z" />
          </svg>
        </a>
      </div>
    </I18nProvider>
  );
}
