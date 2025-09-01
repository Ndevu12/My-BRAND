export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  content?: string;
  author: string;
  authorImage?: string;
  createdAt: string;
  updatedAt?: string;
  imageUrl?: string;
  category: BlogCategory;
  tags: string[];
  readTime: string;
  isNew?: boolean;
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  icon: string;
}

export interface BlogSearchFilters {
  category?: string;
  tags?: string[];
  query?: string;
  sortBy?: 'newest' | 'oldest' | 'popular';
  page?: number;
  limit?: number;
}

export interface BlogMetadata {
  totalPosts: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface BlogPageProps {
  posts: BlogPost[];
  featuredPost?: BlogPost;
  categories: BlogCategory[];
  popularPosts: BlogPost[];
  metadata: BlogMetadata;
}

export interface BlogServerResponse {
  posts: BlogPost[];
  pagination: BlogMetadata;
  filters: BlogSearchFilters;
}