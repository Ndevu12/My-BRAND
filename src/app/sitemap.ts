import { MetadataRoute } from "next";
import { SITE_CONFIG, SITE_PAGES } from "@/data/seo";
import { getSitemapSections } from "@/lib/seo";

/**
 * Generate sitemap for all indexable pages
 * Includes: home, CV, and all section pages (about, skills, etc.)
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  // Static pages from seo.ts (home, cv)
  const staticPages = SITE_PAGES.map((page) => ({
    url: `${SITE_CONFIG.url}${page.path}`,
    lastModified: currentDate,
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }));

  // Dynamic section pages from lib/seo
  const sectionPages = getSitemapSections().map((section) => ({
    url: `${SITE_CONFIG.url}${section.path}`,
    lastModified: currentDate,
    changeFrequency: section.changeFreq,
    priority: section.priority,
  }));

  return [...staticPages, ...sectionPages];
}
