import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTeamMember, getEnglishSlugs } from "../../../team/data";
import { sanitizeSlug } from "../../../lib/sanitize";
import { ProfileRoute, profileMetadata } from "../../../team/profileRoute";
import "../../../team/profile.css";

/* Solo existen en inglés los perfiles que tienen traducción; el resto da 404. */
export function generateStaticParams() {
    return getEnglishSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    return profileMetadata(slug, "en");
}

export default async function EnglishProfilePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const member = getTeamMember(sanitizeSlug(slug));
    if (!member || !member.en) notFound();

    return <ProfileRoute member={member} lang="en" />;
}
