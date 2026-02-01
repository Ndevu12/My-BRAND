"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  containerClassName?: string;
}

export function Section({
  id,
  className,
  children,
  containerClassName,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28 lg:py-32 overflow-hidden",
        className
      )}
    >
      <div
        className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6",
            "bg-blue-500/10 border border-blue-500/20",
            "text-blue-500 dark:text-blue-400 text-sm font-medium"
          )}
        >
          <span className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-pulse" />
          {badge}
        </div>
      )}

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-5 leading-tight">
        {title.split(" ").map((word, index, arr) => (
          <span key={index}>
            {index === arr.length - 1 ? (
              <span className="text-gradient">{word}</span>
            ) : (
              <span>{word} </span>
            )}
          </span>
        ))}
      </h2>

      {subtitle && (
        <p
          className={cn(
            "text-gray-600 dark:text-gray-400 text-lg md:text-xl leading-relaxed",
            align === "center" ? "max-w-3xl mx-auto" : "max-w-2xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
