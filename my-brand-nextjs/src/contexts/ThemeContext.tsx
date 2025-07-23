"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by setting mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const savedTheme = localStorage.getItem("theme");
    const body = document.body;

    if (savedTheme === "light") {
      setIsDarkTheme(false);
      body.classList.add("light-theme");
    } else {
      setIsDarkTheme(true);
      body.classList.remove("light-theme");
    }
  }, [mounted]);

  const toggleTheme = () => {
    const body = document.body;
    const newTheme = isDarkTheme ? "light" : "dark";

    if (newTheme === "light") {
      body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
      setIsDarkTheme(false);
    } else {
      body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
      setIsDarkTheme(true);
    }
  };

  // Don't render children until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
