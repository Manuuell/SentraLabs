import { notFound } from "next/navigation";
import { I18nProvider } from "../../i18n/context";
import { getTeamMember, getAllSlugs } from "../data";
import ProfileView from "./ProfileView";
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
        <I18nProvider>
            <ProfileView member={member} />
        </I18nProvider>
    );
}
