import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

/* Buscadores clasicos y agentes de IA que queremos que nos lean. */
const ALLOWED_AGENTS = [
  "Googlebot",
  "Bingbot",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "FirecrawlAgent",
  "AndiBot",
  "ExaBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: ["/", "/llms.txt"] },
      { userAgent: ALLOWED_AGENTS, allow: ["/", "/llms.txt"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
