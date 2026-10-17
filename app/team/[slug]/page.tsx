import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTeamMember, getAllSlugs } from "../data";
import { sanitizeSlug } from "../../lib/sanitize";
import { ProfileRoute, profileMetadata } from "../profileRoute";
import "../profile.css";

export function generateStaticParams() {
    return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    return profileMetadata(slug, "es");
}

export default async function ProfilePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const member = getTeamMember(sanitizeSlug(slug));
    if (!member) notFound();

    return <ProfileRoute member={member} lang="es" />;
}
