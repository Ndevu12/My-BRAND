"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_ITEMS, PERSONAL_INFO, EXTERNAL_LINKS } from "@/lib/constants";
import { useScrollSpy, useScrollDirection } from "@/hooks";
import { useTheme } from "@/contexts/ThemeContext";
import { Menu, X, ExternalLink, Sun, Moon } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollDirection = useScrollDirection();
  const activeSection = useScrollSpy(
    NAV_ITEMS.filter((item) => item.href.startsWith("#")).map((item) =>
      item.href.replace("#", "")
    )
  );
  const { isDark, toggleTheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);

    // Check if it's a page route (like /cv) vs hash link
    if (href.startsWith("/")) {
      router.push(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isHidden = scrollDirection === "down" && isScrolled && !isMenuOpen;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.3 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 bg-white",
          "transition-all duration-300",
          isScrolled
            ? "dark:bg-[#0a0a0f] py-3 border-b border-gray-200 dark:border-white/10"
            : "py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
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
              <span className="text-gray-900 dark:text-white font-semibold text-lg hidden sm:block">
                {PERSONAL_INFO.shortName}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isHashLink = item.href.startsWith("#");
                const isActive =
                  isHashLink && activeSection === item.href.replace("#", "");
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={cn(
                      "relative px-4 py-2 rounded-lg text-sm font-medium",
                      "transition-all duration-300",
                      isActive
                        ? "text-gray-900 dark:text-white bg-gray-100 dark:bg-white/10"
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
                    )}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* CTA & Mobile Menu Button */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={cn(
                  "p-2.5 rounded-lg",
                  "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white",
                  "hover:bg-gray-100 dark:hover:bg-white/10",
                  "transition-all duration-300"
                )}
                aria-label={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDark ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* Blog Link */}
              <a
                href={EXTERNAL_LINKS.blog}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg",
                  "text-sm font-medium text-gray-500 dark:text-gray-400",
                  "hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5",
                  "transition-all duration-300"
                )}
              >
                Blog
                <ExternalLink className="w-4 h-4" />
              </a>

              {/* Contact CTA */}
              <button
                onClick={() => handleNavClick("#contact")}
                className={cn(
                  "hidden md:flex px-5 py-2.5 rounded-lg",
                  "bg-blue-500 text-white text-sm font-medium",
                  "hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25",
                  "transition-all duration-300"
                )}
              >
                Get In Touch
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={cn(
                "fixed top-0 right-0 bottom-0 w-80 max-w-full z-50",
                "bg-white dark:bg-primary border-l border-gray-200 dark:border-white/10",
                "flex flex-col lg:hidden"
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-white/10">
                <span className="text-gray-900 dark:text-white font-semibold text-lg">
                  Menu
                </span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-200"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-6">
                <ul className="space-y-2">
                  {NAV_ITEMS.map((item, index) => {
                    const isActive =
                      activeSection === item.href.replace("#", "");
                    return (
                      <motion.li
                        key={item.name}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <button
                          onClick={() => handleNavClick(item.href)}
                          className={cn(
                            "w-full flex items-center px-4 py-3 rounded-xl",
                            "text-left font-medium transition-all duration-200",
                            isActive
                              ? "bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20"
                              : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                          )}
                        >
                          {item.name}
                        </button>
                      </motion.li>
                    );
                  })}

                  {/* Blog Link */}
                  <motion.li
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: NAV_ITEMS.length * 0.1 }}
                  >
                    <a
                      href={EXTERNAL_LINKS.blog}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white font-medium transition-all duration-200"
                    >
                      Blog
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </motion.li>
                </ul>
              </nav>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 dark:border-white/10 space-y-4">
                {/* Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white font-medium transition-all duration-200"
                >
                  <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>

                <button
                  onClick={() => handleNavClick("#contact")}
                  className="w-full px-5 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors duration-200"
                >
                  Get In Touch
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
