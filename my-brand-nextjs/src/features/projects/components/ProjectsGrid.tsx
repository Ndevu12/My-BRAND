import Link from "next/link";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with Next.js, featuring user authentication, payment integration, and admin dashboard.",
    image: "/images/project/ecommerce.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
    ],
    liveUrl: "https://ecommerce.example.com",
    githubUrl: "https://github.com/Ndevu12/ecommerce",
    featured: true,
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/images/project/taskmanager.png",
    technologies: ["React", "Node.js", "Socket.io", "MongoDB", "Express"],
    liveUrl: "https://taskmanager.example.com",
    githubUrl: "https://github.com/Ndevu12/taskmanager",
    featured: true,
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description:
      "A responsive weather dashboard that provides detailed weather information with beautiful data visualizations and forecasts.",
    image: "/images/project/weather.png",
    technologies: [
      "React",
      "Chart.js",
      "Weather API",
      "CSS Grid",
      "LocalStorage",
    ],
    liveUrl: "https://weather.example.com",
    githubUrl: "https://github.com/Ndevu12/weather-dashboard",
  },
  {
    id: "4",
    title: "Blog Platform",
    description:
      "A modern blog platform with content management, user comments, social sharing, and SEO optimization.",
    image: "/images/project/blog.png",
    technologies: ["Next.js", "MDX", "Tailwind CSS", "Vercel", "CMS"],
    liveUrl: "https://blog.example.com",
    githubUrl: "https://github.com/Ndevu12/blog-platform",
  },
  {
    id: "5",
    title: "Portfolio Website",
    description:
      "A responsive portfolio website showcasing projects, skills, and professional experience with modern design.",
    image: "/images/project/portfolio.png",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    liveUrl: "https://ndevuspace.com",
    githubUrl: "https://github.com/Ndevu12/portfolio",
  },
  {
    id: "6",
    title: "API Gateway",
    description:
      "A scalable API gateway solution with authentication, rate limiting, and comprehensive monitoring capabilities.",
    image: "/images/project/api.png",
    technologies: ["Node.js", "Express", "Redis", "JWT", "Docker"],
    githubUrl: "https://github.com/Ndevu12/api-gateway",
  },
];

export function ProjectsGrid() {
  return (
    <section>
      {/* Featured Projects */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Featured Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
        </div>
      </div>

      {/* All Projects */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">All Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .filter((project) => !project.featured)
            .map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 ${
        featured ? "lg:col-span-1" : ""
      }`}
    >
      {/* Project Image */}
      <div className="aspect-video bg-gradient-to-br from-blue-100 to-indigo-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-4xl">🚀</div>
        </div>
        {/* Placeholder for actual image */}
        {/* <img src={project.image} alt={project.title} className="w-full h-full object-cover" /> */}
      </div>

      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center font-medium"
            >
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center font-medium"
            >
              View Code
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
