import { ImageResponse } from "next/og";
import { getAllSlugs, getTeamMember } from "../data";
import { sanitizeSlug } from "../../lib/sanitize";
import { SITE_NAME } from "../../lib/site";

/* Una tarjeta por perfil: al compartir a una persona sale su nombre, no la marca. */
export const alt = "Perfil del equipo de SentraLabs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Sin esto la imagen se generaria en cada peticion en vez de en el build. */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function ProfileOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getTeamMember(sanitizeSlug(slug));

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
          {SITE_NAME.toLowerCase()}.co / equipo
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
          {member?.role ?? "Equipo"}
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#8b8fa3", marginTop: 32 }}>
          {member?.oneLiner ?? ""}
        </div>
      </div>
    ),
    size
  );
}
