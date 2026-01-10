"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Section, SectionHeader, TechBadge } from "@/components/ui";
import { experienceData } from "@/data";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <Section id="experience" className="bg-white dark:bg-[#0a0a0f]">
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
          title="Experience & Education"
          subtitle="My professional background and academic foundation"
        />

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500 opacity-50 dark:opacity-100 transform md:-translate-x-1/2" />

          {experienceData.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className={cn(
                "relative mb-12 last:mb-0",
                "pl-8 md:pl-0",
                index % 2 === 0 ? "md:pr-[50%] md:text-right" : "md:pl-[50%]"
              )}
            >
              {/* Timeline dot */}
              <div
                className={cn(
                  "absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full",
                  "bg-white dark:bg-primary border-2 border-blue-500",
                  "transform -translate-x-1/2 md:-translate-x-1/2",
                  "z-10"
                )}
              >
                <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20" />
              </div>

              {/* Content Card */}
              <div
                className={cn(
                  "relative p-6 rounded-2xl",
                  "bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08]",
                  "hover:bg-gray-100 dark:hover:bg-white/[0.06] hover:border-gray-300 dark:hover:border-white/20",
                  "transition-all duration-300",
                  index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "inline-flex items-center justify-center",
                    "w-12 h-12 rounded-xl mb-4",
                    "bg-gradient-to-br",
                    item.type === "work"
                      ? "from-blue-500/20 to-blue-600/20 border border-blue-500/20"
                      : "from-purple-500/20 to-purple-600/20 border border-purple-500/20"
                  )}
                >
                  {item.type === "work" ? (
                    <Briefcase className="w-6 h-6 text-blue-400" />
                  ) : (
                    <GraduationCap className="w-6 h-6 text-purple-400" />
                  )}
                </div>

                {/* Header */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-blue-500 dark:text-blue-400 font-medium mb-3">
                  {item.company}
                </p>

                {/* Meta info */}
                <div
                  className={cn(
                    "flex flex-wrap gap-4 mb-4 text-sm text-gray-500",
                    index % 2 === 0 ? "md:justify-end" : "justify-start"
                  )}
                >
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {item.location}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {item.period}
                  </span>
                </div>

                {/* Description */}
                <ul
                  className={cn(
                    "space-y-2 mb-4",
                    index % 2 === 0 ? "md:text-right" : "text-left"
                  )}
                >
                  {item.description.map((desc, descIndex) => (
                    <li
                      key={descIndex}
                      className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed"
                    >
                      {desc}
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div
                  className={cn(
                    "flex flex-wrap gap-2",
                    index % 2 === 0 ? "md:justify-end" : "justify-start"
                  )}
                >
                  {item.technologies.slice(0, 5).map((tech, techIndex) => (
                    <TechBadge key={techIndex}>{tech}</TechBadge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  );
}
