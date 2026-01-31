"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  PERSONAL_INFO,
  SOCIAL_LINKS,
  NAV_ITEMS,
  EXTERNAL_LINKS,
} from "@/lib/constants";
import {
  Github,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  ExternalLink,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-primary dark:bg-primary border-t border-gray-200 dark:border-white/[0.08]">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Logo */}
              <Link href="/" className="inline-flex items-center gap-2 group">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    "bg-gradient-to-br from-blue-500 to-purple-500",
                    "text-white font-bold text-lg",
                    "group-hover:shadow-lg group-hover:shadow-blue-500/25",
                    "transition-all duration-300"
                  )}
                >
                  N
                </div>
                <span className="text-gray-900 dark:text-white font-semibold text-lg">
                  {PERSONAL_INFO.shortName}
                </span>
              </Link>

              <p className="text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
                {PERSONAL_INFO.title} based in {PERSONAL_INFO.location}.
                Building digital experiences that make a difference.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-3">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-200 dark:hover:border-blue-500/20 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.email}
                  className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 hover:text-green-500 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10 hover:border-green-200 dark:hover:border-green-500/20 transition-all duration-300"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {NAV_ITEMS.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => {
                        document
                          .querySelector(item.href)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={EXTERNAL_LINKS.blog}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    Blog
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={EXTERNAL_LINKS.cvDownload}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    Resume
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
                  >
                    GitHub
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200 dark:border-white/[0.08]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {currentYear} {PERSONAL_INFO.shortName}. All rights reserved.
            </p>

            {/* Made with love */}
            <p className="flex items-center gap-2 text-gray-500 text-sm">
              Built to show up!
            </p>

            {/* Scroll to top */}
            <button
              onClick={scrollToTop}
              className={cn(
                "p-2.5 rounded-xl",
                "bg-gray-100 dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08]",
                "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20",
                "transition-all duration-300"
              )}
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
