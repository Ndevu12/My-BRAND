import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../styles/globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import {
  SITE_CONFIG,
  SEO_KEYWORDS,
  SOCIAL_PROFILES,
  getPersonSchema,
  getWebsiteSchema,
} from "@/data/seo";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description.long,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE_CONFIG.fullName, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.fullName,
  publisher: SITE_CONFIG.fullName,
  metadataBase: new URL(SITE_CONFIG.url),
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: "website",
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: `${SITE_CONFIG.name} - Portfolio`,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description.short,
  },
  twitter: {
    card: "summary_large_image",
    site: `@${SOCIAL_PROFILES.twitterHandle}`,
    creator: `@${SOCIAL_PROFILES.twitterHandle}`,
    title: `${SITE_CONFIG.name} | ${SITE_CONFIG.title}`,
    description: SITE_CONFIG.description.short,
  },
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
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
        className="font-sans bg-primary text-white antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
