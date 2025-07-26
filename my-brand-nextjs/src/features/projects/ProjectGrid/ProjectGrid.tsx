import React from "react";
import { cn } from "@/lib/utils";
import ProjectCard, {
  ProjectCardProps,
} from "@/features/home/components/ProjectCard";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import Pagination from "@/components/molecules/Pagination";

export interface ProjectGridProps {
  projects: ProjectCardProps[];
  className?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  showPagination?: boolean;
  pageSize?: number;
  title?: string;
  subtitle?: string;
  showLoadMore?: boolean;
  onViewAll?: () => void;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  className,
  showFilters = true,
  showSearch = true,
  showPagination = false,
  pageSize = 6,
  title,
  subtitle,
  showLoadMore = false,
  onViewAll,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [visibleCount, setVisibleCount] = React.useState(pageSize);

  // Get unique categories
  const categories = React.useMemo(() => {
    const cats = Array.from(
      new Set(projects.map((p) => p.category).filter(Boolean))
    );
    return ["All", ...cats];
  }, [projects]);

  // Filter projects
  const filteredProjects = React.useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        !searchTerm ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategory]);

  // Paginate or limit projects
  const displayedProjects = React.useMemo(() => {
    if (showPagination) {
      const startIndex = (currentPage - 1) * pageSize;
      return filteredProjects.slice(startIndex, startIndex + pageSize);
    }

    if (showLoadMore) {
      return filteredProjects.slice(0, visibleCount);
    }

    return filteredProjects;
  }, [
    filteredProjects,
    currentPage,
    pageSize,
    visibleCount,
    showPagination,
    showLoadMore,
  ]);

  const totalPages = Math.ceil(filteredProjects.length / pageSize);
  const hasMoreProjects =
    showLoadMore && visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + pageSize, filteredProjects.length)
    );
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setVisibleCount(pageSize);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
    setVisibleCount(pageSize);
  };

  return (
    <section className={cn("py-16", className)}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {title.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className={
                      index === title.split(" ").length - 1
                        ? "text-yellow-400"
                        : ""
                    }
                  >
                    {word}
                    {index < title.split(" ").length - 1 && " "}
                  </span>
                ))}
              </h2>
            )}
            {subtitle && (
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Filters and Search */}
        {(showFilters || showSearch) && (
          <div className="mb-8 space-y-6">
            {/* Search */}
            {showSearch && (
              <div className="max-w-md mx-auto">
                <SearchBar
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search projects..."
                />
              </div>
            )}

            {/* Category Filters */}
            {showFilters && categories.length > 1 && (
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category ?? "")}
                    className={cn(
                      "px-4 py-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400",
                      selectedCategory === category
                        ? "bg-yellow-500 text-black font-medium"
                        : "bg-secondary text-white hover:bg-yellow-500 hover:text-black"
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Results Info */}
        {(showSearch || showFilters) && (
          <div className="mb-6 text-center">
            <p className="text-gray-400">
              Showing {displayedProjects.length} of {filteredProjects.length}{" "}
              projects
              {searchTerm && ` for "${searchTerm}"`}
              {selectedCategory !== "All" && ` in ${selectedCategory}`}
            </p>
          </div>
        )}

        {/* Projects Grid */}
        {displayedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {displayedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                {...project}
                className="animate-fade-in"
                style={
                  { animationDelay: `${index * 0.1}s` } as React.CSSProperties
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16 mx-auto"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No projects found
            </h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search terms or filters.
            </p>
            {(searchTerm || selectedCategory !== "All") && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Load More Button */}
        {hasMoreProjects && (
          <div className="text-center">
            <Button onClick={handleLoadMore} variant="outline">
              Load More Projects
            </Button>
          </div>
        )}

        {/* Pagination */}
        {showPagination && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredProjects.length}
            pageSize={pageSize}
          />
        )}

        {/* View All Button */}
        {onViewAll && (
          <div className="text-center mt-10">
            <Button onClick={onViewAll}>View All Projects</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectGrid;
