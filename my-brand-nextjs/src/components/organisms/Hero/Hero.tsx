import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "@/components/atoms/Button";
import CustomLink from "@/components/atoms/Link";

export interface SocialLink {
  href: string;
  icon: string;
  label: string;
}

export interface HeroProps {
  title: string;
  subtitle: string;
  description: string;
  quote?: string;
  profileImage: string;
  profileAlt: string;
  socialLinks?: SocialLink[];
  primaryCTA?: {
    text: string;
    href: string;
    download?: boolean;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  className?: string;
  showScrollIndicator?: boolean;
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  description,
  quote,
  profileImage,
  profileAlt,
  socialLinks = [],
  primaryCTA,
  secondaryCTA,
  className,
  showScrollIndicator = true,
}) => {
  return (
    <section
      className={cn(
        "min-h-screen flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto px-4 py-10 md:py-16 gap-8 mb-12",
        className
      )}
    >
      {/* Text Content */}
      <div className="w-full lg:w-3/5 animate-fade-in">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-slide-in">
          {title.split(" ").map((word, index) => {
            // Highlight specific words (customize this logic as needed)
            const shouldHighlight =
              word.toLowerCase().includes("digital") ||
              word.toLowerCase().includes("experiences") ||
              word.toLowerCase().includes("matter");
            return (
              <span
                key={index}
                className={shouldHighlight ? "text-yellow-400" : ""}
              >
                {word}
                {index < title.split(" ").length - 1 && " "}
              </span>
            );
          })}
        </h1>

        <h2 className="text-2xl md:text-4xl font-bold text-yellow-400 mb-3 animate-slide-in">
          {subtitle}
        </h2>

        <h3 className="text-xl md:text-2xl mb-6 animate-slide-in">
          Turning complex problems into elegant solutions
        </h3>

        <div className="mb-6 animate-fade-in">
          <p className="text-gray-300 leading-relaxed">{description}</p>
        </div>

        {quote && (
          <div className="p-4 bg-secondary rounded-lg border-l-4 border-yellow-400 mb-6 animate-fade-in">
            <p className="italic text-gray-300">"{quote}"</p>
          </div>
        )}

        {/* Social Links */}
        {socialLinks.length > 0 && (
          <div className="flex gap-4 mb-6 animate-fade-in">
            {socialLinks.map((social, index) => (
              <CustomLink
                key={index}
                href={social.href}
                external
                className="hover:scale-110 transition-transform"
                aria-label={social.label}
              >
                <Image
                  src={social.icon}
                  width={40}
                  height={40}
                  alt={social.label}
                />
              </CustomLink>
            ))}
          </div>
        )}

        {/* CTAs */}
        {(primaryCTA || secondaryCTA) && (
          <div className="flex gap-4 animate-fade-in">
            {primaryCTA &&
              (primaryCTA.download ? (
                <a
                  href={primaryCTA.href}
                  download
                  className="bg-[#2f2b2b] border border-[#916868] text-white text-base py-2.5 px-6 rounded-full min-w-[150px] text-center transition-all duration-300 hover:bg-primary hover:text-[#e0c110] hover:border-yellow-400 inline-flex items-center justify-center"
                >
                  {primaryCTA.text}
                </a>
              ) : (
                <Button asChild>
                  <CustomLink href={primaryCTA.href}>
                    {primaryCTA.text}
                  </CustomLink>
                </Button>
              ))}

            {secondaryCTA && (
              <Button variant="outline" asChild>
                <CustomLink href={secondaryCTA.href}>
                  {secondaryCTA.text}
                </CustomLink>
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Profile Image */}
      <div className="w-full lg:w-2/5 flex flex-col items-center animate-scale-up">
        <div className="w-3/4 md:w-full max-w-xs rounded-full overflow-hidden border-4 border-yellow-400 shadow-xl animate-float">
          <Image
            src={profileImage}
            alt={profileAlt}
            width={400}
            height={400}
            className="w-full h-auto"
            priority
          />
        </div>

        {primaryCTA && (
          <div className="mt-6 text-center">
            <p className="text-center mb-4 text-gray-300">
              Interested in my professional background and technical expertise?
            </p>
            {primaryCTA.download ? (
              <a
                href={primaryCTA.href}
                download
                className="btn-primary hover:bg-yellow-500 hover:text-black hover:border-yellow-500 inline-flex items-center justify-center bg-[#2f2b2b] border border-[#916868] text-white text-base py-2.5 px-6 rounded-full min-w-[150px] text-center transition-all duration-300 hover:bg-primary hover:text-[#e0c110] hover:border-yellow-400"
              >
                {primaryCTA.text}
              </a>
            ) : (
              <Button>{primaryCTA.text}</Button>
            )}
          </div>
        )}
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
