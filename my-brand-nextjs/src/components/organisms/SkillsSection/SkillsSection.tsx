import React from "react";
import { cn } from "@/lib/utils";
import SkillCard, { SkillCardProps } from "@/components/molecules/SkillCard";
import Button from "@/components/atoms/Button";

export interface SkillsSectionProps {
  skills: SkillCardProps[];
  className?: string;
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
  maxDisplay?: number;
  columns?: 2 | 3 | 4;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  skills,
  className,
  title = "Core Competencies",
  subtitle,
  showViewAll = true,
  onViewAll,
  maxDisplay = 3,
  columns = 3,
}) => {
  const displayedSkills = maxDisplay ? skills.slice(0, maxDisplay) : skills;

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

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

        {/* Skills Grid */}
        <div className={cn("grid gap-8", gridCols[columns])}>
          {displayedSkills.map((skill, index) => (
            <SkillCard key={index} {...skill} animationDelay={index * 0.2} />
          ))}
        </div>

        {/* View All Button */}
        {showViewAll && onViewAll && skills.length > maxDisplay && (
          <div className="text-center mt-10">
            <Button onClick={onViewAll}>Explore All Skills</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
