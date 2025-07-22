"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { NavigationItem, HeaderProps } from "@/types/navigation";

export function Header({ className = "" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const navigation: NavigationItem[] = [
    { name: "Skills", href: "/skills" },
    { name: "About", href: "/#aboutme" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/#contactme" },
    { name: "Portfolio", href: "/projects" },
    { name: "Experience", href: "/experience" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    // Add theme toggle logic here
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (
        isMenuOpen &&
        !target.closest("#mobile-menu") &&
        !target.closest("#mobile-menu-button")
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-header-bg bg-opacity-95 backdrop-blur-sm transition-all duration-300 border-b border-gray-800/50 shadow-lg py-3 px-4 ${className}`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link
            href="/"
            className="flex items-center group transition-all duration-300"
            aria-label="NdevuSpace Home"
          >
            <div className="overflow-hidden rounded-lg mr-2 transform transition-all duration-300 group-hover:scale-105">
              <Image
                src="/images/logo1.png"
                alt="NdevuSpace Logo"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transform transition-all duration-300 group-hover:from-yellow-300 group-hover:to-yellow-500">
              NdevuSpace
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="bg-secondary/50 p-2 rounded-full border border-gray-700 hover:border-yellow-500 transition-all duration-300"
            aria-label="Toggle theme"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 fill-current text-yellow-400"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Mobile Menu Button */}
          <div className="block lg:hidden">
            <button
              id="mobile-menu-button"
              onClick={toggleMenu}
              className="flex items-center p-2 rounded-lg border border-gray-700 hover:border-yellow-500 bg-secondary/50 transition-all duration-300"
              aria-expanded={isMenuOpen ? "true" : "false"}
              aria-label="Toggle mobile menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-yellow-400 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-secondary/30 border border-transparent hover:border-yellow-400/20"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] transform transition-transform duration-300 lg:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full w-3/4 ml-auto bg-secondary border-l border-gray-800 overflow-y-auto">
          <div className="flex justify-between items-center p-4 border-b border-gray-800">
            <h2 className="text-xl font-bold text-yellow-400">Menu</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <nav className="p-4 flex flex-col space-y-4">
            <Link
              href="/"
              className="text-gray-300 hover:text-yellow-400 py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:bg-secondary/50 border border-transparent hover:border-yellow-400/20"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-yellow-400 py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:bg-secondary/50 border border-transparent hover:border-yellow-400/20"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
