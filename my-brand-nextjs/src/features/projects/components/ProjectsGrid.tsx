"use client";

import { useState, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import { CategoryFilter } from "./CategoryFilter";
import { usePagination } from "../hooks/usePagination";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";
import { Project } from "@/types/project";
import { projectsData } from "@/lib/projectData";

export function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(projectsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 6;
  const { getPaginatedItems, getPaginationState } = usePagination(
    filteredProjects,
    itemsPerPage
  );
  const paginationState = getPaginationState(currentPage);
  const displayedProjects = getPaginatedItems(currentPage);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (activeCategory === "All Projects") {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(
        projectsData.filter((project) => project.category === activeCategory)
      );
    }
    // Reset to first page when category changes
    setCurrentPage(1);
  }, [activeCategory]);

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    setCurrentPage((prev) => prev + 1);
    setIsLoading(false);
  };

  return (
    <section className="mb-16">
      {/* Category Filter */}
      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Projects Count */}
      <div className="mb-8">
        <Typography
          variant="p"
          className="text-gray-600 dark:text-gray-400 text-center"
        >
          Showing {displayedProjects.length} of {filteredProjects.length}{" "}
          projects
          {activeCategory !== "All Projects" && ` in ${activeCategory}`}
        </Typography>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {displayedProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            delay={`${(index % itemsPerPage) * 0.1}s`}
          />
        ))}
      </div>

      {/* Load More Button */}
      {paginationState.hasNextPage && (
        <div className="text-center">
          <Button
            variant="outline"
            size="md"
            onClick={handleLoadMore}
            loading={isLoading}
            loadingText="Loading more projects..."
            className="bg-white dark:bg-secondary border-2 border-yellow-400 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 hover:border-yellow-500 min-w-[200px]"
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            }
            iconPosition="right"
          >
            Load More Projects
          </Button>
        </div>
      )}

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <Typography
            variant="h4"
            className="text-gray-500 dark:text-gray-400 mb-2"
          >
            No projects found
          </Typography>
          <Typography variant="p" className="text-gray-400 dark:text-gray-500">
            Try selecting a different category to see more projects.
          </Typography>
        </div>
      )}
    </section>
  );
}
