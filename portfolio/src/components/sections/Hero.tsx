"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui";
import { PERSONAL_INFO, SOCIAL_LINKS, EXTERNAL_LINKS } from "@/lib/constants";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ArrowDown,
  ExternalLink,
} from "lucide-react";

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!mounted) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--background)] transition-colors duration-300">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-500/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/15 dark:bg-purple-500/15 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 dark:bg-blue-600/10 rounded-full blur-[150px]" />

        {/* Grid pattern - starts below header area */}
        <div className="absolute inset-0 top-20 bg-grid opacity-30" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
        >
          {/* Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Status Badge */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 text-sm font-medium">
                  Available for opportunities
                </span>
              </div>
            </motion.div>

            {/* Name & Title */}
            <motion.div variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                Hi, I&apos;m{" "}
                <span className="text-gradient">{PERSONAL_INFO.shortName}</span>
              </h1>
              <p className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 font-medium mb-6">
                {PERSONAL_INFO.title}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            >
              {PERSONAL_INFO.bio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button
                variant="primary"
                size="lg"
                leftIcon={<Download className="w-5 h-5" />}
                onClick={() => (window.location.href = "/cv")}
              >
                View CV
              </Button>
              <Button
                variant="secondary"
                size="lg"
                rightIcon={<ExternalLink className="w-5 h-5" />}
                onClick={() => window.open(EXTERNAL_LINKS.blog, "_blank")}
              >
                Visit My Blog
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 justify-center lg:justify-start"
            >
              <span className="text-gray-400 dark:text-gray-500 text-sm">
                Connect with me:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-200 dark:hover:border-blue-500/20 transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.email}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10 hover:border-green-200 dark:hover:border-green-500/20 transition-all duration-300"
                  aria-label="Email Contact"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-full border border-blue-500/20 animate-pulse-slow" />
              <div className="absolute -inset-8 rounded-full border border-purple-500/10" />

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-2xl" />

              {/* Image container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-2 border-gray-200 dark:border-white/10 shadow-2xl">
                <Image
                  src={PERSONAL_INFO.profileImage}
                  alt={PERSONAL_INFO.name}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-primary/50 via-transparent to-transparent" />
              </div>

              {/* Floating badges */}
              <div className="absolute -right-4 top-1/4 px-3 py-2 rounded-lg bg-white dark:bg-secondary border border-gray-200 dark:border-white/10 shadow-xl">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  4+ Years
                </span>
              </div>
              <div className="absolute -left-4 bottom-1/4 px-3 py-2 rounded-lg bg-white dark:bg-secondary border border-gray-200 dark:border-white/10 shadow-xl">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                  50+ Projects
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <button
            onClick={scrollToAbout}
            className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            aria-label="Scroll to about section"
          >
            <span className="text-sm">Scroll Down</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
