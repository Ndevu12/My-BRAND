import React from "react";
import Typography from "@/components/atoms/Typography";
import { cn } from "@/lib/utils";

export interface ExperienceHeroProps {
  title?: string;
  subtitle?: string;
  description?: string;
  className?: string;
}

export default function ExperienceHero({
  title = "My Professional Journey",
  subtitle = "Experience",
  description = "Welcome to my experience page! Here, I share my professional journey, including impactful roles and learning experiences that have shaped my career in software development, leadership, and innovation.",
  className,
}: ExperienceHeroProps) {
  return (
    <section className={cn("py-20 relative overflow-hidden", className)}>
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-purple-400/5" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center px-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-yellow-400/20 dark:bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/40 dark:border-yellow-400/20 rounded-full px-6 py-3 mb-6">
          <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full animate-pulse" />
          <Typography
            variant="small"
            className="text-yellow-600 dark:text-yellow-400 font-medium"
          >
            Professional Journey
          </Typography>
        </div>

        {/* Title */}
        <Typography variant="h1" className="mb-6 text-gray-900 dark:text-white">
          {title.split(" ").map((word, index) => (
            <span
              key={index}
              className={
                word.toLowerCase().includes("journey") ||
                word.toLowerCase().includes("experience") ||
                word.toLowerCase().includes("professional")
                  ? "text-yellow-400"
                  : ""
              }
            >
              {word}
              {index < title.split(" ").length - 1 && " "}
            </span>
          ))}
        </Typography>

        {/* Description */}
        <Typography
          variant="p"
          className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed mb-8"
        >
          {description}
        </Typography>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 dark:bg-yellow-400/10 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-yellow-500 dark:text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <Typography
              variant="h3"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
            >
              5+
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600 dark:text-gray-400"
            >
              Years Experience
            </Typography>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 dark:bg-yellow-400/10 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-yellow-500 dark:text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <Typography
              variant="h3"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
            >
              3+
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600 dark:text-gray-400"
            >
              Major Programs
            </Typography>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400/20 dark:bg-yellow-400/10 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-yellow-500 dark:text-yellow-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <Typography
              variant="h3"
              className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
            >
              1
            </Typography>
            <Typography
              variant="small"
              className="text-gray-600 dark:text-gray-400"
            >
              Leadership Role
            </Typography>
          </div>
        </div>
      </div>
    </section>
  );
}
