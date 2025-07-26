import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SkillCard, { SkillCardProps } from "@/features/home/components/SkillCard";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import { useTheme } from "@/contexts/ThemeContext";

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
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { isDarkTheme } = useTheme();

  const displayedSkills = maxDisplay ? skills.slice(0, maxDisplay) : skills;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative py-20 md:py-32 overflow-hidden bg-white dark:bg-transparent transition-colors duration-300",
        className
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-yellow-400/15 via-purple-500/10 to-blue-500/15 dark:from-yellow-400/5 dark:via-purple-500/5 dark:to-blue-500/5 rounded-full blur-3xl transition-colors duration-300" />
        <div className="absolute inset-0 opacity-10 dark:opacity-5 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:40px_40px] transition-opacity duration-300" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          {/* Section Badge */}
          <div
            className={cn(
              "inline-flex items-center gap-2 bg-yellow-400/20 dark:bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/40 dark:border-yellow-400/20 rounded-full px-6 py-3 mb-6",
              "transform transition-all duration-1000 ease-out",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full animate-pulse" />
            <Typography
              variant="small"
              className="text-yellow-600 dark:text-yellow-400 font-medium"
            >
              Skills & Expertise
            </Typography>
          </div>

          {/* Main Title */}
          <div
            className={cn(
              "transform transition-all duration-1000 ease-out delay-200",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            <Typography variant="h2" className="mb-6 leading-tight">
              {title.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={cn(
                    "inline-block mr-3",
                    index === title.split(" ").length - 1
                      ? "text-transparent bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 dark:from-yellow-400 dark:via-yellow-300 dark:to-yellow-500 bg-clip-text"
                      : "text-gray-800 dark:text-white"
                  )}
                >
                  {word}
                </span>
              ))}
            </Typography>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div
              className={cn(
                "transform transition-all duration-1000 ease-out delay-300",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              )}
            >
              <Typography
                variant="p"
                className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed transition-colors duration-300"
              >
                {subtitle}
              </Typography>
            </div>
          )}
        </div>

        {/* Enhanced Skills Grid */}
        <div
          className={cn(
            "grid gap-8 md:gap-12",
            gridCols[columns],
            "transform transition-all duration-1000 ease-out delay-500",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
          )}
        >
          {displayedSkills.map((skill, index) => (
            <div
              key={index}
              className={cn(
                "group relative transform transition-all duration-700 ease-out hover:scale-105",
                activeCard === index ? "z-10 scale-105" : ""
              )}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Background glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400/30 via-purple-500/15 to-blue-500/30 dark:from-yellow-400/20 dark:via-purple-500/10 dark:to-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Enhanced SkillCard */}
              <div className="relative">
                <SkillCard
                  {...skill}
                  animationDelay={index * 0.2}
                  className="h-full border border-gray-200 dark:border-white/10 hover:border-yellow-500 dark:hover:border-yellow-400/30 bg-white/80 dark:bg-secondary/50 backdrop-blur-sm transition-colors duration-300"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Explore More Skills Button - Always shown */}
        <div
          className={cn(
            "text-center mt-16 transform transition-all duration-1000 ease-out delay-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          {onViewAll ? (
            <Button
              variant="ghost"
              size="lg"
              onClick={onViewAll}
              className="group transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20 backdrop-blur-sm"
            >
              <span className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-yellow-400/10 rounded-full group-hover:bg-yellow-400/20 transition-colors duration-300">
                    <svg
                      className="w-5 h-5 text-yellow-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <Typography variant="span" className="font-semibold text-lg">
                    Explore More Skills
                  </Typography>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  <div className="w-2 h-2 bg-yellow-400/60 rounded-full ml-2 animate-pulse" />
                </div>
              </span>
            </Button>
          ) : (
            <Button variant="ghost" size="lg" asChild>
              <Link
                href="/skills"
                className="group transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/20 backdrop-blur-sm"
              >
                <span className="flex items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-400/10 rounded-full group-hover:bg-yellow-400/20 transition-colors duration-300">
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <Typography
                      variant="span"
                      className="font-semibold text-lg"
                    >
                      Explore More Skills
                    </Typography>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    <div className="w-2 h-2 bg-yellow-500/80 dark:bg-yellow-400/60 rounded-full ml-2 animate-pulse transition-colors duration-300" />
                  </div>
                </span>
              </Link>
            </Button>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-4 h-4 bg-yellow-400/50 dark:bg-yellow-400/30 rounded-full animate-ping transition-colors duration-300" />
        <div className="absolute bottom-20 left-10 w-3 h-3 bg-purple-500/50 dark:bg-purple-500/30 rounded-full animate-pulse transition-colors duration-300" />
      </div>
    </section>
  );
};

export default SkillsSection;
