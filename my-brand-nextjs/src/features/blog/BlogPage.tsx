"use client";

import { useState, useMemo, useEffect } from "react";
import { BlogCard } from "./components/BlogCard";
import { FeaturedBlogCard } from "./components/FeaturedBlogCard";
import { BlogSidebar } from "./components/BlogSidebar";
import { CategoryTabs } from "./components/CategoryTabs";
import { BlogSearch } from "./components/BlogSearch";
import {
  getAllBlogCategories,
  getBlogsPaginated,
} from "@/services/blogService";
import ClientLayout from "@/components/layout";
import { BlogPost, BlogCategory } from "@/types/blog";

export function BlogPage() {
  // State management
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">(
    "newest"
  );
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const POSTS_PER_PAGE = 10;

  // Fetch categories from server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const categories = await getAllBlogCategories();
        setBlogCategories(categories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setBlogCategories([]);
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch initial blogs from server
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setBlogsLoading(true);
        const response = await getBlogsPaginated(1, POSTS_PER_PAGE);

        setBlogs(response.blogs);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
        setHasMorePosts(response.hasMore);

        // Set featured post as first blog if available
        if (response.blogs.length > 0) {
          setFeaturedPost(response.blogs[0]);
        }

        // Set popular posts as first 3 blogs
        setPopularPosts(response.blogs.slice(0, 3));

        // Extract all unique tags from blogs
        const tags = [
          ...new Set(response.blogs.flatMap((blog: any) => blog.tags || [])),
        ];
        setAllTags(tags);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setError("Failed to load blogs");
        setBlogs([]);
        setFeaturedPost(null);
        setPopularPosts([]);
        setAllTags([]);
      } finally {
        setBlogsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter and sort posts from server data
  const filteredPosts = useMemo(() => {
    let posts = [...blogs];

    // Apply category filter
    if (activeCategory !== "all") {
      posts = posts.filter((post: BlogPost) => {
        const categoryName =
          typeof post.category === "string"
            ? post.category
            : post.category?.name;
        return categoryName === activeCategory;
      });
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter((post: BlogPost) => {
        const categoryName =
          typeof post.category === "string"
            ? post.category
            : post.category?.name;
        return (
          post.title.toLowerCase().includes(query) ||
          post.description?.toLowerCase().includes(query) ||
          post.content?.toLowerCase().includes(query) ||
          post.tags?.some((tag: string) => tag.toLowerCase().includes(query)) ||
          categoryName?.toLowerCase().includes(query)
        );
      });
    }

    // Apply sorting
    switch (sortBy) {
      case "oldest":
        posts.sort(
          (a: BlogPost, b: BlogPost) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "popular":
        posts.sort(
          (a: BlogPost, b: BlogPost) => (b.likes || 0) - (a.likes || 0)
        );
        break;
      case "newest":
      default:
        posts.sort(
          (a: BlogPost, b: BlogPost) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return posts;
  }, [blogs, activeCategory, searchQuery, sortBy]);

  const postsToShow = filteredPosts;

  // Load more posts
  const handleLoadMore = async () => {
    if (loadingMore || !hasMorePosts) return;

    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      const response = await getBlogsPaginated(nextPage, POSTS_PER_PAGE);

      setBlogs((prev) => [...prev, ...response.blogs]);
      setCurrentPage(response.currentPage);
      setHasMorePosts(response.hasMore);

      // Update tags with new blogs
      const allBlogs = [...blogs, ...response.blogs];
      const tags = [
        ...new Set(allBlogs.flatMap((blog: any) => blog.tags || [])),
      ];
      setAllTags(tags);
    } catch (error) {
      console.error("Failed to load more blogs:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setError(null);
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setError(null);
  };

  // Update error state when no posts found
  useEffect(() => {
    if (!blogsLoading && filteredPosts.length === 0 && blogs.length > 0) {
      setError("No articles found for this category or search.");
    } else if (!blogsLoading && blogs.length === 0) {
      setError("No articles available.");
    } else {
      setError(null);
    }
  }, [filteredPosts, blogs, blogsLoading]);

  // Show loading state
  if (blogsLoading || categoriesLoading) {
    return (
      <ClientLayout>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-12">
            <div className="flex justify-center items-center h-64">
              <div className="text-xl text-gray-600 dark:text-gray-400">
                Loading...
              </div>
            </div>
          </div>
        </div>
      </ClientLayout>
    );
  }

  return (
    <ClientLayout>
      {/* Hero Banner */}
      <section className="relative bg-white dark:bg-primary pt-32 pb-20">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-900 dark:from-white to-gray-600 dark:to-gray-400 bg-clip-text text-transparent">
                Tech{" "}
              </span>
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                Insights
              </span>
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
              Exploring the world of web development, software engineering, and
              digital innovation. Dive into articles that share knowledge,
              experiences, and practical tips.
            </p>
          </div>

          {/* Search Bar */}
          <BlogSearch onSearch={handleSearch} />
        </div>
      </section>

      {/* Category Tabs */}
      {categoriesLoading ? (
        <div className="bg-gray-100/50 dark:bg-secondary/50 py-4 sticky top-16 z-10 backdrop-blur-sm border-y border-gray-200/50 dark:border-gray-800/50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-center py-2">
              <div className="animate-pulse flex space-x-2">
                <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-8 w-20"></div>
                <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-8 w-24"></div>
                <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-8 w-16"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CategoryTabs
          categories={blogCategories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      )}

      {/* Blog Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Featured Article */}
            {featuredPost && activeCategory === "all" && !searchQuery && (
              <div className="mb-12">
                <h2 className="text-xl text-gray-600 dark:text-gray-300 mb-4 flex items-center">
                  <span className="inline-block w-6 h-6 bg-yellow-500 rounded-full mr-2 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-black"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </span>
                  FEATURED POST
                </h2>
                <FeaturedBlogCard post={featuredPost} />
              </div>
            )}

            {/* Blog Filter and Sort Options */}
            <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <h2 className="text-xl font-bold flex items-center text-gray-900 dark:text-white">
                <span className="inline-block w-2 h-8 bg-yellow-500 rounded-sm mr-2"></span>
                {searchQuery
                  ? `Search Results (${filteredPosts.length})`
                  : "Latest Articles"}
              </h2>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="sort-options"
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  Sort by:
                </label>
                <select
                  id="sort-options"
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value as "newest" | "oldest" | "popular")
                  }
                  className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm focus:outline-none focus:border-yellow-500 dark:focus:border-yellow-400 transition-all text-gray-900 dark:text-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Blog Grid with Error Boundary */}
            {error ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">⚠️</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {error}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Please try a different category or clear your search.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                    setError(null);
                  }}
                  className="mt-4 text-yellow-500 dark:text-yellow-400 hover:underline"
                >
                  Clear and view all articles
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {postsToShow.map((post: BlogPost) => (
                    <BlogCard key={post._id} post={post} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMorePosts && (
                  <div className="my-12 text-center">
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 disabled:bg-yellow-300 text-black font-medium rounded-lg transition-colors inline-flex items-center"
                    >
                      {loadingMore ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Loading...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-plus mr-2"></i>
                          Load More
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <BlogSidebar popularPosts={popularPosts} tags={allTags} />
          </aside>
        </div>
      </main>
    </ClientLayout>
  );
}
