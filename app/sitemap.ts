import type { MetadataRoute } from "next";
import { getAllSlugs } from "./team/data";
import { SITE_URL, absoluteUrl } from "./lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = [
    // Sin barra final, para que coincida exactamente con el canonical de la home.
    { url: SITE_URL, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/privacidad"), lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terminos"), lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Un perfil por miembro del equipo: son las paginas de autor del sitio.
  const profiles: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: absoluteUrl(`/team/${slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...pages, ...profiles];
}
