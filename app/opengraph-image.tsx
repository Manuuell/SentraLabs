import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "./lib/site";

/* Tarjeta que se ve al compartir el sitio en WhatsApp, LinkedIn o X. */
export const alt = "SentraLabs — Creamos el software que tu idea necesita";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
            "radial-gradient(circle at 20% 20%, rgba(96,165,250,0.18), transparent 55%), radial-gradient(circle at 85% 80%, rgba(167,139,250,0.16), transparent 55%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#4a4e5e", letterSpacing: 2 }}>
          sentralabs.co
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 108,
            fontWeight: 700,
            color: "#f0f0f5",
            marginTop: 16,
          }}
        >
          {SITE_NAME}
        </div>
        <div style={{ display: "flex", fontSize: 44, color: "#8b8fa3", marginTop: 24 }}>
          {SITE_TAGLINE}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 48,
            fontSize: 30,
            color: "#34d399",
          }}
        >
          Flutter · Next.js · Node.js · IA · Ciberseguridad
        </div>
      </div>
    ),
    size
  );
}
