import { MetadataRoute } from "next";
import { SITE_CONFIG, SITE_PAGES } from "@/data/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  return SITE_PAGES.map((page) => ({
    url: `${SITE_CONFIG.url}${page.path}`,
    lastModified: currentDate,
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));
}
