import { Metadata } from 'next'
import { SkillsPage } from '@/features/skills'

export const metadata: Metadata = {
  title: 'Skills & Expertise | NdevuSpace',
  description: 'Comprehensive overview of my technical capabilities, project management approach, and entrepreneurial mindset. Tools and technologies I\'ve mastered to deliver exceptional digital solutions.',
  openGraph: {
    title: 'Skills & Technical Expertise | NdevuSpace',
    description: 'Technical skills and expertise in web development, software engineering, and project management.',
    url: '/skills',
    siteName: 'NdevuSpace',
    images: [
      {
        url: '/images/skills-og.png',
        width: 1200,
        height: 630,
        alt: 'NdevuSpace Technical Skills',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function Skills() {
  return <SkillsPage />
}
