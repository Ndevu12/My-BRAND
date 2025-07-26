"use client";

import React, { useState } from "react";
import ExperienceHero from "./components/ExperienceHero";
import ExperienceCard from "./components/NewExperienceCard";
import TimelineItem from "./components/TimelineItem";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import { experienceData } from "./data/experienceData";
import { navigateToContact, navigateToProjects } from "./utils/navigation";
import { cn } from "@/lib/utils";
import ClientLayout from "@/components/layout";

export interface ExperiencePageProps {
  className?: string;
}

export default function ExperiencePage({ className }: ExperiencePageProps) {
  const [layout, setLayout] = useState<"grid" | "timeline">("grid");

  return (
    <ClientLayout>
      <div className={cn("min-h-screen", className)}>
        {/* Hero Section */}
        <ExperienceHero />

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-6">
            {/* Layout Toggle */}
            <div className="flex justify-center mb-12">
              <div className="inline-flex items-center bg-white dark:bg-secondary rounded-xl p-2 border border-gray-200 dark:border-gray-700 shadow-lg">
                <button
                  onClick={() => setLayout("grid")}
                  className={cn(
                    "group flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 transform",
                    layout === "grid"
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg scale-105"
                      : "text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/10"
                  )}
                >
                  <svg
                    className={cn(
                      "w-5 h-5 mr-2 transition-transform duration-300",
                      layout === "grid" ? "text-black" : "group-hover:scale-110"
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                    />
                  </svg>
                  <span className="text-sm font-semibold">Grid View</span>
                  {layout === "grid" && (
                    <div className="ml-2 w-2 h-2 bg-black rounded-full animate-pulse" />
                  )}
                </button>

                <div className="w-px h-8 bg-gray-200 dark:bg-gray-600 mx-2" />

                <button
                  onClick={() => setLayout("timeline")}
                  className={cn(
                    "group flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 transform",
                    layout === "timeline"
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-lg scale-105"
                      : "text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/10"
                  )}
                >
                  <svg
                    className={cn(
                      "w-5 h-5 mr-2 transition-transform duration-300",
                      layout === "timeline"
                        ? "text-black"
                        : "group-hover:scale-110"
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm font-semibold">Timeline View</span>
                  {layout === "timeline" && (
                    <div className="ml-2 w-2 h-2 bg-black rounded-full animate-pulse" />
                  )}
                </button>
              </div>
            </div>

            {/* Section Title */}
            <div className="text-center mb-12">
              <Typography
                variant="h2"
                className="mb-4 text-gray-900 dark:text-white"
              >
                Professional <span className="text-yellow-400">Experience</span>
              </Typography>
              <Typography
                variant="p"
                className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              >
                Explore my journey through various roles, programs, and
                experiences that have shaped my expertise in software
                development and leadership.
              </Typography>
            </div>

            {/* Experience Content */}
            {layout === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {experienceData.map((experience, index) => (
                  <ExperienceCard
                    key={experience.id}
                    {...experience}
                    animationDelay={index * 0.2}
                    className="animate-fade-in opacity-0"
                  />
                ))}
              </div>
            ) : (
              <div className="max-w-4xl mx-auto">
                <div className="space-y-20">
                  {experienceData.map((experience, index) => (
                    <TimelineItem
                      key={experience.id}
                      {...experience}
                      isLast={index === experienceData.length - 1}
                      className="animate-fade-in opacity-0"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gray-50 dark:bg-secondary">
          <div className="max-w-4xl mx-auto text-center px-6">
            <div className="bg-gradient-to-br from-yellow-400/10 via-transparent to-purple-400/10 dark:from-yellow-400/5 dark:via-transparent dark:to-purple-400/5 rounded-2xl border border-yellow-400/20 dark:border-yellow-400/10 p-8">
              <Typography
                variant="h2"
                className="mb-4 text-gray-900 dark:text-white"
              >
                Let's Work Together
              </Typography>
              <Typography
                variant="p"
                className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
              >
                Interested in collaborating or learning more about my
                experience? I'd love to discuss opportunities and share insights
                from my journey.
              </Typography>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={navigateToContact}
                  className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold"
                >
                  Get In Touch
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={navigateToProjects}
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-400"
                >
                  View My Projects
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </ClientLayout>
  );
}
