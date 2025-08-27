import { BlogPost } from '@/types/blog';
import { dummyBlogs } from '@/lib/blogData';
import { BlogDetailService, BlogStatus } from './types';

class AdminBlogDetailService implements BlogDetailService {
  async getBlogById(id: string): Promise<BlogPost | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const blog = dummyBlogs.find(blog => blog.id === id);
    return blog || null;
  }

  async updateBlogStatus(id: string, status: BlogStatus): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real implementation, this would update the blog status on the server
    console.log(`Updated blog ${id} status to ${status}`);
  }

  async deleteBlog(id: string): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In a real implementation, this would delete the blog on the server
    console.log(`Deleted blog ${id}`);
  }

  async duplicateBlog(id: string): Promise<string> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real implementation, this would create a copy of the blog
    const newId = `${id}-copy-${Date.now()}`;
    console.log(`Duplicated blog ${id} as ${newId}`);
    return newId;
  }

  async getBlogStats(id: string): Promise<{
    views: number;
    likes: number;
    comments: number;
    shares: number;
  }> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Mock stats data
    return {
      views: Math.floor(Math.random() * 5000) + 100,
      likes: Math.floor(Math.random() * 200) + 10,
      comments: Math.floor(Math.random() * 50) + 2,
      shares: Math.floor(Math.random() * 30) + 1,
    };
  }
}

export const adminBlogDetailService = new AdminBlogDetailService();
