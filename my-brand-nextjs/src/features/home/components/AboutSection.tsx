import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import { useTheme } from "@/contexts/ThemeContext";

export interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description: string[];
  image: string;
  imageAlt: string;
  stats?: Array<{
    label: string;
    value: string;
  }>;
  cta?: {
    text: string;
    href: string;
  };
  className?: string;
  imagePosition?: "left" | "right";
}

const AboutSection: React.FC<AboutSectionProps> = ({
  title = "About Me",
  subtitle = "Software Engineer | Web Developer | UX/UI Designer | Full Stack Developer",
  description,
  image,
  imageAlt,
  stats,
  cta,
  className,
  imagePosition = "left",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { isDarkTheme } = useTheme();

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

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const imageSection = (
    <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
      <div
        className={cn(
          "relative group transform transition-all duration-1000 ease-out",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        )}
      >
        {/* Background decorative elements */}
        <div className="absolute -inset-8 bg-gradient-to-r from-yellow-400/20 via-purple-500/10 to-blue-500/20 dark:from-yellow-400/10 dark:via-purple-500/5 dark:to-blue-500/10 rounded-3xl blur-2xl group-hover:scale-110 transition-all duration-700" />
        <div className="absolute -inset-4 bg-gradient-to-br from-yellow-400/30 to-transparent dark:from-yellow-400/20 dark:to-transparent rounded-2xl transition-colors duration-300" />

        {/* Main image container */}
        <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-gray-300/50 dark:shadow-black/50 group-hover:shadow-yellow-400/30 dark:group-hover:shadow-yellow-400/20 transition-all duration-700">
          <Image
            src={image}
            alt={imageAlt}
            width={600}
            height={400}
            className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay with pattern */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent dark:from-black/30 dark:via-transparent dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Interactive elements */}
          <div className="absolute top-4 right-4 w-3 h-3 bg-yellow-500 dark:bg-yellow-400 rounded-full animate-ping" />
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" />

          {/* Stats overlay (if provided) */}
          {stats && stats.length > 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent dark:from-black/80 dark:via-black/40 dark:to-transparent p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <div className="grid grid-cols-2 gap-4">
                {stats.slice(0, 4).map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-yellow-400">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const contentSection = (
    <div className="w-full lg:w-1/2 lg:px-8">
      {/* Section Badge */}
      <div
        className={cn(
          "inline-flex items-center gap-2 bg-yellow-400/20 dark:bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/40 dark:border-yellow-400/20 rounded-full px-4 py-2 text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-6",
          "transform transition-all duration-1000 ease-out delay-200",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}
      >
        <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full animate-pulse" />
        <Typography
          variant="small"
          className="text-sm font-medium text-yellow-600 dark:text-yellow-400"
        >
          {title}
        </Typography>
      </div>

      {/* Main Title */}
      <div
        className={cn(
          "transform transition-all duration-1000 ease-out delay-300",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}
      >
        <Typography
          variant="h2"
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-gray-800 dark:text-white transition-colors duration-300"
        >
          Passionate about{" "}
          <span className="text-transparent bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 dark:from-yellow-400 dark:via-yellow-300 dark:to-yellow-500 bg-clip-text">
            Innovation
          </span>
        </Typography>
      </div>

      {/* Subtitle */}
      <div
        className={cn(
          "transform transition-all duration-1000 ease-out delay-400",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}
      >
        <Typography
          variant="p"
          className="text-lg text-gray-600 dark:text-gray-400 mb-8 font-medium transition-colors duration-300"
        >
          {subtitle}
        </Typography>
      </div>

      {/* Description Paragraphs with staggered animation */}
      <div className="space-y-6 mb-8">
        {description.map((paragraph, index) => (
          <div
            key={index}
            className={cn(
              "transform transition-all duration-1000 ease-out",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            <Typography
              variant="p"
              className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg relative pl-6 transition-colors duration-300"
            >
              {/* Decorative line */}
              <span className="absolute left-0 top-2 w-1 h-6 bg-gradient-to-b from-yellow-500 to-transparent dark:from-yellow-400 dark:to-transparent" />
              {paragraph}
            </Typography>
          </div>
        ))}
      </div>

      {/* Enhanced Stats Grid */}
      {stats && stats.length > 0 && (
        <div
          className={cn(
            "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8",
            "transform transition-all duration-1000 ease-out delay-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/80 dark:bg-secondary/50 backdrop-blur-sm border border-gray-200 dark:border-white/10 rounded-xl p-4 text-center hover:border-yellow-500 dark:hover:border-yellow-400/30 hover:bg-yellow-400/10 dark:hover:bg-yellow-400/5 transition-all duration-300"
            >
              <Typography
                variant="h3"
                className="text-2xl md:text-3xl font-bold text-yellow-500 dark:text-yellow-400 group-hover:scale-110 transition-transform duration-300"
              >
                {stat.value}
              </Typography>
              <Typography
                variant="small"
                className="text-sm text-gray-600 dark:text-gray-400 font-medium transition-colors duration-300"
              >
                {stat.label}
              </Typography>
            </div>
          ))}
        </div>
      )}

      {/* CTA Button */}
      {cta && (
        <div
          className={cn(
            "transform transition-all duration-1000 ease-out delay-900",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          <Button
            asChild
            className="group bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25"
          >
            <a href={cta.href}>
              <span className="flex items-center gap-2">
                {cta.text}
                <svg
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
              </span>
            </a>
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="aboutme"
      className={cn(
        "relative py-20 md:py-32 overflow-hidden bg-gray-50 dark:bg-transparent transition-colors duration-300",
        className
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-yellow-400/15 dark:bg-yellow-400/5 rounded-full blur-3xl transition-colors duration-300" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl transition-colors duration-300" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div
          className={cn(
            "flex flex-col lg:flex-row items-center gap-12 lg:gap-16",
            imagePosition === "right" ? "lg:flex-row-reverse" : ""
          )}
        >
          {imageSection}
          {contentSection}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
