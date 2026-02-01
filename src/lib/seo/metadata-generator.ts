/**
 * Metadata Generator
 * Utility functions for generating Next.js Metadata objects
 * Supports both home page and section-specific pages
 */

import type { Metadata } from "next";
import {
  SITE_CONFIG,
  SEO_KEYWORDS,
  SOCIAL_PROFILES,
} from "@/data/seo";
import {
  getSectionById,
  getSectionKeywords,
  type SectionId,
} from "./section-metadata";

// =============================================================================
// TYPES
// =============================================================================

export interface MetadataOptions {
  /** Section ID for section-specific metadata */
  section?: string | null;
  /** Override the canonical URL */
  canonicalOverride?: string;
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Build the canonical URL based on section
 */
export function buildCanonicalUrl(section: string | null | undefined): string {
  if (!section) {
    return SITE_CONFIG.url;
  }
  const sectionConfig = getSectionById(section);
  if (!sectionConfig) {
    return SITE_CONFIG.url;
  }
  return `${SITE_CONFIG.url}${sectionConfig.path}`;
}

/**
 * Build OpenGraph URL based on section
 */
export function buildOgUrl(section: string | null | undefined): string {
  return buildCanonicalUrl(section);
}

// =============================================================================
// METADATA GENERATORS
// =============================================================================

/**
 * Generate metadata for the home page (default)
 */
export function generateHomeMetadata(): Metadata {
  return {
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description.long,
    keywords: SEO_KEYWORDS,
    alternates: {
      canonical: SITE_CONFIG.url,
    },
    openGraph: {
      title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
      description: SITE_CONFIG.description.short,
      url: SITE_CONFIG.url,
      type: "website",
    },
    twitter: {
      title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
      description: SITE_CONFIG.description.short,
    },
  };
}

/**
 * Generate metadata for a specific section
 */
export function generateSectionMetadata(sectionId: SectionId): Metadata {
  const section = getSectionById(sectionId);
  
  if (!section) {
    return generateHomeMetadata();
  }

  const canonicalUrl = `${SITE_CONFIG.url}${section.path}`;
  const keywords = getSectionKeywords(sectionId);

  return {
    title: section.title,
    description: section.description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: section.ogTitle || section.title,
      description: section.ogDescription || section.description,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      title: section.ogTitle || section.title,
      description: section.ogDescription || section.description,
    },
  };
}

/**
 * Generate metadata dynamically based on search params
 * This is the main function used by page.tsx
 */
export function generatePageMetadata(options: MetadataOptions = {}): Metadata {
  const { section } = options;

  // If no section specified, return home metadata
  if (!section) {
    return generateHomeMetadata();
  }

  // Validate section and generate section-specific metadata
  const sectionConfig = getSectionById(section);
  if (!sectionConfig) {
    return generateHomeMetadata();
  }

  return generateSectionMetadata(section as SectionId);
}

/**
 * Get base metadata that should be shared across all pages
 * This is used in layout.tsx for common metadata
 * Note: Icons are auto-detected from app folder (favicon.ico, apple-icon.png, icon.png/svg)
 */
export function getBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    authors: [{ name: SITE_CONFIG.fullName, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.fullName,
    publisher: SITE_CONFIG.fullName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: SITE_CONFIG.locale,
      siteName: `${SITE_CONFIG.name} - Portfolio`,
    },
    twitter: {
      card: "summary_large_image",
      site: `@${SOCIAL_PROFILES.twitterHandle}`,
      creator: `@${SOCIAL_PROFILES.twitterHandle}`,
    },
    // Icons are auto-detected from src/app folder:
    // - favicon.ico
    // - apple-icon.png
    // - icon0.svg, icon1.png
  };
}

/**
 * Merge base metadata with page-specific metadata
 * Deep merges openGraph and twitter objects
 */
export function mergeMetadata(base: Metadata, page: Metadata): Metadata {
  return {
    ...base,
    ...page,
    openGraph: {
      ...base.openGraph,
      ...page.openGraph,
    },
    twitter: {
      ...base.twitter,
      ...page.twitter,
    },
    alternates: {
      ...base.alternates,
      ...page.alternates,
    },
  };
}
