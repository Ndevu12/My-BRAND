import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import CustomLink from "@/components/atoms/Link";
import Typography from "@/components/atoms/Typography";

export interface SkillCardProps {
  title: string;
  description: string;
  image: string;
  href?: string;
  className?: string;
  animationDelay?: number;
  category?: string;
  technologies?: string[];
}

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  description,
  image,
  href,
  className,
  animationDelay = 0,
  category,
  technologies = [],
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const shouldShowExpandButton = description.length > 120;
  const displayDescription = isExpanded
    ? description
    : shouldShowExpandButton
    ? `${description.substring(0, 120)}...`
    : description;

  const handleExpandClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    setIsExpanded(!isExpanded);
  };

  const cardContent = (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl",
        "bg-white dark:bg-gray-900",
        "border border-gray-200 dark:border-gray-800",
        "shadow-sm",
        "h-full flex flex-col",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Category Badge */}
      {category && (
        <div className="absolute top-3 left-3 z-20">
          <div className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700">
            {category}
          </div>
        </div>
      )}

      {/* Image Section - Fixed height and better aspect ratio */}
      <div className="relative h-44 overflow-hidden rounded-t-xl">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Content Section - Flexible growing area */}
      <div className="p-5 flex-1 flex flex-col space-y-4">
        {/* Title */}
        <Typography
          variant="h3"
          className="text-lg font-semibold text-gray-900 dark:text-gray-100 leading-snug"
        >
          {title}
        </Typography>

        {/* Description with better spacing */}
        <div className="flex-1 flex flex-col space-y-3">
          <Typography
            variant="p"
            className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm flex-1"
          >
            {displayDescription}
          </Typography>

          {/* Expand/Collapse Button */}
          {shouldShowExpandButton && (
            <button
              onClick={handleExpandClick}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className="self-start text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium flex items-center gap-1.5 z-10 relative bg-transparent border-none cursor-pointer"
              type="button"
            >
              {isExpanded ? "Show less" : "Read more"}
              <svg
                className={cn("w-3.5 h-3.5", isExpanded ? "rotate-180" : "")}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Technologies - Always at bottom */}
        {technologies.length > 0 && (
          <div className="pt-2 border-t border-gray-300/50 dark:border-gray-700/50">
            <div className="flex flex-wrap gap-1.5">
              {technologies.slice(0, 4).map((tech, index) => (
                <Typography
                  key={index}
                  variant="small"
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md text-xs border border-gray-200 dark:border-gray-700"
                >
                  {tech}
                </Typography>
              ))}
              {technologies.length > 4 && (
                <Typography
                  variant="small"
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-md text-xs border border-gray-200 dark:border-gray-700"
                >
                  +{technologies.length - 4}
                </Typography>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <CustomLink href={href} className="block group">
        {cardContent}
      </CustomLink>
    );
  }

  return cardContent;
};

export default SkillCard;
