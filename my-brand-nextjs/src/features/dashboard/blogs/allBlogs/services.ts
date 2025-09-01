import { BlogPost } from '@/types/blog';
import { BlogAdminFilters, BlogAdminResponse } from './types';
import { dummyBlogs } from '@/lib/blogData';

// Mock API service that can be easily replaced with real API calls
export class BlogAdminService {
  
  // Simulate API delay
  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get all blogs with filtering, sorting, and pagination
  async getAdminBlogs(filters: BlogAdminFilters): Promise<BlogAdminResponse> {
    await this.delay(300); // Simulate network delay
    
    let filteredBlogs = [...dummyBlogs];
    
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredBlogs = filteredBlogs.filter(blog => 
        blog.title.toLowerCase().includes(searchLower) ||
        blog.description.toLowerCase().includes(searchLower) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply category filter
    if (filters.category) {
      filteredBlogs = filteredBlogs.filter(blog => 
        blog.category.id === filters.category
      );
    }
    
    // Apply status filter (for now, assume all blogs are published)
    if (filters.status) {
      // Add status to blog posts if not present
      filteredBlogs = filteredBlogs.filter(blog => {
        const status = (blog as any).status || 'published';
        return status === filters.status;
      });
    }
    
    // Apply sorting
    filteredBlogs.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (filters.sortBy) {
        case 'title':
          aValue = a.title;
          bValue = b.title;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case 'updatedAt':
          aValue = new Date(a.updatedAt || a.createdAt);
          bValue = new Date(b.updatedAt || b.createdAt);
          break;
        case 'viewsCount':
          aValue = (a as any).viewsCount || 0;
          bValue = (b as any).viewsCount || 0;
          break;
        case 'likesCount':
          aValue = (a as any).likesCount || 0;
          bValue = (b as any).likesCount || 0;
          break;
        default:
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
      }
      
      if (filters.sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
    
    // Calculate pagination
    const totalBlogs = filteredBlogs.length;
    const totalPages = Math.ceil(totalBlogs / filters.limit);
    const startIndex = (filters.page - 1) * filters.limit;
    const endIndex = startIndex + filters.limit;
    const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);
    
    // Add mock data to blogs for admin purposes
    const blogsWithAdminData = paginatedBlogs.map(blog => ({
      ...blog,
      status: (blog as any).status || 'published',
      viewsCount: (blog as any).viewsCount || Math.floor(Math.random() * 1000) + 100,
      likesCount: (blog as any).likesCount || Math.floor(Math.random() * 100) + 10,
    }));
    
    return {
      blogs: blogsWithAdminData,
      pagination: {
        currentPage: filters.page,
        totalPages,
        totalBlogs,
        blogsPerPage: filters.limit,
      }
    };
  }
  
  // Delete a blog
  async deleteBlog(blogId: string): Promise<void> {
    await this.delay(200);
    
    // In a real implementation, this would make an API call
    // For now, we'll just simulate the deletion
    console.log(`Blog ${blogId} would be deleted`);
    
    // You could also remove from the dummyBlogs array if needed for persistence during session
    // const index = dummyBlogs.findIndex(blog => blog.id === blogId);
    // if (index > -1) {
    //   dummyBlogs.splice(index, 1);
    // }
  }
  
  // Update blog status
  async updateBlogStatus(blogId: string, status: 'published' | 'draft' | 'archived'): Promise<void> {
    await this.delay(200);
    
    // In a real implementation, this would make an API call
    console.log(`Blog ${blogId} status would be updated to ${status}`);
  }
}

// Export a singleton instance
export const blogAdminService = new BlogAdminService();
