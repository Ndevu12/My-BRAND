export interface TechStack {
  name: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'pink' | 'orange' | 'cyan';
}

export interface ProjectCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  bgClass: string;
  textClass: string;
  description?: string;
}


export interface ProjectSearchFilters {
  category?: string;
  techStack?: string[];
  status?: 'published' | 'draft';
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  query?: string;
  sortBy?: 'newest' | 'oldest' | 'title' | 'difficulty';
  page?: number;
  limit?: number;
}

export interface ProjectMetadata {
  totalProjects: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ProjectPageProps {
  projects: Project[];
  featuredProject?: Project;
  categories: ProjectCategory[];
  metadata: ProjectMetadata;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'Web Apps' | 'Mobile' | 'UI/UX Design' | 'All Projects';
  techStack: TechStack[];
  caseStudyLink?: string;
  githubLink?: string;
  liveLink?: string;
  isLive: boolean;
}
