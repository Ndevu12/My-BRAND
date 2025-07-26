import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Badge from "@/components/atoms/Badge";
import { Experience } from "../data/experienceData";

export interface ExperienceCardProps extends Experience {
  className?: string;
  animationDelay?: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
  id,
  title,
  description,
  image,
  period,
  location,
  link,
  linkText,
  tags = [],
  tagColors = [],
  className,
  animationDelay = 0,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

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

  // Determine animation class based on id
  const getAnimationClass = (cardId: number) => {
    const animations = [
      "animate-fade-in",
      "animate-slide-in",
      "animate-scale-up",
    ];
    return animations[cardId % 3];
  };

  const animationClass = getAnimationClass(id);
  const delay = animationDelay || id * 0.2;

  return (
    <div
      className={cn(
        "bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-[480px] group transform hover:-translate-y-2",
        animationClass,
        className
      )}
    >
      {/* Experience Image with Overlay */}
      <div className="h-[200px] overflow-hidden relative">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent" />
        <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
          {period}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center mb-4 gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="tech"
                color={(tagColors[index] as any) || "gray"}
                size="sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <div className="flex flex-col mb-4 flex-grow">
          <p className="text-base text-gray-300 mb-2 transition-all duration-300">
            {displayText}
          </p>
          {processedDesc.isTruncated && (
            <button
              className="text-sm text-yellow-400 hover:text-yellow-300 mt-1 self-start focus:outline-none transition-colors"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Read less" : "Read more"}
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-gray-700/50">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400 font-medium">
              {location}
            </span>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors group"
            >
              <span className="text-sm mr-1">{linkText}</span>
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
    </div>
  );
};

export default ExperienceCard;
