import React from "react";
import { cn } from "@/lib/utils";
import ExperienceCard, {
  ExperienceCardProps,
} from "@/features/experience/ExperienceCard";
import Button from "@/components/atoms/Button";

export interface ExperienceSectionProps {
  experiences: ExperienceCardProps[];
  className?: string;
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
  maxDisplay?: number;
  layout?: "grid" | "timeline";
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  experiences,
  className,
  title = "Professional Experience",
  subtitle,
  showViewAll = true,
  onViewAll,
  maxDisplay = 6,
  layout = "grid",
}) => {
  const displayedExperiences = maxDisplay
    ? experiences.slice(0, maxDisplay)
    : experiences;

  if (layout === "timeline") {
    return (
      <section className={cn("py-16", className)}>
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {title.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={
                    index === title.split(" ").length - 1
                      ? "text-yellow-400"
                      : ""
                  }
                >
                  {word}
                  {index < title.split(" ").length - 1 && " "}
                </span>
              ))}
            </h2>
            {subtitle && (
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600"></div>

            {/* Timeline Items */}
            <div className="space-y-12">
              {displayedExperiences.map((experience, index) => (
                <div key={experience.id} className="relative">
                  {/* Timeline Dot */}
                  <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-primary shadow-lg"></div>

                  {/* Content */}
                  <div
                    className={cn(
                      "ml-12 md:ml-0 md:w-5/12",
                      index % 2 === 0 ? "md:ml-auto md:pl-8" : "md:pr-8"
                    )}
                  >
                    <ExperienceCard
                      {...experience}
                      animationDelay={index * 0.2}
                      className={cn(
                        "transition-all duration-500",
                        index % 2 === 0 ? "md:text-right" : "md:text-left"
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View All Button */}
          {showViewAll && onViewAll && experiences.length > maxDisplay && (
            <div className="text-center mt-16">
              <Button onClick={onViewAll}>View Full Experience</Button>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Grid Layout
  return (
    <section className={cn("py-16", className)}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title.split(" ").map((word, index) => (
              <span
                key={index}
                className={
                  index === title.split(" ").length - 1 ? "text-yellow-400" : ""
                }
              >
                {word}
                {index < title.split(" ").length - 1 && " "}
              </span>
            ))}
          </h2>
          {subtitle && (
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedExperiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              {...experience}
              animationDelay={index * 0.2}
            />
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && onViewAll && experiences.length > maxDisplay && (
          <div className="text-center mt-10">
            <Button onClick={onViewAll}>View Full Experience</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
