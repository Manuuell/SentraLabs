import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // tooli.sentralabs.co sirve las páginas de /tooli (la de inicio y la
  // política de privacidad que pide Google Play): tooli.sentralabs.co/privacidad
  // es sentralabs.co/tooli/privacidad. Las rutas que ya empiezan por /tooli
  // y los archivos de Next no se tocan.
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:ruta((?!tooli|_next|favicon|icon).*)",
          has: [{ type: "host", value: "tooli.sentralabs.co" }],
          destination: "/tooli/:ruta",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
