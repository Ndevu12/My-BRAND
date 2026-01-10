"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Section,
  SectionHeader,
  Card,
  Button,
  TechBadge,
} from "@/components/ui";
import { projectsData } from "@/data";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

export function Projects() {
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
    <Section id="projects" className="bg-gray-50 dark:bg-secondary/50">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <SectionHeader
          badge="My Work"
          title="Projects & Ventures"
          subtitle="Products I've built, companies I've founded, and solutions I've delivered"
        />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projectsData.slice(0, 6).map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
            >
              <Card className="h-full group overflow-hidden" hover>
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-t from-white dark:from-primary via-white/50 dark:via-primary/50 to-transparent",
                      "opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    )}
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-blue-500/90 text-white text-xs font-medium">
                      {project.category}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div
                    className={cn(
                      "absolute inset-0 flex items-center justify-center gap-4",
                      "opacity-0 group-hover:opacity-100 transition-all duration-300"
                    )}
                  >
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "p-3 rounded-full bg-white/10 backdrop-blur-sm",
                          "border border-white/20 text-white",
                          "hover:bg-white hover:text-primary",
                          "transition-all duration-300 transform hover:scale-110"
                        )}
                        aria-label="View source code"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "p-3 rounded-full bg-blue-500 backdrop-blur-sm",
                          "border border-blue-400 text-white",
                          "hover:bg-blue-400",
                          "transition-all duration-300 transform hover:scale-110"
                        )}
                        aria-label="View live demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 4).map((tech, techIndex) => (
                      <TechBadge key={techIndex}>{tech}</TechBadge>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-xs text-gray-500 self-center">
                        +{project.techStack.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Projects - External Link to GitHub */}
        <motion.div variants={itemVariants} className="text-center mt-12">
          <a
            href="https://github.com/Ndevu12?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              View All Projects
            </Button>
          </a>
        </motion.div>
      </motion.div>
    </Section>
  );
}
