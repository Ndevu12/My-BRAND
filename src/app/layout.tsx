import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../styles/globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Header, Footer } from "@/components/layout";
import {
  SITE_CONFIG,
  SEO_KEYWORDS,
  SOCIAL_PROFILES,
  getPersonSchema,
  getWebsiteSchema,
} from "@/data/seo";
import { getBaseMetadata } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Root Layout Metadata
 * Base metadata shared across all pages
 * Page-specific metadata is generated in individual page components
 */
export const metadata: Metadata = {
  // Base metadata from centralized helper
  ...getBaseMetadata(),

  // Title configuration with template for child pages
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },

  // Default description and keywords (overridden by page-specific)
  description: SITE_CONFIG.description.long,
  keywords: SEO_KEYWORDS,

  // OpenGraph defaults (merged with page-specific)
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: `${SITE_CONFIG.name} - Portfolio`,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description.short,
  },

  // Twitter defaults (merged with page-specific)
  twitter: {
    card: "summary_large_image",
    site: `@${SOCIAL_PROFILES.twitterHandle}`,
    creator: `@${SOCIAL_PROFILES.twitterHandle}`,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description.short,
  },

  // Apple Web App configuration
  appleWebApp: {
    title: "Ndevuspace",
    capable: true,
    statusBarStyle: "default",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  // Get JSON-LD schemas from centralized SEO data
  const personSchema = getPersonSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <html lang="en" className={`${inter.variable} dark scroll-smooth`}>
      <head>
        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body
        className="min-h-screen w-full font-sans bg-primary overflow-x-hidden text-foreground antialiased"
        suppressHydrationWarning
      >
        {/* Global grid pattern - increased visibility with proper color contrast */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(to_right,var(--grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-[0.25]" />

        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
