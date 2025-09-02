import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Avatar from "@/components/atoms/Avatar";

export interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  author: {
    name: string;
    image?: string;
  };
  style?: React.CSSProperties;
  date: string | Date;
  tags?: Array<{
    name: string;
    color?: string;
    icon?: string;
  }>;
  category?: {
    _id?: string;
    name: string;
    color?: string;
    icon?: string;
  };
  isNew?: boolean;
  href?: string;
  className?: string;
  showActions?: boolean;
}

const BlogCard: React.FC<BlogCardProps> = ({
  id,
  style = {},
  title,
  description,
  imageUrl,
  author,
  date,
  tags = [],
  category,
  isNew = false,
  href,
  className,
  showActions = true,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const formattedDate = React.useMemo(() => {
    const dateObj = date instanceof Date ? date : new Date(date);
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [date]);

  const cardHref = href || `/blog/${id}`;
  const displayTags = tags.slice(0, 2);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <article
      className={cn("group relative overflow-hidden", className)}
      style={style}
    >
      {/* Main Container with Glass Morphism */}
      <div className="relative bg-gradient-to-br from-yellow-400/5 via-white/20 to-yellow-500/10 dark:from-yellow-400/5 dark:via-secondary/20 dark:to-yellow-500/10 backdrop-blur-xl border border-yellow-400/20 dark:border-yellow-400/20 rounded-3xl p-1 transition-all duration-700 hover:border-yellow-400/40 dark:hover:border-yellow-400/40 hover:shadow-2xl hover:shadow-yellow-400/10">
        {/* Inner Container */}
        <div className="relative bg-gradient-to-br from-white/90 via-gray-50/95 to-white/90 dark:from-black/60 dark:via-gray-900/80 dark:to-black/60 rounded-2xl overflow-hidden min-h-[320px] flex flex-col">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,0,0.1)_0%,transparent_50%)] animate-pulse" />
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,255,0,0.05)_0%,transparent_50%)] animate-pulse"
              style={{ animationDelay: "0.5s" }}
            />
          </div>

          {/* Top Header Section */}
          <div className="relative z-10 p-6 pb-0">
            <div className="flex items-start justify-between mb-4">
              {/* Status Badges */}
              <div className="flex flex-wrap gap-2">
                {isNew && (
                  <div className="relative">
                    <div className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-emerald-500 text-black text-xs font-bold rounded-full animate-pulse">
                      NEW
                    </div>
                    <div className="absolute inset-0 bg-emerald-400/50 rounded-full blur-md animate-ping" />
                  </div>
                )}
                {category && (
                  <div className="px-3 py-1 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 dark:from-yellow-400/20 dark:to-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-xs font-semibold rounded-full border border-yellow-400/30 dark:border-yellow-400/30 backdrop-blur-sm">
                    {category.name}
                  </div>
                )}
              </div>

              {/* Date Badge */}
              <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800/50 px-3 py-1 rounded-full backdrop-blur-sm border border-gray-200 dark:border-gray-700/50">
                {formattedDate}
              </div>
            </div>

            {/* Tags Row */}
            {displayTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {displayTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-yellow-400/10 dark:bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 text-xs rounded-md border border-yellow-400/20 dark:border-yellow-400/20 backdrop-blur-sm"
                  >
                    #{typeof tag === "string" ? tag : tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Image Section - Diagonal Cut */}
          <div className="relative flex-1 mx-6 mb-6">
            <div
              className={`relative rounded-2xl overflow-hidden transform group-hover:scale-[1.02] transition-all duration-700 ${
                isExpanded ? "h-24" : "h-40"
              }`}
            >
              {/* Diagonal overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-yellow-400/0 to-yellow-400/20 z-10" />
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-yellow-400/30 to-transparent z-10 transform rotate-45 translate-x-10 -translate-y-10" />

              {imageUrl ? (
                <>
                  <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
                  />

                  {/* Animated overlay bars */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 z-20" />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/80 dark:to-gray-900/80 flex items-center justify-center">
                  <div className="text-gray-500 dark:text-gray-400 p-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-200 dark:border-gray-700/50">
                    <svg
                      className={`mx-auto transition-all duration-700 ${
                        isExpanded ? "w-8 h-8" : "w-16 h-16"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {/* Floating Action Button */}
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <Link
                  href={cardHref}
                  className={`bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-yellow-400/50 backdrop-blur-sm border-2 border-yellow-300/30 ${
                    isExpanded ? "w-8 h-8" : "w-12 h-12"
                  }`}
                >
                  <svg
                    className={`transition-all duration-300 ${
                      isExpanded ? "w-3 h-3" : "w-5 h-5"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="relative z-10 p-6 pt-0">
            {/* Title with Unique Styling */}
            <Link href={cardHref} className="group/title block mb-4">
              <h3 className="text-xl md:text-2xl font-bold leading-tight">
                <span className="block text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text group-hover/title:from-yellow-300 group-hover/title:to-yellow-400 transition-all duration-500">
                  {title}
                </span>
                {/* Decorative underline */}
                <div className="h-0.5 bg-gradient-to-r from-yellow-400/0 via-yellow-400/60 to-yellow-400/0 transform scale-x-0 group-hover/title:scale-x-100 transition-transform duration-500 mt-2" />
              </h3>
            </Link>

            {/* Description */}
            <div className="mb-6">
              <p
                className={`text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300 ${
                  isExpanded ? "" : "line-clamp-2"
                }`}
              >
                {description}
              </p>

              {/* Expand/Collapse Button */}
              {description && description.length > 100 && (
                <button
                  onClick={toggleExpanded}
                  className="mt-2 inline-flex items-center gap-1 text-yellow-500 dark:text-yellow-400 hover:text-yellow-600 dark:hover:text-yellow-300 text-sm font-medium transition-colors duration-300 group/expand"
                >
                  <span>{isExpanded ? "Show less" : "Read more"}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    } group-hover/expand:scale-110`}
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

            {/* Bottom Section with Unique Layout */}
            <div className="flex items-center justify-between">
              {/* Author Section */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar
                    src={author.image}
                    alt={author.name}
                    size="sm"
                    className="ring-2 ring-yellow-400/30 group-hover:ring-yellow-400/60 transition-all duration-300"
                  />
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white group-hover:text-yellow-500 dark:group-hover:text-yellow-400 transition-colors duration-300">
                    {author.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Author
                  </p>
                </div>
              </div>

              {/* CTA Button with Unique Design */}
              <Link
                href={cardHref}
                className="group/cta relative inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400/10 via-yellow-500/15 to-yellow-400/10 dark:from-yellow-400/10 dark:via-yellow-500/15 dark:to-yellow-400/10 hover:from-yellow-400/20 hover:via-yellow-500/25 hover:to-yellow-400/20 dark:hover:from-yellow-400/20 dark:hover:via-yellow-500/25 dark:hover:to-yellow-400/20 text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 text-sm font-bold rounded-2xl border border-yellow-400/30 dark:border-yellow-400/30 hover:border-yellow-400/60 dark:hover:border-yellow-400/60 transition-all duration-500 backdrop-blur-sm overflow-hidden"
              >
                <span className="relative z-10">Explore</span>
                <div className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover/cta:translate-x-1">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    className="w-full h-full"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </div>
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 via-yellow-400/10 to-yellow-400/0 transform translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-700" />
              </Link>
            </div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-br-full opacity-50" />
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-yellow-400/10 to-transparent rounded-tl-full opacity-50" />
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
