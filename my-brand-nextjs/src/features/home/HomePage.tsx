import  ClientLayout from "@/components/layout";

import Hero from '@/components/organisms/Hero'
{/*
import { AboutSection } from './components/AboutSection'
import { SkillsSection } from './components/SkillsSection'
import { ProjectsSection } from './components/ProjectsSection'
import { BlogSection } from './components/BlogSection'
import { ContactSection } from './components/ContactSection'
*/
}

export function HomePage() {
  return (
    <ClientLayout>
        <Hero
          title="Welcome to My Portfolio"
          subtitle="Frontend Developer & Designer"
          description="I build modern, responsive web experiences with a focus on usability and brand identity."
          profileImage="/images/profile.jpg"
          profileAlt="Profile picture of [Your Name]"
        />

        {/* 
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <BlogSection />
        <ContactSection />
        */}
    </ClientLayout>
  );
}
