"use client";

import {
  Hero,
  About,
  Skills,
  Projects,
  Experience,
  Contact,
} from "@/components/sections";
import { useSectionScroll } from "@/hooks";
import { isValidSectionId } from "@/lib/seo";

interface HomeClientProps {
  /** Section to scroll to on mount (from URL rewrite) */
  section?: string | null;
}

/**
 * Client-side home page component
 * Handles interactivity and section scrolling
 */
export default function HomeClient({ section }: HomeClientProps) {
  // Scroll to section if specified in URL
  const validSection = isValidSectionId(section) ? section : null;
  useSectionScroll(validSection);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}
