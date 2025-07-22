import { Header } from '@/components/organisms/Header'
{/*
import { Hero } from '@/components/organisms/Hero'
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { BlogSection } from './components/BlogSection'
import { ContactSection } from './components/ContactSection'
*/}
import { Footer } from '@/components/organisms/Footer'

export function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
      {/*  
        <Hero />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
        */}
      </main>
      
      <Footer />
    </div>
  )
}
