import type { MetadataRoute } from "next";
import { getAllSlugs, getEnglishSlugs } from "./team/data";
import { SITE_URL, absoluteUrl } from "./lib/site";

const homeLanguages = { es: SITE_URL, en: absoluteUrl("/en") };

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = [
    // Sin barra final, para que coincida exactamente con el canonical de la home.
    // Las dos versiones de idioma se declaran como alternativas la una de la otra.
    {
      url: SITE_URL,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: homeLanguages },
    },
    {
      url: absoluteUrl("/en"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: homeLanguages },
    },
    { url: absoluteUrl("/privacidad"), lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terminos"), lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Un perfil por miembro del equipo: son las paginas de autor del sitio.
  // Los que tienen traduccion declaran su version en ingles como alternativa.
  const english = new Set(getEnglishSlugs());
  const profileLanguages = (slug: string) => ({
    es: absoluteUrl(`/team/${slug}`),
    en: absoluteUrl(`/en/team/${slug}`),
  });

  const profiles: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: absoluteUrl(`/team/${slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
    ...(english.has(slug) ? { alternates: { languages: profileLanguages(slug) } } : {}),
  }));

  const englishProfiles: MetadataRoute.Sitemap = [...english].map((slug) => ({
    url: absoluteUrl(`/en/team/${slug}`),
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
    alternates: { languages: profileLanguages(slug) },
  }));

  return [...pages, ...profiles, ...englishProfiles];
}
