import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Badge from "@/components/atoms/Badge";
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

  return (
    <article
      className={cn(
        "bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 group",
        className
      )}
    style={style}
    >
      {/* Image Section */}
      <div className="relative">
        <div className="relative h-48 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-gray-400 text-4xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-12 h-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Badges */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="absolute top-4 left-4 right-4">
          <div className="flex justify-between items-start">
            <div className="flex flex-wrap gap-2">
              {category && (
                <Badge
                  variant="category"
                  color={category.color as any}
                  size="sm"
                  icon={
                    category.icon && <i className={`fas ${category.icon}`} />
                  }
                >
                  {category.name}
                </Badge>
              )}
            </div>
            {isNew && (
              <Badge variant="new" size="sm">
                NEW
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Tags */}
        {displayTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {displayTags.map((tag, index) => (
              <Badge
                key={index}
                variant="tech"
                color={tag.color as any}
                size="sm"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={cardHref}>
          <h3 className="text-xl font-bold mb-3 group-hover:text-yellow-400 transition-colors cursor-pointer line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
          {description}
        </p>

        {/* Footer */}
        <div className="flex justify-between items-center border-t border-gray-700/50 pt-4 mt-auto">
          {/* Author & Date */}
          <div className="flex items-center gap-2">
            <Avatar
              src={author.image}
              alt={author.name}
              size="sm"
              border
              borderColor="yellow"
            />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-medium">
                {author.name}
              </span>
              <span className="text-xs text-gray-500">{formattedDate}</span>
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex items-center gap-3">
              <button
                className="text-gray-400 hover:text-yellow-400 transition-colors p-1"
                title="Save article"
                aria-label="Save article"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
              <Link
                href={cardHref}
                className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors"
              >
                Read
              </Link>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
