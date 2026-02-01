"use client";

import { useEffect, useRef } from "react";
import { scrollToSection } from "@/lib/utils";

/**
 * Hook to handle automatic scrolling to a section on page load
 * Used when navigating to section URLs like /about, /skills, etc.
 * 
 * @param sectionId - The ID of the section to scroll to (or null for no scroll)
 * @param options - Configuration options
 */
export function useSectionScroll(
  sectionId: string | null | undefined,
  options: {
    /** Delay before scrolling (ms) - allows page to render */
    delay?: number;
    /** Only scroll once on initial mount */
    scrollOnce?: boolean;
  } = {}
): void {
  const { delay = 100, scrollOnce = true } = options;
  const hasScrolled = useRef(false);

  useEffect(() => {
    // Skip if no section ID
    if (!sectionId) return;

    // Skip if already scrolled and scrollOnce is true
    if (scrollOnce && hasScrolled.current) return;

    const timeoutId = setTimeout(() => {
      scrollToSection(sectionId);
      hasScrolled.current = true;
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [sectionId, delay, scrollOnce]);
}

/**
 * Hook to sync URL with current section during scroll
 * Updates browser history without triggering navigation
 * 
 * @param activeSection - Currently active section from scroll spy
 * @param options - Configuration options
 */
export function useSectionUrlSync(
  activeSection: string,
  options: {
    /** Whether to update URL on scroll */
    enabled?: boolean;
    /** Base path (default: current pathname) */
    basePath?: string;
  } = {}
): void {
  const { enabled = false } = options;

  useEffect(() => {
    if (!enabled || !activeSection) return;

    // Only update hash, don't change pathname
    // This maintains hash navigation while clean URLs are for external sharing
    const newHash = `#${activeSection}`;
    if (window.location.hash !== newHash) {
      window.history.replaceState(null, "", newHash);
    }
  }, [activeSection, enabled]);
}
