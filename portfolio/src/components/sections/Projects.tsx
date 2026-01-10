"use client";

import React, { useRef, useState } from "react";
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

const categories = ["All", "Web Application", "Mobile App", "UI/UX Design"];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

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
          badge="Portfolio"
          title="Featured Projects"
          subtitle="A selection of projects that showcase my skills and experience"
        />

        {/* Category Filter */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === category
                  ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredProjects.slice(0, 6).map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
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

        {/* View More Button */}
        {filteredProjects.length > 6 && (
          <motion.div variants={itemVariants} className="text-center mt-12">
            <Button
              variant="secondary"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              View All Projects
            </Button>
          </motion.div>
        )}
      </motion.div>
    </Section>
  );
}
