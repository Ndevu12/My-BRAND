"use client";

import ClientLayout from "@/components/layout";
import {
  SkillsIntro,
  TechnicalSkillsSection,
  ProjectManagementSection,
  EntrepreneurialSection,
} from "./sections";
import { useSkillsAnimations } from "./hooks";

export function SkillsPage() {
  useSkillsAnimations();

  return (
    <ClientLayout>
      <div className="bg-white dark:bg-primary text-gray-800 dark:text-white transition-colors duration-300">
        <main className="max-w-6xl mx-auto px-4 py-16">
          <SkillsIntro />
          <TechnicalSkillsSection />
          <ProjectManagementSection />
          <EntrepreneurialSection />
        </main>
      </div>
    </ClientLayout>
  );
}
