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
      className={cn("relative overflow-hidden", className)}
      style={style}
    >
      {/* Card Container */}
      <div className="relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        {/* Inner Container */}
        <div className="relative rounded-xl overflow-hidden min-h-[320px] flex flex-col">
          {/* Top Header Section */}
          <div className="relative z-10 p-6 pb-0">
            <div className="flex items-start justify-between mb-4">
              {/* Status Badges */}
              <div className="flex flex-wrap gap-2">
                {isNew && (
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700">
                    New
                  </span>
                )}
                {category && (
                  <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium rounded-full border border-gray-200 dark:border-gray-700">
                    {category.name}
                  </span>
                )}
              </div>

              {/* Date Badge */}
              <div className="text-xs text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 px-3 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                {formattedDate}
              </div>
            </div>

            {/* Tags Row */}
            {displayTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {displayTags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-md border border-gray-200 dark:border-gray-700"
                  >
                    #{typeof tag === "string" ? tag : tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Image Section */}
          <div className="relative flex-1 mx-6 mb-6">
            <div
              className={`relative rounded-lg overflow-hidden ${
                isExpanded ? "h-24" : "h-40"
              }`}
            >
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <svg
                    className={`text-gray-400 ${
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
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="relative z-10 p-6 pt-0">
            {/* Title with Unique Styling */}
            <Link href={cardHref} className="block mb-4">
              <h3 className="text-xl md:text-2xl font-semibold leading-tight text-gray-900 dark:text-gray-100">
                {title}
              </h3>
            </Link>

            {/* Description */}
            <div className="mb-6">
              <p
                className={`text-gray-600 dark:text-gray-300 leading-relaxed ${
                  isExpanded ? "" : "line-clamp-2"
                }`}
              >
                {description}
              </p>

              {/* Expand/Collapse Button */}
              {description && description.length > 100 && (
                <button
                  onClick={toggleExpanded}
                  className="mt-2 inline-flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 text-sm font-medium"
                >
                  <span>{isExpanded ? "Show less" : "Read more"}</span>
                  <svg
                    className={`w-4 h-4 ${isExpanded ? "rotate-180" : ""}`}
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
                <Avatar src={author.image} alt={author.name} size="sm" />
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
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
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700"
              >
                Explore
                <svg
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
