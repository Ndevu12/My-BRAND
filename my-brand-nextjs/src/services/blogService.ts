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

// Fetch all public blogs with pagination
export async function getAllPublicBlogs(page: number = 1, limit: number = 10) {
  const result = await safeFetch(`${API_BASE_URL}/blogs/public?page=${page}&limit=${limit}`);

  if (result.success && result.data) {
    return {
      blogs: result.data.blogs || [],
      pagination: result.data.pagination || null,
      filters: result.data.filters || null
    };
  }
  
  // Log error for debugging but don't throw
  if (result.error) {
    const userMessage = getErrorMessage(result.error, result.code);
    console.error('Error fetching all blogs:', userMessage, result.code ? `(${result.code})` : '');
  }
  
  // Return empty structure for graceful fallback
  return {
    blogs: [],
    pagination: null,
    filters: null
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
