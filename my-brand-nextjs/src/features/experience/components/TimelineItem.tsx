"use client";

import React from "react";
import Typography from "@/components/atoms/Typography";
import Badge from "@/components/atoms/Badge";
import { Experience } from "../data/experienceData";
import { cn } from "@/lib/utils";
import Image from "next/image";

export interface TimelineItemProps extends Experience {
  className?: string;
  isLast?: boolean;
}

export default function TimelineItem({
  id,
  title,
  period,
  location,
  description,
  tags,
  tagColors,
  image,
  link,
  linkText,
  className,
  isLast = false,
}: TimelineItemProps) {
  /**
   * Generate tag colors based on the tag type
   */
  const getTagColor = (
    color: string
  ):
    | "blue"
    | "green"
    | "purple"
    | "orange"
    | "pink"
    | "yellow"
    | "red"
    | "cyan"
    | "indigo"
    | "gray" => {
    const colorMap: Record<
      string,
      | "blue"
      | "green"
      | "purple"
      | "orange"
      | "pink"
      | "yellow"
      | "red"
      | "cyan"
      | "indigo"
      | "gray"
    > = {
      blue: "blue",
      green: "green",
      red: "red",
      purple: "purple",
      yellow: "yellow",
      orange: "orange",
      cyan: "cyan",
      pink: "pink",
    };

    return colorMap[color] || "gray";
  };

  const isEven = id % 2 === 0;

  return (
    <div className={cn("relative", className)}>
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-yellow-400 to-purple-400 top-20 z-0" />
      )}

      {/* Content wrapper */}
      <div
        className={cn(
          "flex items-center gap-8",
          isEven ? "flex-row-reverse" : "flex-row"
        )}
      >
        {/* Timeline indicator */}
        <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-6 h-6 bg-yellow-400 rounded-full border-4 border-white dark:border-secondary shadow-lg" />
        </div>

        {/* Content card */}
        <div
          className={cn("flex-1 max-w-lg", isEven ? "text-right" : "text-left")}
        >
          <div className="bg-white dark:bg-secondary rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 group hover:-translate-y-1">
            {/* Period badge */}
            <div
              className={cn(
                "inline-block mb-4",
                isEven ? "ml-auto" : "mr-auto"
              )}
            >
              <span className="bg-yellow-400 text-black text-sm font-bold px-4 py-2 rounded-full">
                {period}
              </span>
            </div>

            {/* Title */}
            <Typography
              variant="h3"
              className="text-xl font-bold mb-3 hover:text-yellow-400 transition-colors dark:text-white text-gray-900"
            >
              {title}
            </Typography>

            {/* Location */}
            <Typography
              variant="small"
              className="text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {location}
            </Typography>

            {/* Tags */}
            <div
              className={cn(
                "flex flex-wrap gap-2 mb-4",
                isEven ? "justify-end" : "justify-start"
              )}
            >
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="tech"
                  color={getTagColor(tagColors[index] || "gray")}
                  className="text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Description */}
            <Typography
              variant="p"
              className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
            >
              {description}
            </Typography>

            {/* Link */}
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors group",
                isEven ? "flex-row-reverse" : "flex-row"
              )}
            >
              <Typography
                variant="small"
                className={cn(isEven ? "ml-1" : "mr-1")}
              >
                {linkText}
              </Typography>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  "h-4 w-4 transition-transform",
                  isEven
                    ? "group-hover:-translate-x-1 transform rotate-180"
                    : "group-hover:translate-x-1"
                )}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Image placeholder for spacing */}
        <div className="flex-1 max-w-lg">
          <div
            className={cn(
              "relative overflow-hidden rounded-xl shadow-lg group",
              isEven ? "mr-auto" : "ml-auto"
            )}
          >
            <Image
              src={image}
              alt={title}
              width={300}
              height={200}
              className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}
