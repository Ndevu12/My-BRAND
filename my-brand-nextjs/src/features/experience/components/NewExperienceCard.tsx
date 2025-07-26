"use client";

import Badge from "@/components/atoms/Badge";
import Typography from "@/components/atoms/Typography";
import { Experience } from "../data/experienceData";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export interface ExperienceCardProps extends Experience {
  className?: string;
  animationDelay?: number;
}

export default function ExperienceCard({
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
  animationDelay = 0,
}: ExperienceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Process description for consistent card height
  const processDescription = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) {
      return { truncatedText: text, isTruncated: false };
    }

    const truncated = text.substring(0, maxLength).trim();
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    const finalText =
      lastSpaceIndex > 0 ? truncated.substring(0, lastSpaceIndex) : truncated;

    return {
      truncatedText: finalText + "...",
      isTruncated: true,
    };
  };

  const processedDesc = processDescription(description);
  const displayText = isExpanded ? description : processedDesc.truncatedText;

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

  return (
    <div
      className={cn(
        "group bg-white dark:bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-[480px] opacity-0 animate-fade-in hover:-translate-y-2 border border-gray-200 dark:border-gray-700",
        className
      )}
    >
      {/* Experience Image with Overlay */}
      <div className="h-[200px] overflow-hidden relative">
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent"></div>
        <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
          {period}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex flex-wrap items-center mb-4 gap-2">
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

        <Typography
          variant="h3"
          className="text-xl font-bold mb-3 hover:text-yellow-400 transition-colors dark:text-white text-gray-900"
        >
          {title}
        </Typography>

        <div className="flex flex-col mb-4 flex-grow">
          <Typography
            variant="p"
            className="text-base text-gray-600 dark:text-gray-300 mb-2 transition-all duration-300"
          >
            {displayText}
          </Typography>
          {processedDesc.isTruncated && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-sm text-yellow-400 hover:text-yellow-300 mt-1 self-start focus:outline-none transition-colors duration-200"
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between">
          <Typography
            variant="small"
            className="text-gray-500 dark:text-gray-400"
          >
            {location}
          </Typography>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors group"
          >
            <Typography variant="small" className="mr-1">
              {linkText}
            </Typography>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
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
    </div>
  );
}
