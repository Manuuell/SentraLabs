import Image from "next/image";
import Link from "next/link";
import type { Translations } from "../i18n/dictionaries";
import { teamMembers } from "../team/data";
import styles from "./Team.module.css";

/**
 * Banda partida: la carta del fundador a la izquierda y las fotos del equipo
 * llegando al borde derecho de la pantalla (el "quien te ensena" de nativosia).
 * Los datos salen de app/team/data.ts, la misma fuente de los perfiles.
 */
export function Team({ t }: { t: Translations["team"] }) {
  return (
    <section className={styles.team} id="equipo">
      <div className={styles.text}>
        <span className="kicker">{t.kicker}</span>
        <h2 className={`h2 ${styles.title}`}>{t.title}</h2>
        <blockquote className={styles.letter}>
          <p>{t.letter}</p>
        </blockquote>
      </div>
      <ul className={styles.grid}>
        {teamMembers.map((m) => {
          const role = t.roles[m.role] ?? m.role;
          return (
            <li key={m.slug}>
              <Link href={`/team/${m.slug}`} className={styles.member} aria-label={`${m.name}, ${role}. ${t.profile}`}>
                <Image
                  src={m.image}
                  alt={`${m.name}, ${role} en SentraLabs`}
                  fill
                  sizes="(max-width: 900px) 50vw, 25vw"
                  className={styles.photo}
                />
                <span className={styles.caption}>
                  <strong>{m.name}</strong>
                  <span>{role}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
