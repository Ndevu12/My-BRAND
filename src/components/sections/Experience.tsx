"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Section, SectionHeader, TechBadge } from "@/components/ui";
import { workExperience, education, volunteering } from "@/data";
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Heart,
  Users,
} from "lucide-react";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.05 });

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
    <Section
      id="experience"
      className="transition-colors duration-300"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[80px]" />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <SectionHeader
          badge="Career Journey"
          title="Professional Experience"
          subtitle="My work history, ventures, and career milestones"
        />

        {/* Stacked Sections */}
        <div className="space-y-16">
          {/* Work Experience Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <Briefcase className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Work Experience
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Professional roles & ventures
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {workExperience.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={cn(
                    "group relative rounded-2xl overflow-hidden",
                    "bg-white dark:bg-white/[0.02]",
                    "border border-gray-200 dark:border-white/[0.06]",
                    "shadow-sm hover:shadow-md dark:shadow-none",
                    "hover:border-blue-300 dark:hover:border-blue-500/30",
                    "transition-all duration-300",
                  )}
                >
                  {/* Card Content */}
                  <div className="flex flex-col h-full p-6 lg:p-7">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <Briefcase className="w-5 h-5 text-blue-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white leading-snug mb-1">
                          {item.title}
                        </h4>
                        <p className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                          {item.company}
                        </p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-5 pb-5 border-b border-gray-100 dark:border-white/[0.06]">
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {item.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {item.period}
                      </span>
                    </div>

                    {/* Description */}
                    <ul className="flex-1 space-y-3 mb-6">
                      {item.description.slice(0, 2).map((desc, descIndex) => (
                        <li
                          key={descIndex}
                          className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed"
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-blue-500/60" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-white/[0.06]">
                      {item.technologies.slice(0, 4).map((tech, techIndex) => (
                        <TechBadge key={techIndex}>{tech}</TechBadge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Community & Volunteering Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <Heart className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Community & Mentorship
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Coaching, volunteering & giving back
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {volunteering.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={cn(
                    "group relative rounded-2xl overflow-hidden",
                    "bg-white dark:bg-white/[0.02]",
                    "border border-gray-200 dark:border-white/[0.06]",
                    "shadow-sm hover:shadow-md dark:shadow-none",
                    "hover:border-green-300 dark:hover:border-green-500/30",
                    "transition-all duration-300",
                  )}
                >
                  {/* Card Content */}
                  <div className="flex flex-col h-full p-6 lg:p-7">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-5">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white leading-snug mb-1">
                          {item.role}
                        </h4>
                        <p className="text-green-600 dark:text-green-400 font-medium text-sm">
                          {item.organization}
                        </p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-5 pb-5 border-b border-gray-100 dark:border-white/[0.06]">
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        {item.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        {item.period}
                      </span>
                    </div>

                    {/* Description */}
                    <ul className="flex-1 space-y-3 mb-6">
                      {item.description.map((desc, descIndex) => (
                        <li
                          key={descIndex}
                          className="flex items-start gap-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed"
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 rounded-full bg-green-500/60" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech Stack */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-white/[0.06]">
                        {item.technologies
                          .slice(0, 4)
                          .map((tech, techIndex) => (
                            <TechBadge key={techIndex}>{tech}</TechBadge>
                          ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <GraduationCap className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Education & Training
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Academic background & certifications
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {education.map((item) => (
                <motion.div
                  key={item.id}
                  variants={itemVariants}
                  className={cn(
                    "group relative rounded-2xl overflow-hidden",
                    "bg-white dark:bg-white/[0.02]",
                    "border border-gray-200 dark:border-white/[0.06]",
                    "shadow-sm hover:shadow-md dark:shadow-none",
                    "hover:border-purple-300 dark:hover:border-purple-500/30",
                    "transition-all duration-300",
                  )}
                >
                  {/* Card Content */}
                  <div className="flex flex-col h-full p-5 lg:p-6">
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-purple-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-semibold text-gray-900 dark:text-white leading-snug">
                          {item.title}
                        </h4>
                      </div>
                    </div>

                    {/* Institution */}
                    <p className="text-purple-600 dark:text-purple-400 font-medium text-sm mb-3">
                      {item.company}
                    </p>

                    {/* Period */}
                    <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>{item.period}</span>
                    </div>

                    {/* Tech Stack */}
                    {item.technologies && item.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 mt-auto border-t border-gray-100 dark:border-white/[0.06]">
                        {item.technologies
                          ?.slice(0, 3)
                          ?.map((tech, techIndex) => (
                            <TechBadge key={techIndex}>{tech}</TechBadge>
                          ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
