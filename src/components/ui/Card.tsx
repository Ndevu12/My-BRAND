"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  hover?: boolean;
  glow?: boolean;
}

export function Card({
  className,
  children,
  hover = true,
  glow = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl overflow-hidden",
        "bg-white dark:bg-white/[0.02] backdrop-blur-sm",
        "border border-gray-200 dark:border-white/[0.06]",
        "shadow-sm dark:shadow-none",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 dark:hover:border-white/15 hover:shadow-md",
        glow && "dark:hover:shadow-glow",
        className
      )}
    >
      {children}
    </div>
  );
}

interface CardContentProps {
  className?: string;
  children: React.ReactNode;
}

export function CardContent({ className, children }: CardContentProps) {
  return <div className={cn("p-6", className)}>{children}</div>;
}
