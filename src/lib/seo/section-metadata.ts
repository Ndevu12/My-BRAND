/**
 * Section Metadata Configuration
 * Centralized SEO configuration for indexable portfolio sections
 * Each section has unique metadata for improved search visibility
 */

import { SITE_CONFIG } from "@/data/seo";

// =============================================================================
// TYPES
// =============================================================================

export interface SectionSEO {
  /** Section identifier matching DOM id */
  id: string;
  /** Clean URL path for the section */
  path: string;
  /** Display name for navigation */
  name: string;
  /** SEO-optimized page title */
  title: string;
  /** Meta description for search results */
  description: string;
  /** Section-specific keywords for targeted SEO */
  keywords: string[];
  /** Sitemap priority (0.0 - 1.0) */
  priority: number;
  /** Sitemap change frequency */
  changeFreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  /** OpenGraph specific title (optional, falls back to title) */
  ogTitle?: string;
  /** OpenGraph specific description (optional, falls back to description) */
  ogDescription?: string;
}

export type SectionId = "about" | "skills" | "projects" | "experience" | "contact";

// =============================================================================
// SECTION-SPECIFIC KEYWORDS
// Organized by search intent for maximum visibility
// =============================================================================

const ABOUT_KEYWORDS = [
  // Personal branding
  "Jean Paul Elisa",
  "Jean Paul Elisa NIYOKWIZERWA",
  "Ndevu",
  "Ndevuspace",
  "about Jean Paul Elisa",
  "Jean Paul Elisa background",
  "Jean Paul Elisa story",
  // Professional identity
  "Tech Lead Rwanda",
  "Software Engineer Rwanda",
  "African Tech Entrepreneur",
  "Rwandan Developer",
  "Kigali Software Engineer",
  // Education & credentials
  "ALX Graduate",
  "ALX Software Engineer",
  "Stanford ML Certificate",
  "University of Rwanda Graduate",
  // Entrepreneurial
  "Tech Entrepreneur Rwanda",
  "Technical Co-founder Rwanda",
  "Startup Founder Rwanda",
];

const SKILLS_KEYWORDS = [
  // Frontend
  "React Developer",
  "Next.js Developer",
  "TypeScript Developer",
  "Frontend Developer Rwanda",
  "JavaScript Expert",
  // Backend
  "Node.js Developer",
  "Python Developer",
  "Django Developer",
  "FastAPI Developer",
  "Backend Developer Rwanda",
  // Full Stack
  "Full Stack Developer Rwanda",
  "Full Stack Engineer Africa",
  "MERN Stack Developer",
  "PERN Stack Developer",
  // AI/ML
  "AI Engineer Rwanda",
  "ML Engineer Africa",
  "Machine Learning Developer",
  "TensorFlow Developer",
  "Python AI Developer",
  // DevOps & Cloud
  "Docker Developer",
  "AWS Developer",
  "Cloud Engineer Rwanda",
  "DevOps Engineer Africa",
  // Database
  "PostgreSQL Developer",
  "MongoDB Developer",
  "GraphQL Developer",
];

const PROJECTS_KEYWORDS = [
  // Portfolio terms
  "Jean Paul Elisa Portfolio",
  "Jean Paul Elisa Projects",
  "Rwanda Developer Portfolio",
  "African Developer Projects",
  // Technical projects
  "Full Stack Projects",
  "React Projects Portfolio",
  "Node.js Projects",
  "AI ML Projects",
  "Web Application Portfolio",
  // Industry specific
  "SaaS Projects",
  "Startup Projects",
  "Real Estate Tech",
  "Fintech Projects Africa",
  // Open source
  "Open Source Contributor",
  "GitHub Developer Rwanda",
  "Open Source Projects Africa",
];

const EXPERIENCE_KEYWORDS = [
  // Career terms
  "Jean Paul Elisa Experience",
  "Jean Paul Elisa Work History",
  "Jean Paul Elisa Resume",
  "Jean Paul Elisa CV",
  // Leadership
  "Tech Lead Experience",
  "Engineering Lead Africa",
  "Technical Leadership Rwanda",
  "CTO Experience",
  // Industry experience
  "Software Engineer Experience",
  "Full Stack Developer Experience",
  "Startup Experience Rwanda",
  "Freelance Developer Experience",
  // Companies & ventures
  "Andela Developer",
  "Rwanda Tech Companies",
  "East Africa Tech Experience",
  // Mentorship
  "DSA Coach",
  "DSA Coach Rwanda",
  "Coding Interview Coach",
  "Tech Mentor Rwanda",
  "Competitive Programming Coach",
];

const CONTACT_KEYWORDS = [
  // Hiring intent
  "Hire Developer Rwanda",
  "Hire Full Stack Developer Africa",
  "Hire Tech Lead Rwanda",
  "Hire React Developer Rwanda",
  "Hire Node.js Developer Africa",
  // Freelance
  "Freelance Developer Rwanda",
  "Remote Developer Africa",
  "Contract Developer Rwanda",
  // Collaboration
  "Tech Collaboration Rwanda",
  "Startup Co-founder Rwanda",
  "Technical Partner Africa",
  // Contact terms
  "Contact Jean Paul Elisa",
  "Jean Paul Elisa Email",
  "Hire Jean Paul Elisa",
];

// =============================================================================
// SECTION CONFIGURATIONS
// =============================================================================

export const INDEXABLE_SECTIONS: Record<SectionId, SectionSEO> = {
  about: {
    id: "about",
    path: "/about",
    name: "About",
    title: "About Jean Paul Elisa | Tech Lead & Software Engineer from Rwanda",
    description:
      "Learn about Jean Paul Elisa NIYOKWIZERWA - Tech Lead, Full Stack Software Engineer & Entrepreneur based in Kigali, Rwanda. ALX Graduate & Stanford ML certified with expertise in building scalable products and leading engineering teams across East Africa.",
    keywords: ABOUT_KEYWORDS,
    priority: 0.9,
    changeFreq: "monthly",
    ogTitle: "About Jean Paul Elisa | My Journey in Tech",
    ogDescription:
      "Discover the story of Jean Paul Elisa - from Rwanda to building scalable tech products and mentoring the next generation of African developers.",
  },
  skills: {
    id: "skills",
    path: "/skills",
    name: "Skills",
    title: "Technical Skills | Jean Paul Elisa - Full Stack & AI/ML Developer",
    description:
      "Explore Jean Paul Elisa's technical skills: React, Node.js, TypeScript, Python, Django, Next.js, PostgreSQL, Docker, AWS, and AI/ML. Full Stack expertise with focus on scalable web applications and machine learning solutions.",
    keywords: SKILLS_KEYWORDS,
    priority: 0.8,
    changeFreq: "monthly",
    ogTitle: "Technical Skills | Jean Paul Elisa",
    ogDescription:
      "Full Stack development expertise: React, Node.js, TypeScript, Python, AI/ML, and cloud technologies.",
  },
  projects: {
    id: "projects",
    path: "/projects",
    name: "Projects",
    title: "Projects & Portfolio | Jean Paul Elisa - Software Engineer Rwanda",
    description:
      "View Jean Paul Elisa's project portfolio featuring full-stack web applications, AI-powered platforms, real estate tech solutions, and open-source contributions. Built with React, Node.js, Python, and modern cloud technologies.",
    keywords: PROJECTS_KEYWORDS,
    priority: 0.85,
    changeFreq: "weekly",
    ogTitle: "Project Portfolio | Jean Paul Elisa",
    ogDescription:
      "Featured projects: Full-stack applications, AI platforms, and innovative tech solutions from Rwanda.",
  },
  experience: {
    id: "experience",
    path: "/experience",
    name: "Experience",
    title: "Work Experience | Jean Paul Elisa - Tech Lead & CTO",
    description:
      "Jean Paul Elisa's professional experience as Tech Lead, CTO, and Software Engineer. Roles at GEOFINDA, Global Real Estate Ltd, Andela, and DSA coaching for Pan-African Informatics Olympiad. 4+ years building scalable products.",
    keywords: EXPERIENCE_KEYWORDS,
    priority: 0.85,
    changeFreq: "monthly",
    ogTitle: "Professional Experience | Jean Paul Elisa",
    ogDescription:
      "Tech Lead, CTO, and Software Engineer experience across startups, enterprise, and mentorship in East Africa.",
  },
  contact: {
    id: "contact",
    path: "/contact",
    name: "Contact",
    title: "Contact Jean Paul Elisa | Hire a Developer in Rwanda",
    description:
      "Get in touch with Jean Paul Elisa for software development projects, technical leadership roles, freelance work, or collaboration opportunities. Based in Kigali, Rwanda - available for remote and on-site engagements.",
    keywords: CONTACT_KEYWORDS,
    priority: 0.7,
    changeFreq: "yearly",
    ogTitle: "Contact | Jean Paul Elisa",
    ogDescription:
      "Reach out for collaboration, hiring, or project inquiries. Available for remote and on-site work.",
  },
} as const;

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Get all valid section IDs
 */
export function getSectionIds(): SectionId[] {
  return Object.keys(INDEXABLE_SECTIONS) as SectionId[];
}

/**
 * Check if a string is a valid section ID
 */
export function isValidSectionId(id: string | null | undefined): id is SectionId {
  if (!id) return false;
  return id in INDEXABLE_SECTIONS;
}

/**
 * Get section configuration by ID
 * Returns null if section doesn't exist
 */
export function getSectionById(id: string | null | undefined): SectionSEO | null {
  if (!isValidSectionId(id)) return null;
  return INDEXABLE_SECTIONS[id];
}

/**
 * Get section configuration by path
 * Handles both "/about" and "about" formats
 */
export function getSectionByPath(path: string): SectionSEO | null {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const section = Object.values(INDEXABLE_SECTIONS).find(
    (s) => s.path === normalizedPath
  );
  return section ?? null;
}

/**
 * Get all section paths for sitemap generation
 */
export function getAllSectionPaths(): string[] {
  return Object.values(INDEXABLE_SECTIONS).map((s) => s.path);
}

/**
 * Get section configurations for sitemap
 */
export function getSitemapSections(): Pick<SectionSEO, "path" | "priority" | "changeFreq">[] {
  return Object.values(INDEXABLE_SECTIONS).map(({ path, priority, changeFreq }) => ({
    path,
    priority,
    changeFreq,
  }));
}

/**
 * Build canonical URL for a section
 */
export function buildSectionCanonicalUrl(sectionId: SectionId): string {
  const section = INDEXABLE_SECTIONS[sectionId];
  return `${SITE_CONFIG.url}${section.path}`;
}

/**
 * Get combined keywords for a section (section-specific + core branding)
 */
export function getSectionKeywords(sectionId: SectionId): string[] {
  const section = INDEXABLE_SECTIONS[sectionId];
  // Core branding keywords that should appear on all pages
  const coreKeywords = [
    "Jean Paul Elisa",
    "Ndevuspace",
    "Software Engineer Rwanda",
    "Tech Lead Rwanda",
  ];
  // Combine and deduplicate
  return [...new Set([...section.keywords, ...coreKeywords])];
}
