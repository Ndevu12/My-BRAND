import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "@/components/atoms/Button";

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
  const imageSection = (
    <div className="w-full md:w-2/5 mb-6 md:mb-0">
      <div className="relative overflow-hidden rounded-lg shadow-xl group">
        <Image
          src={image}
          alt={imageAlt}
          width={600}
          height={400}
          className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );

  const contentSection = (
    <div className="w-full md:w-3/5">
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

      <h4 className="text-lg text-gray-300 mb-4 font-medium">{subtitle}</h4>

      <div className="space-y-4">
        {description.map((paragraph, index) => (
          <p key={index} className="text-gray-300 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      {cta && (
        <div className="mt-8">
          <Button asChild>
            <a href={cta.href}>{cta.text}</a>
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <section id="aboutme" className={cn("bg-secondary py-16", className)}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {imagePosition === "left" ? (
            <>
              {imageSection}
              {contentSection}
            </>
          ) : (
            <>
              {contentSection}
              {imageSection}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
