import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTeamMember, getAllSlugs } from "../data";
import { safeMailto, safeUrl, sanitizeSlug } from "../../lib/sanitize";
import { JsonLd } from "../../lib/JsonLd";
import { SITE_URL, absoluteUrl } from "../../lib/site";
import { SitePage } from "../../_site/SitePage";
import { translations } from "../../i18n/dictionaries";
import styles from "./Profile.module.css";

export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const member = getTeamMember(sanitizeSlug(slug));
    if (!member) return { title: "Miembro no encontrado" };

    const title = `${member.name} — ${member.role} en SentraLabs`;
    const url = `/team/${member.slug}`;
    return {
        title,
        description: member.oneLiner,
        alternates: { canonical: url },
        openGraph: {
            title,
            description: member.oneLiner,
            url,
            type: "profile",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: member.oneLiner,
        },
    };
}

export default async function ProfilePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const member = getTeamMember(sanitizeSlug(slug));
    if (!member) notFound();

    const profileUrl = absoluteUrl(`/team/${member.slug}`);

    /* Person: le dice a Google quien firma el contenido (páginas de autor). */
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${profileUrl}#person`,
        name: member.name,
        jobTitle: member.role,
        description: member.oneLiner,
        image: absoluteUrl(member.image),
        url: profileUrl,
        knowsAbout: member.skills,
        worksFor: { "@id": `${SITE_URL}/#organization` },
        sameAs: [member.socials.github, member.socials.linkedin].filter(
            (link): link is string => Boolean(safeUrl(link))
        ),
    };

    /* Breadcrumbs: la ruta Inicio → Equipo → Persona que sale en el buscador. */
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Equipo", item: absoluteUrl("/#equipo") },
            { "@type": "ListItem", position: 3, name: member.name, item: profileUrl },
        ],
    };

    const role = translations.es.team.roles[member.role] ?? member.role;

    return (
        <SitePage>
            <JsonLd data={personSchema} />
            <JsonLd data={breadcrumbSchema} />

            <header className={styles.head}>
                <div className="wrap">
                    {/* Breadcrumb: misma ruta que declara el BreadcrumbList de arriba. */}
                    <nav aria-label="Ruta de navegación" className={styles.crumbs}>
                        <Link href="/">Inicio</Link>
                        <span aria-hidden="true">/</span>
                        <Link href="/#equipo">Equipo</Link>
                        <span aria-hidden="true">/</span>
                        <span aria-current="page">{member.name}</span>
                    </nav>

                    <div className={styles.identity}>
                        <Image
                            src={member.image}
                            alt={`${member.name}, ${role} en SentraLabs`}
                            width={160}
                            height={160}
                            className={styles.photo}
                            preload
                        />
                        <div>
                            <span className="kicker">{role}</span>
                            <h1 className={styles.name}>{member.name}</h1>
                            <p className={styles.oneLiner}>{member.oneLiner}</p>
                            <ul className={styles.socials}>
                                {safeUrl(member.socials.github) && (
                                    <li>
                                        <a href={safeUrl(member.socials.github)} target="_blank" rel="noopener noreferrer">
                                            GitHub <span aria-hidden="true">↗</span>
                                        </a>
                                    </li>
                                )}
                                {safeUrl(member.socials.linkedin) && (
                                    <li>
                                        <a href={safeUrl(member.socials.linkedin)} target="_blank" rel="noopener noreferrer">
                                            LinkedIn <span aria-hidden="true">↗</span>
                                        </a>
                                    </li>
                                )}
                                {safeMailto(member.socials.email) && (
                                    <li>
                                        <a href={safeMailto(member.socials.email)}>{member.socials.email}</a>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </header>

            <div className={`wrap ${styles.body}`}>
                {member.bio && <p className={styles.bio}>{member.bio}</p>}

                {member.highlights.length > 0 && (
                    <section className={styles.section}>
                        <h2>Destacados</h2>
                        <ul className={styles.rows}>
                            {member.highlights.map((h) => (
                                <li key={h.title}>
                                    <h3>{h.title}</h3>
                                    <p>{h.description}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Sin enlaces a repositorios ni tecnologias por proyecto, como en la home. */}
                {member.projects.length > 0 && (
                    <section className={styles.section}>
                        <h2>Proyectos</h2>
                        <ul className={styles.rows}>
                            {member.projects.map((p) => (
                                <li key={p.name}>
                                    <h3>{p.name}</h3>
                                    <p>{p.description}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {member.skills.length > 0 && (
                    <section className={styles.section}>
                        <h2>Habilidades</h2>
                        <ul className={styles.chips}>
                            {member.skills.map((s) => (
                                <li key={s}>{s}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {member.awards && member.awards.length > 0 && (
                    <section className={styles.section}>
                        <h2>Premios</h2>
                        <ul className={styles.rows}>
                            {member.awards.map((a) => (
                                <li key={a}>
                                    <h3>{a}</h3>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {member.certifications && member.certifications.length > 0 && (
                    <section className={styles.section}>
                        <h2>Certificaciones</h2>
                        <ul className={styles.rows}>
                            {member.certifications.map((c) => (
                                <li key={c.title} className={styles.cert}>
                                    <div>
                                        <h3>{c.title}</h3>
                                        <p>{c.issuer}</p>
                                    </div>
                                    {safeUrl(c.link) && (
                                        <a href={safeUrl(c.link)} target="_blank" rel="noopener noreferrer">
                                            Ver certificado <span aria-hidden="true">↗</span>
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </div>
        </SitePage>
    );
}
