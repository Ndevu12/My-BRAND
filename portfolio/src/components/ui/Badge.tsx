"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "solid";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  const variants = {
    default:
      "bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20",
    outline:
      "bg-transparent text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-white/20",
    solid: "bg-blue-500 text-white border border-transparent",
  };

  const sizes = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

interface TechBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function TechBadge({ children, className }: TechBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium",
        "bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10",
        "transition-colors duration-200 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white",
        className
      )}
    >
      {children}
    </span>
  );
}
