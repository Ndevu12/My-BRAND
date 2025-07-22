import { Metadata } from 'next'
import { ProjectsPage } from '@/features/projects'

export const metadata: Metadata = {
  title: 'Projects | NdevuSpace Portfolio',
  description: 'Explore my projects where innovation meets creativity. Each project represents a unique challenge solved through thoughtful design, efficient code, and attention to user experience.',
  openGraph: {
    title: 'Featured Projects | NdevuSpace',
    description: 'Portfolio of web development and software engineering projects showcasing technical expertise and creative solutions.',
    url: '/projects',
    siteName: 'NdevuSpace',
    images: [
      {
        url: '/images/projects-og.png',
        width: 1200,
        height: 630,
        alt: 'NdevuSpace Projects Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function Projects() {
  return <ProjectsPage />
}
