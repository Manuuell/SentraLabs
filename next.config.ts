import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Genera .next/standalone: un servidor Node autocontenido, con solo las
  // dependencias que la app realmente usa en runtime. El build se hace en
  // GitHub Actions y al VPS se copia únicamente esa salida, que PM2 ejecuta.
  output: "standalone",
};

export default nextConfig;
