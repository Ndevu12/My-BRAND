import type { Metadata } from "next";
import { ExperiencePage } from "@/features/experience";

export const metadata: Metadata = {
  title: "Experience | NdevuSpace - Professional Journey & Career Highlights",
  description:
    "Explore Jean Paul Elisa NIYOKWIZERWA's professional journey, including roles at Andela ATLP, ALX Software Engineering, and current position as Co-Founder & CTO at Global Real Estate. Discover the experiences that shaped a career in software development and technical leadership.",
  keywords: [
    "Jean Paul experience",
    "Andela ATLP",
    "ALX Software Engineering",
    "CTO Global Real Estate",
    "software development career",
    "technical leadership",
    "professional journey",
    "Rwanda developer",
    "career highlights",
    "Ndevu experience",
  ],
  openGraph: {
    title: "Experience | NdevuSpace - Professional Journey",
    description:
      "Discover the professional journey of Jean Paul Elisa NIYOKWIZERWA - from Andela ATLP and ALX Software Engineering to Co-Founder & CTO roles. Explore career highlights and expertise development.",
    type: "website",
    url: "https://ndevuspace.com/experience",
    images: [
      {
        url: "/images/technology.jpg",
        width: 1200,
        height: 630,
        alt: "Professional Experience - NdevuSpace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience | NdevuSpace - Professional Journey",
    description:
      "Explore the professional journey and career highlights of Jean Paul Elisa NIYOKWIZERWA in software development and technical leadership.",
    images: ["/images/technology.jpg"],
  },
  alternates: {
    canonical: "https://ndevuspace.com/experience",
  },
};

export default function Experience() {
  return <ExperiencePage />;
}
