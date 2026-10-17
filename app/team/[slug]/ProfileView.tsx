"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "../../i18n/context";
import type { TeamMember, TimelineItem } from "../data";

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
    const { t, lang, setLang } = useI18n();
    const p = t.profile;
    const member: TeamMember =
        lang === "en" && base.en ? { ...base, ...base.en } : base;
    const role =
        lang === "en" && member.role === "Fundador" ? "Founder" : member.role;

    return (
        <div className="profile-page">
            <div className="profile-topbar">
                <Link href="/#team" className="profile-back">
                    {p.back}
                </Link>
                <button
                    type="button"
                    className="profile-lang"
                    onClick={() => setLang(lang === "es" ? "en" : "es")}
                    aria-label={p.switchLangLabel}
                >
                    {p.switchLang}
                </button>
            </div>

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
                        <p className="profile-role">{role}</p>
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
                        <h2 className="profile-section-title">{p.highlights}</h2>
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
                                        {proj.link ? (
                                            <a
                                                href={proj.link}
                                                target="_blank"
                                                rel="noopener"
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
                                    {c.link && (
                                        <a
                                            href={c.link}
                                            target="_blank"
                                            rel="noopener"
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
