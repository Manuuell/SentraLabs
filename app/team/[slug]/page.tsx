import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTeamMember, getAllSlugs } from "../data";
import "../profile.css";

export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const member = getTeamMember(slug);
    if (!member) return { title: "Miembro no encontrado" };
    return {
        title: `${member.name} — SentraLabs`,
        description: member.oneLiner,
    };
}

export default async function ProfilePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const member = getTeamMember(slug);
    if (!member) notFound();

    return (
        <div className="profile-page">
            {/* Back */}
            <Link href="/#team" className="profile-back">
                ← Volver al equipo
            </Link>

            <div className="profile-container">
                {/* Header */}
                <header className="profile-header">
                    <Image
                        src={member.image}
                        alt={member.name}
                        width={100}
                        height={100}
                        className="profile-photo"
                        priority
                    />
                    <div className="profile-identity">
                        <h1>{member.name}</h1>
                        <p className="profile-role">{member.role}</p>
                    </div>
                </header>

                <p className="profile-oneliner">{member.oneLiner}</p>

                {/* Social Links */}
                <div className="profile-socials">
                    {member.socials.github && (
                        <a
                            href={member.socials.github}
                            target="_blank"
                            rel="noopener"
                            className="profile-social-link"
                        >
                            GitHub
                        </a>
                    )}
                    {member.socials.linkedin && (
                        <a
                            href={member.socials.linkedin}
                            target="_blank"
                            rel="noopener"
                            className="profile-social-link"
                        >
                            LinkedIn
                        </a>
                    )}
                    {member.socials.email && (
                        <a
                            href={`mailto:${member.socials.email}`}
                            className="profile-social-link"
                        >
                            Email: {member.socials.email}
                        </a>
                    )}
                </div>

                {/* Bio */}
                {member.bio && (
                    <section className="profile-section">
                        <p className="profile-bio">{member.bio}</p>
                    </section>
                )}

                {/* Highlights */}
                {member.highlights.length > 0 && (
                    <section className="profile-section">
                        <h2 className="profile-section-title">Highlights</h2>
                        <div className="profile-highlights">
                            {member.highlights.map((h) => {
                                const Tag = h.link ? "a" : "div";
                                const linkProps = h.link
                                    ? {
                                        href: h.link,
                                        target: "_blank" as const,
                                        rel: "noopener",
                                    }
                                    : {};
                                return (
                                    <Tag
                                        key={h.title}
                                        className="profile-highlight-card"
                                        {...linkProps}
                                    >
                                        <div className="highlight-info">
                                            <h3>{h.title}</h3>
                                            <p>{h.description}</p>
                                        </div>
                                    </Tag>
                                );
                            })}
                        </div>
                    </section>
                )}

                <hr className="profile-divider" />

                {/* Projects */}
                {member.projects.length > 0 && (
                    <section className="profile-section">
                        <h2 className="profile-section-title">Proyectos</h2>
                        <div className="profile-projects">
                            {member.projects.map((p) => (
                                <div key={p.name} className="profile-project-row">
                                    <div className="project-row-left">
                                        {p.link ? (
                                            <a
                                                href={p.link}
                                                target="_blank"
                                                rel="noopener"
                                                className="project-row-name"
                                            >
                                                {p.name}
                                            </a>
                                        ) : (
                                            <span className="project-row-name">{p.name}</span>
                                        )}
                                        <span className="project-row-dash">—</span>
                                        <span className="project-row-desc">{p.description}</span>
                                    </div>
                                    <div className="project-row-tags">
                                        {p.tags.slice(0, 3).map((t) => (
                                            <span key={t} className="project-row-tag">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {member.skills.length > 0 && (
                    <section className="profile-section">
                        <h2 className="profile-section-title">Stack</h2>
                        <div className="profile-skills">
                            {member.skills.map((s) => (
                                <span key={s} className="profile-skill">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                {/* Awards */}
                {member.awards && member.awards.length > 0 && (
                    <section className="profile-section">
                        <h2 className="profile-section-title">Premios</h2>
                        <div className="profile-awards">
                            {member.awards.map((a) => (
                                <div key={a} className="profile-award-item">
                                    🏆 {a}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {member.certifications && member.certifications.length > 0 && (
                    <section className="profile-section">
                        <h2 className="profile-section-title">Certificaciones</h2>
                        <div className="profile-certifications">
                            {member.certifications.map((c) => (
                                <div key={c.title} className="profile-cert-row">
                                    <div className="cert-info">
                                        <span className="cert-title">{c.title}</span>
                                        <span className="cert-issuer">— {c.issuer}</span>
                                    </div>
                                    {c.link && (
                                        <a
                                            href={c.link}
                                            target="_blank"
                                            rel="noopener"
                                            className="cert-link"
                                        >
                                            ver certificado →
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
