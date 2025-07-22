import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Badge from "@/components/atoms/Badge";

export interface ProjectCardProps {
  id: string | number;
  title: string;
  description: string;
  image: string;
  category?: string;
  techStack?: Array<{ name: string; color: string }>;
  caseStudyLink?: string;
  githubLink?: string;
  liveLink?: string;
  isLive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  title,
  description,
  image,
  category,
  techStack = [],
  caseStudyLink,
  githubLink,
  liveLink,
  isLive = false,
  className,
  style = {},
}) => {
  return (
    <div
      className={cn(
        "group bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2",
        className
      )}
      style={style}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden h-60">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Tech Stack Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            {techStack.length > 0 && (
              <div className="flex gap-2 mb-2 flex-wrap">
                {techStack.slice(0, 3).map((tech, index) => (
                  <Badge
                    key={index}
                    variant="tech"
                    color={tech.color as any}
                    size="sm"
                  >
                    {tech.name}
                  </Badge>
                ))}
              </div>
            )}
            <h4 className="font-bold text-white text-sm">Tech Stack</h4>
          </div>
        </div>

        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4">
            <Badge variant="category" color="blue" size="sm">
              {category}
            </Badge>
          </div>
        )}

        {/* Live Status Badge */}
        {isLive && (
          <div className="absolute top-4 right-4">
            <Badge variant="status" color="green" size="sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1" />
              Live
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-yellow-400 group-hover:text-yellow-300 transition-colors">
          {title}
        </h3>
        <p className="text-gray-300 mb-4 line-clamp-3">{description}</p>

        {/* Actions */}
        <div className="flex justify-between items-center mt-4">
          {/* Case Study Link */}
          {caseStudyLink && (
            <Link
              href={caseStudyLink}
              className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
            >
              Case Study
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          )}

          {/* Action Links */}
          <div className="flex items-center gap-4">
            {/* Live Demo Link */}
            {isLive && liveLink && (
              <Link
                href={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors"
                title="View live demo"
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
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                  />
                </svg>
                <span className="text-sm">Live</span>
              </Link>
            )}

            {/* GitHub Link */}
            {githubLink && (
              <Link
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                title="View source code"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                <span className="text-sm">GitHub</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
