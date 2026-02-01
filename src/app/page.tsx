import type { Metadata } from "next";
import { HomeClient } from "@/components/home";
import { generatePageMetadata, isValidSectionId } from "@/lib/seo";

// =============================================================================
// TYPES
// =============================================================================

interface PageProps {
  searchParams: Promise<{ section?: string }>;
}

// =============================================================================
// METADATA GENERATION
// =============================================================================

/**
 * Generate dynamic metadata based on section parameter
 * This runs on the server for SEO optimization
 */
export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const section = params.section;

  // Generate metadata based on section (or default home metadata)
  return generatePageMetadata({ section });
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

/**
 * Home Page (Server Component)
 * Handles metadata generation and renders client component
 */
export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const section = params.section;

  // Pass section to client for scroll behavior
  const validSection = isValidSectionId(section) ? section : null;

  return <HomeClient section={validSection} />;
}
