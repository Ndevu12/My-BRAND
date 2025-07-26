'use client'

import ClientLayout from "@/components/layout";
import { 
  ProjectsHero, 
  ProjectsGrid, 
  ContactCTA 
} from './components';
import { useProjectsAnimations } from './hooks';

export function ProjectsPage() {
  useProjectsAnimations();

  return (
    <div className="min-h-screen bg-white dark:bg-primary transition-colors duration-300">
      <ClientLayout>
        <main className="max-w-7xl mx-auto px-4 py-16">
          <ProjectsHero />
          <ProjectsGrid />
          <ContactCTA />
        </main>
      </ClientLayout>
    </div>
  );
}
