import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SEO_KEYWORDS } from "@/data/seo";

export const metadata: Metadata = {
  title: "CV - Jean Paul Elisa",
  description:
    "Download the CV of Jean Paul Elisa NIYOKWIZERWA - Full Stack Software Engineer with expertise in React, Node.js, TypeScript, Python, and cloud technologies. View experience, skills, and certifications.",
  keywords: SEO_KEYWORDS,
  openGraph: {
    title: "CV - Jean Paul Elisa | Full Stack Software Engineer",
    description:
      "View and download the CV of Jean Paul Elisa - Full Stack Software Engineer with expertise in modern web technologies.",
    url: "https://ndevuspace.com/cv",
  },
  alternates: {
    canonical: "https://ndevuspace.com/cv",
  },
};

export default function CVLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
