"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Section,
  SectionHeader,
  Card,
  CardContent,
  TechBadge,
} from "@/components/ui";
import { skillsData } from "@/data";
import {
  Layout,
  Server,
  Database,
  Smartphone,
  GitBranch,
  Palette,
  Code2,
  Cpu,
  Cloud,
  Terminal,
  Blocks,
  Paintbrush,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  layout: Layout,
  server: Server,
  database: Database,
  smartphone: Smartphone,
  "git-branch": GitBranch,
  palette: Palette,
  code: Code2,
  cpu: Cpu,
  cloud: Cloud,
  terminal: Terminal,
  blocks: Blocks,
  paintbrush: Paintbrush,
};

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <Section id="skills" className="bg-white dark:bg-[#0a0a0f]">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[80px]" />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <SectionHeader
          badge="Skills & Expertise"
          title="Technical Proficiency"
          subtitle="Technologies and tools I use to bring ideas to life"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {skillsData.map((skill, index) => {
            const IconComponent = iconMap[skill.icon] || Code2;

            return (
              <motion.div key={skill.id} variants={itemVariants}>
                <Card className="h-full group" hover glow>
                  <CardContent className="p-6 md:p-8">
                    {/* Icon */}
                    <div className="mb-6">
                      <div
                        className={cn(
                          "w-14 h-14 rounded-2xl flex items-center justify-center",
                          "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
                          "border border-blue-500/20",
                          "group-hover:from-blue-500/30 group-hover:to-purple-500/30",
                          "transition-all duration-300"
                        )}
                      >
                        <IconComponent className="w-7 h-7 text-blue-500 dark:text-blue-400" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {skill.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                      {skill.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech, techIndex) => (
                        <TechBadge key={techIndex}>{tech}</TechBadge>
                      ))}
                    </div>
                  </CardContent>

                  {/* Bottom accent line */}
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Tech Stack Summary */}
        <motion.div
          variants={itemVariants}
          className="mt-16 p-8 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.08]"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Core Tech Stack
            </h3>
            <p className="text-gray-500">
              Technologies I work with on a daily basis
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Node.js",
              "Python",
              "PostgreSQL",
              "MongoDB",
              "AWS",
              "Docker",
              "Git",
              "Tailwind CSS",
              "GraphQL",
            ].map((tech, index) => (
              <div
                key={index}
                className={cn(
                  "px-4 py-2 rounded-full",
                  "bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10",
                  "text-gray-600 dark:text-gray-300 text-sm font-medium",
                  "hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:text-gray-900 dark:hover:text-white",
                  "transition-all duration-300 cursor-default"
                )}
              >
                {tech}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}
