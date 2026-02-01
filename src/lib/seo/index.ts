/**
 * SEO Module
 * Centralized exports for all SEO-related utilities
 */

// Section metadata and helpers
export {
  INDEXABLE_SECTIONS,
  getSectionIds,
  isValidSectionId,
  getSectionById,
  getSectionByPath,
  getAllSectionPaths,
  getSitemapSections,
  buildSectionCanonicalUrl,
  getSectionKeywords,
  type SectionSEO,
  type SectionId,
} from "./section-metadata";

// Metadata generation
export {
  generateHomeMetadata,
  generateSectionMetadata,
  generatePageMetadata,
  getBaseMetadata,
  mergeMetadata,
  buildCanonicalUrl,
  buildOgUrl,
  type MetadataOptions,
} from "./metadata-generator";
