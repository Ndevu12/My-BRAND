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
        "group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out",
        "bg-gradient-to-br from-white/95 via-gray-50/90 to-white/95 dark:from-gray-900/80 dark:via-gray-800/60 dark:to-gray-900/80",
        "backdrop-blur-md border border-yellow-500/60 dark:border-yellow-400/50",
        "hover:border-yellow-500/80 dark:hover:border-yellow-400/70 hover:shadow-2xl hover:shadow-yellow-400/30",
        "transform hover:scale-[1.02] hover:-translate-y-2",
        "h-full flex flex-col",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>

      {/* Animated Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400/30 via-yellow-400/40 to-purple-500/30 dark:from-yellow-400/20 dark:via-yellow-400/30 dark:to-purple-500/20 rounded-2xl blur-lg opacity-100 group-hover:opacity-100 transition-all duration-700" />

      {/* Category Badge */}
      {category && (
        <div className="absolute top-3 left-3 z-20">
          <div className="px-3 py-1 rounded-lg text-xs font-semibold bg-yellow-500/95 dark:bg-yellow-400/90 text-black backdrop-blur-sm shadow-lg">
            {category}
          </div>
        </div>
      )}

      {/* Image Section - Fixed height and better aspect ratio */}
      <div className="relative h-44 overflow-hidden rounded-t-2xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent dark:from-black/80 dark:via-black/20 dark:to-transparent" />

        {/* Interactive Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/15 to-transparent dark:from-yellow-400/10 dark:to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating Icon */}
        <div
          className={cn(
            "absolute bottom-3 right-3 w-8 h-8 rounded-full",
            "bg-white/30 dark:bg-white/20 backdrop-blur-sm border border-white/40 dark:border-white/30",
            "flex items-center justify-center text-white",
            "transform transition-all duration-500",
            "scale-0 group-hover:scale-100 rotate-180 group-hover:rotate-0"
          )}
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
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </div>
      </div>

      {/* Content Section - Flexible growing area */}
      <div className="p-5 flex-1 flex flex-col space-y-4">
        {/* Title */}
        <Typography
          variant="h3"
          className="text-lg font-bold text-yellow-600 dark:text-yellow-400 group-hover:text-yellow-500 dark:group-hover:text-yellow-300 transition-colors duration-300 leading-snug"
        >
          {title}
        </Typography>

        {/* Description with better spacing */}
        <div className="flex-1 flex flex-col space-y-3">
          <Typography
            variant="p"
            className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm flex-1 transition-colors duration-300"
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
              className="self-start text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 dark:hover:text-yellow-300 text-sm font-medium transition-colors duration-300 flex items-center gap-1.5 group/btn z-10 relative bg-transparent border-none cursor-pointer"
              type="button"
            >
              {isExpanded ? "Show less" : "Read more"}
              <svg
                className={cn(
                  "w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5",
                  isExpanded ? "rotate-180" : ""
                )}
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
                  className="px-2 py-1 bg-gray-200/80 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 rounded-md text-xs border border-gray-300/50 dark:border-gray-600/30 hover:bg-gray-300/80 dark:hover:bg-gray-600/50 transition-colors duration-200"
                >
                  {tech}
                </Typography>
              ))}
              {technologies.length > 4 && (
                <Typography
                  variant="small"
                  className="px-2 py-1 bg-yellow-400/30 dark:bg-yellow-400/20 text-yellow-700 dark:text-yellow-300 rounded-md text-xs border border-yellow-400/50 dark:border-yellow-400/30"
                >
                  +{technologies.length - 4}
                </Typography>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Subtle decorative elements */}
      <div className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-yellow-500/60 dark:bg-yellow-400/40 rounded-full animate-pulse transition-colors duration-300" />
      <div className="absolute top-1/3 right-3 w-1 h-1 bg-purple-500/50 dark:bg-purple-500/30 rounded-full animate-ping transition-colors duration-300" />
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
