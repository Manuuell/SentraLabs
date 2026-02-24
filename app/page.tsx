"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: [0.4, 0, 0.2, 1] as const },
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
            <a href="mailto:sentralabs@gmail.com" className="btn-primary">
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
    icon: "🚗",
    name: "Transcar",
    desc: "Plataforma de gestión y transporte. Más detalles próximamente.",
    tags: ["En desarrollo"],
    links: [],
  },
  {
    icon: "🧪",
    name: "Próximo Proyecto",
    desc: "Estamos trabajando en nuevas soluciones. ¿Tienes una idea? Hablemos.",
    tags: ["Próximamente"],
    links: [
      { label: "contacto →", href: "mailto:sentralabs@gmail.com" },
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
              <div className="project-icon">{p.icon}</div>
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
  { name: "Miembro 1", role: "Co-founder / Dev", initials: "M1" },
  { name: "Miembro 2", role: "Co-founder / Dev", initials: "M2" },
  { name: "Miembro 3", role: "Designer", initials: "M3" },
  { name: "Miembro 4", role: "Developer", initials: "M4" },
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
              <div className="team-avatar">{m.initials}</div>
              <h3 className="team-name">{m.name}</h3>
              <p className="team-role">{m.role}</p>
              <div className="team-links">
                <a href="#" aria-label="GitHub">GitHub</a>
                <a href="#" aria-label="LinkedIn">LinkedIn</a>
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
          <a href="mailto:sentralabs@gmail.com" className="contact-email">
            ✉ sentralabs@gmail.com
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
          <a href="mailto:sentralabs@gmail.com">Email</a>
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
