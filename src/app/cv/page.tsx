"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Mail,
  MapPin,
  Linkedin,
  Github,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
} from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { workExperience, education } from "@/data";

// Obfuscated email component
function ObfuscatedEmail({ className }: { className?: string }) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail("hello" + "@" + "ndevuspace" + "." + "com");
  }, []);

  if (!email)
    return <span className={className}>hello [at] ndevuspace [dot] com</span>;
  return <span className={className}>{email}</span>;
}

const certifications = [
  {
    name: "Machine Learning Specialization",
    issuer: "Stanford University (DeepLearning.AI)",
    year: "2025",
  },
  { name: "Software Engineering", issuer: "ALX Africa", year: "2024" },
  {
    name: "JavaScript Data Structures & Algorithms",
    issuer: "freeCodeCamp",
    year: "2024",
  },
  { name: "Web Development", issuer: "Andela Rwanda", year: "2024" },
  {
    name: "Foundations of User Experience Design",
    issuer: "Google",
    year: "2023",
  },
];

const coreSkills = [
  "Node.js",
  "Python",
  "Java/Spring Boot",
  "FastAPI",
  "React",
  "Next.js",
  "TypeScript",
  "PostgreSQL",
  "MongoDB",
  "GraphQL",
  "REST APIs",
  "Docker",
  "Azure",
  "AWS",
  "Git",
  "CI/CD",
];

export default function CVPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Link>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Save as PDF</span>
          </button>
        </div>
      </header>

      {/* CV Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {/* Personal Header */}
          <motion.section
            variants={itemVariants}
            className="text-center md:text-left"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-xl text-blue-600 dark:text-blue-400 font-medium mb-4">
              {PERSONAL_INFO.title}
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Mail className="w-4 h-4" />
                <ObfuscatedEmail />
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>
          </motion.section>

          {/* Summary */}
          <motion.section variants={itemVariants}>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-white/10">
              Professional Summary
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Software Engineer & Tech Lead with 4+ years of experience
              architecting and delivering scalable web applications, backend
              systems, and AI-powered platforms. Proven track record of leading
              engineering teams, founding tech ventures, and shipping products
              serving thousands of users. Passionate about building innovative
              solutions and mentoring the next generation of African developers
              through competitive programming coaching.
            </p>
          </motion.section>

          {/* Core Skills */}
          <motion.section variants={itemVariants}>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-3 pb-2 border-b border-gray-200 dark:border-white/10">
              <Code2 className="w-5 h-5 text-blue-500" />
              Core Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {coreSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-md border border-gray-200 dark:border-white/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Work Experience */}
          <motion.section variants={itemVariants}>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-white/10">
              <Briefcase className="w-5 h-5 text-blue-500" />
              Professional Experience
            </h2>
            <div className="space-y-8">
              {workExperience.slice(0, 5).map((job) => (
                <div
                  key={job.id}
                  className="relative pl-6 border-l-2 border-gray-200 dark:border-white/10"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white dark:border-[#0a0a0f]" />

                  <div className="mb-2">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        {job.company}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {job.location}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {job.period}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {job.description.slice(0, 3).map((desc, descIndex) => (
                      <li key={descIndex} className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-1 h-1 mt-2 rounded-full bg-gray-400" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {job.technologies.slice(0, 5).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-0.5 text-xs bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Education */}
          <motion.section variants={itemVariants}>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-6 pb-2 border-b border-gray-200 dark:border-white/10">
              <GraduationCap className="w-5 h-5 text-purple-500" />
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="relative pl-6 border-l-2 border-gray-200 dark:border-white/10"
                >
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-purple-500 rounded-full border-2 border-white dark:border-[#0a0a0f]" />

                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                    {edu.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm mb-2">
                    <span className="text-purple-600 dark:text-purple-400 font-medium">
                      {edu.company}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {edu.period}
                    </span>
                  </div>

                  {edu.technologies && edu.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {edu.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-0.5 text-xs bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.section>

          {/* Certifications */}
          <motion.section variants={itemVariants}>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b border-gray-200 dark:border-white/10">
              <Award className="w-5 h-5 text-amber-500" />
              Certifications
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]"
                >
                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                    {cert.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {cert.issuer} • {cert.year}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Footer Note */}
          <motion.section
            variants={itemVariants}
            className="text-center pt-8 border-t border-gray-200 dark:border-white/10"
          >
            <p className="text-sm text-gray-500 dark:text-gray-400">
              References available upon request •{" "}
              <a
                href="https://ndevuspace.com"
                className="text-blue-500 hover:underline"
              >
                ndevuspace.com
              </a>
            </p>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}
