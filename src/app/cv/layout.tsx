import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CV - Jean Paul Elisa",
  description:
    "Download the CV of Jean Paul Elisa NIYOKWIZERWA - Full Stack Software Engineer with expertise in React, Node.js, TypeScript, Python, and cloud technologies. View experience, skills, and certifications.",
  keywords: [
    "Jean Paul Elisa CV",
    "Jean Paul Elisa Resume",
    "Software Engineer CV",
    "Full Stack Developer Resume",
    "Developer CV Rwanda",
    "Jean Paul Elisa NIYOKWIZERWA",
  ],
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

export default function CVLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
