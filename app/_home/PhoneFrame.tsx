import Image from "next/image";
import type { Project } from "../content/projects";
import styles from "./PhoneFrame.module.css";

/**
 * Telefono dibujado con CSS. Sirve en el escaparate y como respaldo del hero
 * cuando no hay 3D (sin WebGL, movimiento reducido o ahorro de datos).
 * Con `src` muestra una captura; sin ella, la pantalla de inicio del proyecto.
 */
export function PhoneFrame({
  project,
  src,
  alt = "",
  sizes = "(max-width: 900px) 40vw, 240px",
  priority = false,
  className = "",
}: {
  /** Sin proyecto, la pantalla queda en blanco (el hueco libre del hero). */
  project?: Project;
  src?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`${styles.phone} ${className}`}>
      <div className={styles.screen}>
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} preload={priority} className={styles.shot} />
        ) : project ? (
          <Splash project={project} />
        ) : (
          <div className={styles.blank} />
        )}
      </div>
      <span className={styles.island} aria-hidden="true" />
    </div>
  );
}

function Splash({ project }: { project: Project }) {
  return (
    <div
      className={styles.splash}
      style={{ background: `linear-gradient(170deg, ${project.splash.from}, ${project.splash.to})` }}
    >
      <ProjectMark project={project} size={88} />
      <strong className={styles.splashName}>{project.name}</strong>
    </div>
  );
}

/** Logo del proyecto, o su monograma si no tiene logo. */
export function ProjectMark({ project, size = 44 }: { project: Project; size?: number }) {
  if (project.logo && project.logoBg) {
    // Logo transparente: va sobre una tesela para que se lea en fondo oscuro.
    return (
      <span className={styles.tile} style={{ width: size, height: size, background: project.logoBg }} aria-hidden="true">
        <Image src={project.logo} alt="" width={size} height={size} style={{ width: "78%", height: "78%" }} />
      </span>
    );
  }
  if (project.logo) {
    return (
      <Image
        src={project.logo}
        alt=""
        width={size}
        height={size}
        className={styles.mark}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className={styles.monogram}
      style={{
        width: size,
        height: size,
        background: project.accent,
        fontSize: size * (project.monogram.length > 1 ? 0.36 : 0.48),
      }}
      aria-hidden="true"
    >
      {project.monogram}
    </span>
  );
}

/**
 * Ventana de navegador en CSS para los proyectos web. `url` es solo la
 * etiqueta de la barra de direcciones.
 */
export function BrowserFrame({
  src,
  url,
  project,
  alt = "",
  sizes = "(max-width: 900px) 80vw, 560px",
  priority = false,
  className = "",
}: {
  src?: string;
  url: string;
  /** Si no hay captura, se dibuja la pantalla de inicio de este proyecto. */
  project?: Project;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`${styles.browser} ${className}`}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.url}>{url}</span>
      </div>
      <div className={styles.view}>
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} preload={priority} className={styles.shot} />
        ) : project ? (
          <Splash project={project} />
        ) : null}
      </div>
    </div>
  );
}
