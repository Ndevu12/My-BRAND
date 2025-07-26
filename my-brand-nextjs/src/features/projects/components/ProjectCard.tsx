import Image from "next/image";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import { Project, TechStack } from "../data/projectsData";

interface ProjectCardProps {
  project: Project;
  delay?: string;
}

const techStackColors = {
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  green: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  yellow:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  red: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  purple:
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  pink: "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300",
  orange:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
};

export function ProjectCard({ project, delay = "0s" }: ProjectCardProps) {
  return (
    <div
      className={`bg-white dark:bg-secondary border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-gray-200/20 dark:hover:shadow-black/20 transition-all duration-300 group opacity-0 animate-fade-in transform hover:scale-105 [animation-delay:${delay}]`}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Live Status Badge */}
        {project.isLive && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Live
          </div>
        )}
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          {project.category}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        {/* Title */}
        <Typography
          variant="h4"
          className="mb-3 text-gray-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors duration-300"
        >
          {project.title}
        </Typography>

        {/* Description */}
        <Typography
          variant="p"
          className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3"
        >
          {project.description}
        </Typography>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-md text-xs font-medium ${
                techStackColors[tech.color]
              }`}
            >
              {tech.name}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {project.liveLink && (
            <Button
              variant="primary"
              size="sm"
              className="flex-1"
              onClick={() => window.open(project.liveLink, "_blank")}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              Live Demo
            </Button>
          )}
          {project.githubLink && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => window.open(project.githubLink, "_blank")}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
