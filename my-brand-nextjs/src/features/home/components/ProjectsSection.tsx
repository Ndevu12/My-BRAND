"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import ProjectCard from "@/features/home/components/ProjectCard";
import { Project } from "@/types/project";


export interface ProjectsSectionProps {
  projects: Project[];
  className?: string;
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  maxDisplay?: number;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  className,
  title = "Featured Projects",
  subtitle,
  showViewAll = true,
  maxDisplay = 3,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const displayedProjects = maxDisplay
    ? projects.slice(0, maxDisplay)
    : projects;


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative py-20 md:py-32 overflow-hidden bg-gray-50 dark:bg-primary",
        className
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-yellow-400/5 dark:bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/5 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(0,0,0,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[length:50px_50px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          {/* Section Badge */}
          <div
            className={cn(
              "inline-flex items-center gap-2 bg-yellow-400/10 dark:bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/20 dark:border-yellow-400/20 rounded-full px-6 py-3 mb-6",
              "transform transition-all duration-1000 ease-out",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <Typography variant="small" className="text-yellow-400 font-medium">
              Portfolio Showcase
            </Typography>
          </div>

          {/* Main Title */}
          <div
            className={cn(
              "transform transition-all duration-1000 ease-out delay-200",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            <Typography
              variant="h2"
              className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-gray-800 dark:text-white"
            >
              {title.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={cn(
                    "inline-block mr-3",
                    index === title.split(" ").length - 1
                      ? "text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text"
                      : "text-gray-800 dark:text-white"
                  )}
                >
                  {word}
                </span>
              ))}
            </Typography>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div
              className={cn(
                "transform transition-all duration-1000 ease-out delay-300",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              )}
            >
              <Typography
                variant="p"
                className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              >
                {subtitle}
              </Typography>
            </div>
          )}
        </div>

        {/* Enhanced Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className={cn(
                "transform transition-all duration-1000 ease-out",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-16 opacity-0"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredProject(project._id || project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                image={project.image}
                imageAlt={project.imageAlt}
                category={project.category}
                techStack={project.techStack}
                liveLink={project.liveLink}
                githubLink={project.githubLink}
                isLive={project.liveLink ? true : false}
                className={cn(hoveredProject === project._id || project.id ? "z-10" : "")}
              />
            </div>
          ))}
        </div>

        {/* Enhanced View All Button */}
        {showViewAll && projects.length > maxDisplay && (
          <div
            className={cn(
              "text-center mt-20 transform transition-all duration-1000 ease-out delay-700",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            <Button variant="ghost" size="lg" asChild>
              <Link
                href="/projects"
                className="group transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20 backdrop-blur-sm"
              >
                <span className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-400/10 rounded-full group-hover:bg-yellow-400/20 transition-colors duration-300">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                    </div>
                    <Typography
                      variant="span"
                      className="font-semibold text-lg"
                    >
                      View All Projects
                    </Typography>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <div className="w-2 h-2 bg-yellow-400/60 rounded-full ml-2 animate-pulse" />
                  </div>
                </span>
              </Link>
            </Button>
          </div>
        )}

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-4 h-4 bg-yellow-400/30 dark:bg-yellow-400/30 rounded-full animate-ping" />
        <div className="absolute bottom-20 left-10 w-3 h-3 bg-purple-500/30 dark:bg-purple-500/30 rounded-full animate-pulse" />
      </div>
    </section>
  );
};

export default ProjectsSection;
