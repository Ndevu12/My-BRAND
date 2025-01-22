/**
 * Dashboard Articles Data
 * Extends the dummy blog data with additional dashboard-specific properties
 */

import { dummyBlogs } from './dummyBlogs.js';

// Map the dummy blogs to include dashboard-specific properties
export const dashboardArticles = dummyBlogs.map(blog => ({
  id: blog.id,
  title: blog.title,
  subtitle: blog.description,
  content: blog.content,
  status: Math.random() > 0.2 ? 'published' : 'draft', // Randomize some as drafts
  publishDate: blog.status === 'draft' ? null : blog.createdAt,
  createdAt: blog.createdAt,
  category: blog.category,
  tags: blog.tags,
  views: Math.floor(Math.random() * 5000), // Random view count for demo
  featured: Math.random() > 0.7, // Some articles are featured
  author: blog.author || 'Ndevu',
  imageUrl: blog.imageUrl
}));

// Sort by created date (newest first)
dashboardArticles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

/**
 * Get dashboard articles with optional filtering and pagination
 * @param {Object} options - Filter and pagination options
 * @returns {Object} Filtered articles with pagination metadata
 */
export function getDashboardArticles(options = {}) {
  const {
    page = 1,
    pageSize = 3,
    category = '',
    status = '',
    search = '',
    sort = 'newest'
  } = options;

  // Filter articles
  let filtered = [...dashboardArticles];
  
  // Apply category filter
  if (category) {
    filtered = filtered.filter(article => article.category === category);
  }
  
  // Apply status filter
  if (status) {
    filtered = filtered.filter(article => article.status === status);
  }
  
  // Apply search filter (case insensitive)
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(article => 
      article.title.toLowerCase().includes(searchLower) || 
      article.subtitle.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply sorting
  switch(sort) {
    case 'oldest':
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case 'title_asc':
      filtered.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'title_desc':
      filtered.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case 'popular':
      filtered.sort((a, b) => b.views - a.views);
      break;
    case 'newest':
    default:
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedArticles = filtered.slice(startIndex, endIndex);
  
  return {
    articles: paginatedArticles,
    totalItems: filtered.length,
    totalPages: Math.ceil(filtered.length / pageSize),
    currentPage: page,
    pageSize
  };
}
