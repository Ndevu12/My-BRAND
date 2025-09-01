import { API_BASE_URL } from '@/lib/constants';
import { safeFetch } from 'utils/apiResponse';

/**
 * Handle specific blog API errors with user-friendly messages
 */
function getErrorMessage(error: string, code?: string): string {
  switch (code) {
    case 'INVALID_LIMIT':
      return 'Invalid number of items requested';
    case 'INVALID_PAGE':
      return 'Invalid page number';
    case 'INVALID_SORT_FIELD':
      return 'Invalid sorting option';
    default:
      return error || 'Failed to load content';
  }
}

// Simple function to fetch recent blogs for home page
export const getRecentBlogsForHome = async (): Promise<any[]> => {
  const result = await safeFetch(`${API_BASE_URL}/blogs/public?page=1&limit=3`);
  
  if (!result.success) {
    return [];
  }

  return result.data?.blogs || [];
};

// Fetch all blog categories from server
export async function getAllBlogCategories(): Promise<any[]> {
  const result = await safeFetch(`${API_BASE_URL}/blog-category`);
  
  if (!result.success) {
    console.error('Error fetching categories:', result.error);
    return [];
  }
  
  return result.data || [];
}

// Fetch paginated blogs for blog page
export async function getBlogsPaginated(page: number = 1, limit: number = 10): Promise<{
  blogs: any[];
  totalCount: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
  pagination: any;
}> {
  const result = await safeFetch(`${API_BASE_URL}/blogs/public?page=${page}&limit=${limit}`);
  
  if (!result.success) {
    console.error('Error fetching paginated blogs:', result.error);
    return { 
      blogs: [], 
      totalCount: 0, 
      hasMore: false,
      currentPage: 1,
      totalPages: 1,
      pagination: {}
    };
  }
  
  const blogs = result.data?.blogs || [];
  const pagination = result.data?.pagination || {};
  
  return {
    blogs,
    totalCount: pagination.totalBlogs || 0,
    hasMore: pagination.hasNextPage || false,
    currentPage: pagination.currentPage || page,
    totalPages: pagination.totalPages || 1,
    pagination
  };
}

// Fetch single blog by ID
export async function getBlogById(id: string) {
  const result = await safeFetch(`${API_BASE_URL}/blogs/public/${id}`);
  
  if (result.success && result.data) {
    return result.data;
  }
  
  // Log error for debugging but don't throw
  if (result.error) {
    const userMessage = getErrorMessage(result.error, result.code);
    console.error(`Error fetching blog ${id}:`, userMessage, result.code ? `(${result.code})` : '');
  }
  
  return null;
}
