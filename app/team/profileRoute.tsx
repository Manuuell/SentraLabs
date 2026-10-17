import type { Metadata } from "next";
import { I18nProvider, type Lang } from "../i18n/context";
import { JsonLd } from "../lib/JsonLd";
import { HtmlLang } from "../lib/HtmlLang";
import { safeUrl, sanitizeSlug } from "../lib/sanitize";
import { SITE_URL, absoluteUrl } from "../lib/site";
import { getTeamMember, localizeMember, type TeamMember } from "./data";
import ProfileView from "./[slug]/ProfileView";

/*
 * Lo que comparten /team/<slug> (español) y /en/team/<slug> (inglés):
 * metadatos, hreflang y datos estructurados. Igual que la home, el idioma lo
 * manda la URL y cada versión tiene su propia dirección indexable.
 */

export function profilePath(slug: string, lang: Lang): string {
    return lang === "en" ? `/en/team/${slug}` : `/team/${slug}`;
}

/* hreflang solo si el perfil está traducido; si no, no hay versión en inglés. */
function profileLanguages(member: TeamMember) {
    if (!member.en) return undefined;
    return {
        es: profilePath(member.slug, "es"),
        en: profilePath(member.slug, "en"),
        "x-default": profilePath(member.slug, "es"),
    };
}

export async function profileMetadata(slug: string, lang: Lang): Promise<Metadata> {
    const base = getTeamMember(sanitizeSlug(slug));
    if (!base || (lang === "en" && !base.en)) {
        return { title: lang === "en" ? "Member not found" : "Miembro no encontrado" };
    }
    const member = localizeMember(base, lang);

    const title =
        lang === "en"
            ? `${member.name} — ${member.role} at SentraLabs`
            : `${member.name} — ${member.role} en SentraLabs`;
    const url = profilePath(member.slug, lang);
    return {
        title,
        description: member.oneLiner,
        alternates: { canonical: url, languages: profileLanguages(base) },
        openGraph: {
            title,
            description: member.oneLiner,
            url,
            type: "profile",
            locale: lang === "en" ? "en_US" : "es_CO",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: member.oneLiner,
        },
    };
}

export function ProfileRoute({ member: base, lang }: { member: TeamMember; lang: Lang }) {
    const member = localizeMember(base, lang);
    const profileUrl = absoluteUrl(profilePath(member.slug, lang));
    const homeUrl = lang === "en" ? absoluteUrl("/en") : SITE_URL;

    /* Person: le dice a Google quien firma el contenido (páginas de autor). */
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "@id": `${absoluteUrl(profilePath(member.slug, "es"))}#person`,
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
            { "@type": "ListItem", position: 1, name: lang === "en" ? "Home" : "Inicio", item: homeUrl },
            {
                "@type": "ListItem",
                position: 2,
                name: lang === "en" ? "Team" : "Equipo",
                item: absoluteUrl(lang === "en" ? "/en#team" : "/#team"),
            },
            { "@type": "ListItem", position: 3, name: member.name, item: profileUrl },
        ],
    };

    return (
        <>
            {lang !== "es" && <HtmlLang lang={lang} />}
            <JsonLd data={personSchema} />
            <JsonLd data={breadcrumbSchema} />
            <I18nProvider lang={lang}>
                <ProfileView member={base} />
            </I18nProvider>
        </>
    );
}
