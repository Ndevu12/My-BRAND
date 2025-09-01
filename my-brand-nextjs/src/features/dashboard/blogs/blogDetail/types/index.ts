import { BlogPost } from '@/types/blog';

export interface BlogDetailProps {
  blogId: string;
  className?: string;
}

export interface AdminBlogDetailProps extends BlogDetailProps {
  onEdit?: (blogId: string) => void;
  onDelete?: (blogId: string) => void;
  onBack?: () => void;
}

export interface BlogHeaderProps {
  blog: BlogPost;
  onEdit?: (blogId: string) => void;
  onDelete?: (blogId: string) => void;
  onBack?: () => void;
}

export interface BlogContentProps {
  blog: BlogPost;
}

export interface BlogStatsProps {
  blog: BlogPost;
  stats?: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
  };
}

export interface BlogActionsProps {
  blogId: string;
  onEdit?: (blogId: string) => void;
  onDelete?: (blogId: string) => void;
  onDuplicate?: (blogId: string) => void;
  onToggleStatus?: (blogId: string) => void;
}

export interface BlogMetaProps {
  blog: BlogPost;
  showEditHistory?: boolean;
}

export type BlogStatus = 'published' | 'draft' | 'archived' | 'scheduled';

export interface BlogDetailService {
  getBlogById: (id: string) => Promise<BlogPost | null>;
  updateBlogStatus: (id: string, status: BlogStatus) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;
  duplicateBlog: (id: string) => Promise<string>;
  getBlogStats: (id: string) => Promise<{
    views: number;
    likes: number;
    comments: number;
    shares: number;
  }>;
}
