"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ────────────────── Navbar ────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Inicio", href: "#hero" },
    { label: "Nosotros", href: "#about" },
    { label: "Proyectos", href: "#projects" },
    { label: "Equipo", href: "#team" },
  ];

  return (
    <header
      className="navbar"
      style={{
        background: scrolled
          ? "rgba(10,10,15,0.85)"
          : "rgba(10,10,15,0.65)",
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

        <a href="#contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
          Contacto
        </a>
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
  return (
    <section className="hero section" id="hero">
      <div className="container">
        <motion.div
          className="hero-content"
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="hero-tagline" variants={fadeUp} custom={0}>
            Creamos. Probamos.{" "}
            <span className="word-accent">Lanzamos.</span>
          </motion.h1>

          <motion.p className="hero-sub" variants={fadeUp} custom={1}>
            Somos un estudio de desarrollo de software. Transformamos tus ideas
            en productos digitales listos para el mundo real.
          </motion.p>

          <motion.div className="hero-ctas" variants={fadeUp} custom={2}>
            <a href="mailto:atencionsentralabs@gmail.com" className="btn-primary">
              Agenda una reunión
            </a>
            <a href="#projects" className="btn-secondary">
              Ver proyectos
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
  return (
    <div className="code-window">
      <div className="code-titlebar">
        <span className="code-dot red" />
        <span className="code-dot yellow" />
        <span className="code-dot green" />
        <span className="code-filename">SentraLabs.tsx</span>
      </div>
      <div className="code-body">
        <pre>
          <span className="cm">{"// Tu próximo proyecto empieza aquí"}</span>
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

/* ────────────────── About ────────────────── */
function About() {
  const stats = [
    { value: "100%", label: "Compromiso", color: "blue" as const },
    { value: "24/7", label: "Soporte", color: "purple" as const },
    { value: "∞", label: "Ideas", color: "green" as const },
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
          <span className="section-label">// nosotros</span>
          <h2 className="section-title">
            Software que resuelve problemas reales
          </h2>
          <p className="section-desc">
            En SentraLabs nos apasiona construir tecnología con propósito.
            Diseñamos, desarrollamos y lanzamos productos digitales que
            impulsan negocios y resuelven necesidades concretas — desde
            aplicaciones web hasta sistemas empresariales completos.
          </p>
        </motion.div>

        <div className="about-grid">
          {stats.map((s, i) => (
            <motion.div
              className="about-stat"
              key={s.label}
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

/* ────────────────── Projects ────────────────── */
const projects = [
  {
    image: "/images/projects/icon.webp",
    name: "TransCar",
    desc: "App oficial de TransCaribe. Mapa interactivo con rutas en tiempo real, ETAs en vivo, chatbot con IA (GPT-4), consulta de saldo y noticias del sistema.",
    tags: ["Flutter", "Mapbox", "OpenAI", "En desarrollo"],
    links: [
      { label: "GitHub →", href: "https://github.com/Manuuell/Trascaribe-APP" },
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
  },
];

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">// proyectos</span>
          <h2 className="section-title">Lo que construimos</h2>
          <p className="section-desc">
            Cada proyecto es una oportunidad de crear algo que importa.
          </p>
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
                      <div className="phone-mockup" key={idx}>
                        <div className="phone-notch" />
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
          <span className="section-label">// equipo</span>
          <h2 className="section-title">Las personas detrás del código</h2>
          <p className="section-desc">
            Un equipo joven, técnico y comprometido con crear soluciones de calidad.
          </p>
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
          <h2 className="contact-title">¿Tienes un proyecto en mente?</h2>
          <p className="contact-desc">
            Cuéntanos tu idea y te ayudamos a hacerla realidad.
            Sin compromisos, solo café y código.
          </p>
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
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          © {new Date().getFullYear()} SentraLabs. Todos los derechos
          reservados.
        </p>
        <div className="footer-links">
          <a href="mailto:atencionsentralabs@gmail.com">Email</a>
          <a href="#hero">Inicio</a>
        </div>
      </div>
    </footer>
  );
}

/* ────────────────── Page ────────────────── */
export default function Home() {
  return (
    <div className="page-content">
      <Navbar />
      <Hero />
      <hr className="divider" />
      <About />
      <hr className="divider" />
      <Projects />
      <hr className="divider" />
      <Team />
      <hr className="divider" />
      <Contact />
      <Footer />
    </div>
  );
}
