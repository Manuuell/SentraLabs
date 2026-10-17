"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "../../i18n/context";
import { safeMailto, safeUrl } from "../../lib/sanitize";
import { localizeMember, type TeamMember, type TimelineItem } from "../data";

function Timeline({ title, items }: { title: string; items: TimelineItem[] }) {
    return (
        <section className="profile-section">
            <h2 className="profile-section-title">{title}</h2>
            <div className="profile-certifications">
                {items.map((item) => (
                    <div key={`${item.title}-${item.org}`} className="profile-cert-row">
                        <div className="cert-info">
                            <span className="cert-title">{item.title}</span>
                            <span className="cert-issuer">— {item.org}</span>
                        </div>
                        {item.period && (
                            <span className="profile-period">{item.period}</span>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default function ProfileView({ member: base }: { member: TeamMember }) {
    const { t, lang } = useI18n();
    const p = t.profile;
    const member = localizeMember(base, lang);
    const role = member.role;
    const home = lang === "en" ? "/en" : "/";
    const otherLang = lang === "es" ? "en" : "es";
    /* Enlace, no botón: cada idioma tiene su propia URL indexable. */
    const otherLangHref =
        otherLang === "en" ? `/en/team/${base.slug}` : `/team/${base.slug}`;

    return (
        <div className="profile-page">
            <div className="profile-topbar">
                {/* Breadcrumb: misma ruta que declara el BreadcrumbList de la página. */}
                <nav aria-label={p.breadcrumbLabel} className="profile-breadcrumb">
                    <Link href={home}>{p.home}</Link>
                    <span aria-hidden="true">/</span>
                    <Link href={`${home}#team`}>{p.team}</Link>
                    <span aria-hidden="true">/</span>
                    <span aria-current="page">{member.name}</span>
                </nav>
                {base.en && (
                    <Link
                        href={otherLangHref}
                        hrefLang={otherLang}
                        className="profile-lang"
                        aria-label={p.switchLangLabel}
                    >
                        {p.switchLang}
                    </Link>
                )}
            </div>

            <div className="profile-container">
                {/* Header */}
                <header className="profile-header">
                    <Image
                        src={member.image}
                        alt={`${member.name}, ${role} ${lang === "en" ? "at" : "en"} SentraLabs`}
                        width={100}
                        height={100}
                        className="profile-photo"
                        priority
                    />
                    <div className="profile-identity">
                        <h1>{member.name}</h1>
                        <p className="profile-role">{role}</p>
                    </div>
                </header>

                <p className="profile-oneliner">{member.oneLiner}</p>

                {/* Social Links */}
                <div className="profile-socials">
                    {safeUrl(member.socials.github) && (
                        <a
                            href={safeUrl(member.socials.github)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-social-link"
                        >
                            GitHub
                        </a>
                    )}
                    {safeUrl(member.socials.linkedin) && (
                        <a
                            href={safeUrl(member.socials.linkedin)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="profile-social-link"
                        >
                            LinkedIn
                        </a>
                    )}
                    {safeMailto(member.socials.email) && (
                        <a
                            href={safeMailto(member.socials.email)}
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
                        <h2 className="profile-section-title">{p.highlights}</h2>
                        <div className="profile-highlights">
                            {member.highlights.map((h) => {
                                const Tag = h.link ? "a" : "div";
                                const linkProps = h.link
                                    ? {
                                        href: safeUrl(h.link),
                                        target: "_blank" as const,
                                        rel: "noopener noreferrer",
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

                {/* Awards */}
                {member.awards && member.awards.length > 0 && (
                    <section className="profile-section">
                        <h2 className="profile-section-title">{p.awards}</h2>
                        <div className="profile-awards">
                            {member.awards.map((a) => (
                                <div key={a} className="profile-award-item">
                                    🏆 {a}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Scholarships */}
                {member.scholarships && member.scholarships.length > 0 && (
                    <section className="profile-section">
                        <h2 className="profile-section-title">{p.scholarships}</h2>
                        <div className="profile-awards">
                            {member.scholarships.map((s) => (
                                <div key={s} className="profile-award-item">
                                    🎓 {s}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                <hr className="profile-divider" />

                {/* Projects */}
                {member.projects.length > 0 && (
                    <section className="profile-section">
                        <h2 className="profile-section-title">{p.projects}</h2>
                        <div className="profile-projects">
                            {member.projects.map((proj) => (
                                <div key={proj.name} className="profile-project-row">
                                    <div className="project-row-left">
                                        {safeUrl(proj.link) ? (
                                            <a
                                                href={safeUrl(proj.link)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="project-row-name"
                                            >
                                                {proj.name}
                                            </a>
                                        ) : (
                                            <span className="project-row-name">{proj.name}</span>
                                        )}
                                        <span className="project-row-dash">—</span>
                                        <span className="project-row-desc">{proj.description}</span>
                                    </div>
                                    <div className="project-row-tags">
                                        {proj.tags.slice(0, 3).map((tag) => (
                                            <span key={tag} className="project-row-tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Experience */}
                {member.experience && member.experience.length > 0 && (
                    <Timeline title={p.experience} items={member.experience} />
                )}

                {/* Education */}
                {member.education && member.education.length > 0 && (
                    <Timeline title={p.education} items={member.education} />
                )}

                {/* Certifications */}
                {member.certifications && member.certifications.length > 0 && (
                    <section className="profile-section">
                        <h2 className="profile-section-title">{p.certifications}</h2>
                        <div className="profile-certifications">
                            {member.certifications.map((c) => (
                                <div key={c.title} className="profile-cert-row">
                                    <div className="cert-info">
                                        <span className="cert-title">{c.title}</span>
                                        <span className="cert-issuer">— {c.issuer}</span>
                                    </div>
                                    {safeUrl(c.link) && (
                                        <a
                                            href={safeUrl(c.link)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cert-link"
                                        >
                                            {p.viewCert}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {member.skills.length > 0 && (
                    <section className="profile-section">
                        <h2 className="profile-section-title">{p.stack}</h2>
                        <div className="profile-skills">
                            {member.skills.map((s) => (
                                <span key={s} className="profile-skill">
                                    {s}
                                </span>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
