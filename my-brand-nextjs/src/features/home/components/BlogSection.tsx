"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import BlogCard from "@/features/home/components/BlogCard";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  imageAlt?: string;
  publishedAt: string;
  readTime?: string;
  category?: string;
  slug: string;
  author?: {
    name: string;
    image?: string;
  };
  tags?: Array<{
    name: string;
    color?: string;
    icon?: string;
  }>;
}

export interface BlogSectionProps {
  posts: BlogPost[];
  className?: string;
  title?: string;
  subtitle?: string;
  showViewAll?: boolean;
  maxDisplay?: number;
  defaultAuthor?: {
    name: string;
    image?: string;
  };
}

const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  className,
  title = "Latest Insights",
  subtitle = "Thoughts, tutorials, and insights from my development journey",
  showViewAll = true,
  maxDisplay = 3,
  defaultAuthor = {
    name: "Ndevu Gigi",
    image: "/images/mypic.png",
  },
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const displayedPosts = maxDisplay ? posts.slice(0, maxDisplay) : posts;

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

  return (
    <section
      ref={sectionRef}
      className={cn(
        "relative py-20 md:py-32 overflow-hidden bg-gray-50 dark:bg-primary",
        className
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-yellow-400/5 dark:bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-blue-500/5 dark:bg-blue-500/5 rounded-full blur-3xl" />

        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:30px_30px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Enhanced Section Header */}
        <div className="text-center mb-16">
          {/* Section Badge */}
          <div
            className={cn(
              "inline-flex items-center gap-2 bg-yellow-400/10 dark:bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/20 dark:border-yellow-400/20 rounded-full px-6 py-3 mb-6",
              "transform transition-all duration-1000 ease-out",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            <Typography variant="small" className="text-yellow-400 font-medium">
              Blog & Insights
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
            <Typography
              variant="h2"
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-gray-800 dark:text-white"
            >
              {title.split(" ").map((word, index) => (
                <span
                  key={index}
                  className={cn(
                    "inline-block mr-3",
                    index === title.split(" ").length - 1
                      ? "text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text"
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
                className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              >
                {subtitle}
              </Typography>
            </div>
          )}
        </div>

        {/* Enhanced Blog Posts Grid */}
        {displayedPosts.length > 0 ? (
          <div
            className={cn(
              "grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12",
              "transform transition-all duration-1000 ease-out delay-500",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-16 opacity-0"
            )}
          >
            {displayedPosts.map((post, index) => {
              // Transform BlogPost to BlogCardProps
              const blogCardProps = {
                id: post.id,
                title: post.title,
                description: post.excerpt,
                imageUrl: post.image,
                author: post.author || defaultAuthor,
                date: post.publishedAt,
                tags: post.tags || [],
                category: post.category
                  ? {
                      name: post.category,
                      color: "yellow",
                    }
                  : undefined,
                href: `/blog/${post.slug}`,
                className: cn(
                  "transform transition-all duration-700 ease-out hover:scale-[1.02]",
                  hoveredPost === post.id ? "z-10" : ""
                ),
              };

              return (
                <div
                  key={post.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredPost(post.id)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  {/* Enhanced Background glow effect */}
                  <div className="absolute -inset-6 bg-gradient-to-r from-yellow-400/20 via-purple-500/15 to-blue-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-700" />

                  {/* Floating particles effect */}
                  <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-400/60 rounded-full animate-ping" />
                    <div className="absolute bottom-4 right-4 w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-pulse" />
                    <div className="absolute top-1/2 right-4 w-1 h-1 bg-purple-400/60 rounded-full animate-bounce" />
                  </div>

                  <BlogCard {...blogCardProps} />
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className={cn(
              "text-center py-20 transform transition-all duration-1000 ease-out delay-500",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
          </div>
        )}

        {/* Enhanced Explore More Insights Button */}
        <div
          className={cn(
            "text-center mt-20 transform transition-all duration-1000 ease-out delay-700",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          )}
        >
          <Button variant="ghost" size="lg" asChild>
            <Link
              href="/blog"
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
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <Typography variant="span" className="font-semibold text-lg">
                    Explore More Insights
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
            </Link>
          </Button>

          {/* Additional Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-yellow-400"
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
                variant="h4"
                className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
              >
                {posts.length}+
              </Typography>
              <Typography
                variant="small"
                className="text-gray-600 dark:text-gray-400"
              >
                Articles & Tutorials
              </Typography>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-400/20 to-blue-500/20 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <Typography
                variant="h4"
                className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
              >
                Weekly
              </Typography>
              <Typography
                variant="small"
                className="text-gray-600 dark:text-gray-400"
              >
                Fresh Content
              </Typography>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-purple-400/20 to-purple-500/20 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <Typography
                variant="h4"
                className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
              >
                5min
              </Typography>
              <Typography
                variant="small"
                className="text-gray-600 dark:text-gray-400"
              >
                Average Read
              </Typography>
            </div>
          </div>
        </div>

        {/* Newsletter CTA Section - below insights */}
        {displayedPosts.length > 0 && (
          <div
            className={cn(
              "mt-20 text-center transform transition-all duration-1000 ease-out delay-800",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
          >
            {/* Simple CTA Statement */}
            <Typography
              variant="p"
              className="text-gray-600 dark:text-gray-300 text-lg mb-8"
            >
              Want to stay updated with the latest insights? Subscribe to my
              newsletter.
            </Typography>
          </div>
        )}

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-yellow-400/30 dark:bg-yellow-400/30 rounded-full animate-ping" />
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-purple-500/30 dark:bg-purple-500/30 rounded-full animate-pulse" />
      </div>
    </section>
  );
};

export default BlogSection;
