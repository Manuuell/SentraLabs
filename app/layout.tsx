import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";

export const metadata: Metadata = {
  title: "SentraLabs — Creamos el software que tu idea necesita",
  description:
    "SentraLabs es un estudio de desarrollo de software. Creamos, probamos y lanzamos productos digitales a medida.",
  keywords: ["software", "desarrollo", "SentraLabs", "startup", "web", "app"],
  openGraph: {
    title: "SentraLabs",
    description: "Creamos el software que tu idea necesita.",
    type: "website",
    url: "https://sentralabs.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
