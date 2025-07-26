import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Button from "@/components/atoms/Button";
import CustomLink from "@/components/atoms/Link";
import Typography from "@/components/atoms/Typography";

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
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      className={cn(
        "relative min-h-screen overflow-hidden bg-white dark:bg-primary transition-colors duration-300",
        className
      )}
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-primary dark:via-secondary dark:to-primary transition-colors duration-500" />

        {/* Animated Background Shapes */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-yellow-400/20 dark:bg-yellow-400/5 rounded-full blur-3xl animate-pulse transform transition-all duration-1000" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/15 dark:bg-purple-500/5 rounded-full blur-3xl animate-pulse transform transition-all duration-1000" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-10 bg-grid-pattern transition-opacity duration-300" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 md:py-16">
        <div className="min-h-screen flex flex-col gap-8 lg:gap-12">
          {/* Top Section - Title and Profile Image Horizontally Aligned */}
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 lg:gap-12 pt-8">
            {/* Title Section */}
            <div className="w-full lg:w-3/5 space-y-6 lg:-mt-4">
              {/* Badge/Status Indicator */}
              <div
                className={cn(
                  "inline-flex items-center gap-2 bg-yellow-400/20 dark:bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/40 dark:border-yellow-400/20 rounded-full px-4 py-2 text-sm font-medium text-yellow-600 dark:text-yellow-400",
                  "transform transition-all duration-1000 ease-out",
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                )}
              >
                <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full animate-pulse" />
                <Typography
                  variant="small"
                  className="text-sm font-medium text-yellow-600 dark:text-yellow-400"
                >
                  Available for new opportunities
                </Typography>
              </div>

              {/* Main Title - Animated */}
              <div
                className={cn(
                  "transform transition-all duration-1000 ease-out delay-200",
                  isVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-12 opacity-0"
                )}
              >
                <Typography
                  variant="h1"
                  className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-800 dark:text-white transition-colors duration-300"
                >
                  {title.split(" ").map((word, index) => {
                    const shouldHighlight =
                      word.toLowerCase().includes("digital") ||
                      word.toLowerCase().includes("experiences") ||
                      word.toLowerCase().includes("matter");

                    return (
                      <span
                        key={index}
                        className={cn(
                          "inline-block mr-3 mb-2",
                          shouldHighlight
                            ? "text-transparent bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 dark:from-yellow-400 dark:via-yellow-300 dark:to-yellow-500 bg-clip-text animate-pulse"
                            : "text-gray-800 dark:text-white"
                        )}
                      >
                        {word}
                      </span>
                    );
                  })}
                </Typography>
              </div>
            </div>

            {/* Profile Image */}
            <div className="w-full lg:w-2/5 flex justify-center lg:justify-end lg:mt-8">
              <div
                className={cn(
                  "relative transform transition-all duration-1000 ease-out delay-300",
                  isVisible
                    ? "translate-y-0 opacity-100 scale-100"
                    : "translate-y-12 opacity-0 scale-95"
                )}
              >
                {/* Background Elements */}
                <div className="absolute -inset-6 bg-gradient-to-r from-yellow-400/30 via-purple-500/20 to-blue-500/30 dark:from-yellow-400/20 dark:via-purple-500/10 dark:to-blue-500/20 rounded-full blur-2xl animate-pulse transition-colors duration-300" />
                <div className="absolute -inset-3 bg-gradient-to-r from-yellow-400/50 to-transparent dark:from-yellow-400/30 dark:to-transparent rounded-full blur-xl transition-colors duration-300" />

                {/* Main Image Container */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full overflow-hidden border-4 border-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 shadow-2xl shadow-yellow-400/40 dark:shadow-yellow-400/25 animate-[bounce_2s_ease-in-out_infinite] transition-shadow duration-300">
                  {/* Image */}
                  <Image
                    src={profileImage}
                    alt={profileAlt}
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    priority
                  />

                  {/* Overlay Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent dark:from-black/20" />

                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-500 dark:bg-yellow-400 rounded-full animate-ping" />
                  <div className="absolute bottom-4 left-4 w-3 h-3 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Advanced Bottom Section - Redesigned Layout */}
          <div className="relative">
            {/* Decorative Elements */}
            <div className="absolute -top-4 left-1/4 w-32 h-32 bg-yellow-400/20 dark:bg-yellow-400/10 rounded-full blur-2xl transition-colors duration-300" />
            <div className="absolute -bottom-4 right-1/4 w-24 h-24 bg-purple-500/15 dark:bg-purple-500/10 rounded-full blur-xl transition-colors duration-300" />

            {/* Main Content Grid */}
            <div className="relative bg-gradient-to-br from-white/80 via-white/90 to-white/80 dark:from-white/5 dark:via-white/10 dark:to-white/5 backdrop-blur-xl border border-gray-200/30 dark:border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl transition-colors duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                {/* Left Column - Subtitle & Description */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Enhanced Subtitle Section */}
                  <div
                    className={cn(
                      "transform transition-all duration-1000 ease-out delay-400",
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    )}
                  >
                    <div className="relative">
                      {/* Accent Line */}
                      <div className="absolute -left-6 top-2 w-1 h-16 bg-gradient-to-b from-yellow-500 to-yellow-600 dark:from-yellow-400 dark:to-yellow-600 rounded-full transition-colors duration-300" />

                      <div className="space-y-3">
                        <Typography
                          variant="h2"
                          className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight text-transparent bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 dark:from-yellow-400 dark:via-yellow-300 dark:to-yellow-500 bg-clip-text"
                        >
                          {subtitle}
                        </Typography>
                        <Typography
                          variant="h3"
                          className="text-lg md:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 font-medium transition-colors duration-300"
                        >
                          Turning complex problems into elegant solutions
                        </Typography>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Description */}
                  <div
                    className={cn(
                      "transform transition-all duration-1000 ease-out delay-500",
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    )}
                  >
                    <div className="relative">
                      <Typography
                        variant="p"
                        className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed font-light transition-colors duration-300"
                      >
                        {description}
                      </Typography>
                      {/* Decorative Quote Mark */}
                      <div className="absolute -top-4 -right-4 text-6xl text-yellow-400/30 dark:text-yellow-400/20 font-serif transition-colors duration-300">
                        "
                      </div>
                    </div>
                  </div>

                  {/* Enhanced CTAs */}
                  <div
                    className={cn(
                      "flex flex-col sm:flex-row gap-6 transform transition-all duration-1000 ease-out delay-700",
                      isVisible
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                    )}
                  >
                    {primaryCTA && (
                      <div className="group relative">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-300" />

                        {primaryCTA.download ? (
                          <a
                            href={primaryCTA.href}
                            download
                            className="relative inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-bold px-10 py-5 rounded-3xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25"
                          >
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <span className="text-lg">{primaryCTA.text}</span>
                          </a>
                        ) : (
                          <Button asChild>
                            <CustomLink href={primaryCTA.href}>
                              {primaryCTA.text}
                            </CustomLink>
                          </Button>
                        )}
                      </div>
                    )}

                    {secondaryCTA && (
                      <Button
                        variant="outline"
                        asChild
                        className="relative border-2 border-gray-300 dark:border-white/30 hover:border-yellow-500 dark:hover:border-yellow-400/70 hover:bg-yellow-400/10 dark:hover:bg-yellow-400/20 text-gray-700 dark:text-white hover:text-yellow-600 dark:hover:text-yellow-300 px-10 py-5 rounded-3xl text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                      >
                        <CustomLink href={secondaryCTA.href}>
                          {secondaryCTA.text}
                        </CustomLink>
                      </Button>
                    )}
                  </div>
                </div>

                {/* Right Column - Quote & Social Links */}
                <div className="lg:col-span-1 space-y-8">
                  {/* Enhanced Quote */}
                  {quote && (
                    <div
                      className={cn(
                        "transform transition-all duration-1000 ease-out delay-600",
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      )}
                    >
                      <div className="relative group">
                        {/* Animated Border */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/60 via-purple-500/40 to-blue-500/60 dark:from-yellow-400/50 dark:via-purple-500/30 dark:to-blue-500/50 rounded-2xl blur opacity-30 dark:opacity-20 group-hover:opacity-50 dark:group-hover:opacity-40 transition duration-500" />

                        <div className="relative p-8 bg-gradient-to-br from-white/90 to-white/70 dark:from-secondary/70 dark:to-secondary/40 backdrop-blur-sm rounded-2xl border border-yellow-400/40 dark:border-yellow-400/30 transition-colors duration-300">
                          {/* Quote Icon */}
                          <div className="absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                            <svg
                              className="w-5 h-5 text-black"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                            </svg>
                          </div>

                          <Typography
                            variant="p"
                            className="italic text-gray-700 dark:text-gray-300 font-medium text-lg leading-relaxed pl-4 transition-colors duration-300"
                          >
                            "{quote}"
                          </Typography>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Social Links */}
                  {socialLinks.length > 0 && (
                    <div
                      className={cn(
                        "transform transition-all duration-1000 ease-out delay-800",
                        isVisible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-8 opacity-0"
                      )}
                    >
                      <div className="space-y-6">
                        <div className="text-center lg:text-left">
                          <Typography
                            variant="h4"
                            className="text-gray-600 dark:text-gray-400 text-lg font-semibold mb-2 transition-colors duration-300"
                          >
                            Connect with me
                          </Typography>
                          <div className="w-16 h-1 bg-gradient-to-r from-yellow-500 to-transparent dark:from-yellow-400 dark:to-transparent rounded-full mx-auto lg:mx-0 transition-colors duration-300" />
                        </div>

                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                          {socialLinks.map((social, index) => (
                            <CustomLink
                              key={index}
                              href={social.href}
                              external
                              className="group relative p-4 bg-white/80 dark:bg-white/10 backdrop-blur-sm border border-gray-200 dark:border-white/20 rounded-2xl hover:border-yellow-500 dark:hover:border-yellow-400/60 hover:bg-yellow-400/20 dark:hover:bg-yellow-400/20 transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 hover:shadow-xl hover:shadow-yellow-400/25"
                              aria-label={social.label}
                            >
                              <Image
                                src={social.icon}
                                width={28}
                                height={28}
                                alt={social.label}
                                className="transition-transform duration-300 group-hover:scale-125"
                              />
                              {/* Enhanced Tooltip */}
                              <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-800/95 dark:bg-gray-900/90 text-white text-sm px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none shadow-lg border border-gray-600 dark:border-gray-700">
                                {social.label}
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800/95 dark:border-t-gray-900/90" />
                              </div>
                            </CustomLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile CTA Below Everything */}
          {primaryCTA && (
            <div className="mt-8 text-center lg:hidden">
              <Typography
                variant="small"
                className="text-center mb-4 text-gray-600 dark:text-gray-300 text-sm transition-colors duration-300"
              >
                Interested in my professional background?
              </Typography>
              {primaryCTA.download ? (
                <a
                  href={primaryCTA.href}
                  download
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
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
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  {primaryCTA.text}
                </a>
              ) : (
                <Button>{primaryCTA.text}</Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
