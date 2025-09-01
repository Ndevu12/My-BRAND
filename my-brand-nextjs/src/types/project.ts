export interface TechStack {
  name: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'pink' | 'orange' | 'cyan';
}

export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  content?: string;
  featuredImage?: File | null;
  imageUrl?: string;
  imageCaption?: string;
  categoryId: string;
  techStack: TechStack[];
  status: 'published' | 'draft';
  isLive: boolean;
  githubLink?: string;
  liveLink?: string;
  caseStudyLink?: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration?: string;
  clientName?: string;
  projectYear?: string;
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

export interface ProjectFormData {
  title: string;
  description: string;
  shortDescription: string;
  content: string;
  featuredImage?: File | null;
  imageUrl: string;
  imageCaption: string;
  categoryId: string;
  techStack: TechStack[];
  status: 'published' | 'draft';
  isLive: boolean;
  githubLink: string;
  liveLink: string;
  caseStudyLink: string;
  author: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  clientName: string;
  projectYear: string;
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

export interface NewProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  onPreview: (data: ProjectFormData) => void;
  isSubmitting?: boolean;
  initialData?: Partial<ProjectFormData>;
}
