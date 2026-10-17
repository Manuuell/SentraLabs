import { ImageResponse } from "next/og";
import { getEnglishSlugs, getTeamMember, localizeMember } from "../../../team/data";
import { sanitizeSlug } from "../../../lib/sanitize";
import { SITE_NAME } from "../../../lib/site";

/* La misma tarjeta de perfil que /team/<slug>, con los textos en inglés. */
export const alt = "SentraLabs team profile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getEnglishSlugs().map((slug) => ({ slug }));
}

export default async function EnglishProfileOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const base = getTeamMember(sanitizeSlug(slug));
  const member = base ? localizeMember(base, "en") : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#000000",
          backgroundImage:
            "radial-gradient(circle at 15% 25%, rgba(96,165,250,0.18), transparent 55%), radial-gradient(circle at 85% 75%, rgba(52,211,153,0.14), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#4a4e5e", letterSpacing: 2 }}>
          {SITE_NAME.toLowerCase()}.co / team
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#f0f0f5",
            marginTop: 16,
          }}
        >
          {member?.name ?? SITE_NAME}
        </div>
        <div style={{ display: "flex", fontSize: 44, color: "#60a5fa", marginTop: 16 }}>
          {member?.role ?? "Team"}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#8b8fa3", marginTop: 32 }}>
          {member?.oneLiner ?? ""}
        </div>
      </div>
    ),
    size
  );
}
