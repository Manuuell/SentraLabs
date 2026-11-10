import Link from "next/link";
import type { ReactNode } from "react";
import { SitePage } from "./SitePage";
import styles from "./Legal.module.css";

/** Pagina legal: cabecera con titulo y fecha, y el texto en columna de lectura. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <SitePage>
      <header className={styles.head}>
        <div className="wrap">
          <Link href="/" className={styles.back}>
            ← Volver al inicio
          </Link>
          <span className={`kicker ${styles.kicker}`}>Legal</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.updated}>Última actualización: {updated}</p>
        </div>
      </header>
      <article className={`wrap ${styles.prose}`}>{children}</article>
    </SitePage>
  );
}
