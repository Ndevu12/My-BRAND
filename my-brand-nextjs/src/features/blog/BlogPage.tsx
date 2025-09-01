"use client";

import { useState, useMemo } from "react";
import { useEffect } from "react";
import { BlogCard } from "./components/BlogCard";
import { FeaturedBlogCard } from "./components/FeaturedBlogCard";
import { BlogSidebar } from "./components/BlogSidebar";
import { CategoryTabs } from "./components/CategoryTabs";
import { BlogSearch } from "./components/BlogSearch";
import {
  blogCategories,
  getPopularPosts,
  getFeaturedPost,
  getPostsByCategory,
  getAllTags,
} from "@/lib/blogData";
import ClientLayout from "@/components/layout";
import { BlogPost } from "@/types";

export function BlogPage() {
  // Error boundary state
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "popular">(
    "newest"
  );
  const [displayedPosts, setDisplayedPosts] = useState(6);

  const featuredPost = getFeaturedPost();
  const popularPosts = getPopularPosts(3);
  const allTags = getAllTags();

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let posts = getPostsByCategory(activeCategory);

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      if (posts.length > 0) {
        posts = posts.filter(
          (post: BlogPost) =>
            post.title.toLowerCase().includes(query) ||
            post.description.toLowerCase().includes(query) ||
            post.tags.some((tag: string) =>
              tag.toLowerCase().includes(query)
            ) ||
            post.category?.name?.toLowerCase().includes(query)
        );
      } else {
        posts = [];
      }
    }

    // Apply sorting
    switch (sortBy) {
      case "oldest":
        posts.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "newest":
      default:
        posts.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    return posts;
  }, [activeCategory, searchQuery, sortBy]);

  const postsToShow = filteredPosts.slice(0, displayedPosts);
  const hasMorePosts = displayedPosts < filteredPosts.length;

  useEffect(() => {
    if (filteredPosts.length === 0) {
      setError("No articles found for this category.");
    } else {
      setError(null);
    }
  }, [filteredPosts]);

  const handleLoadMore = () => {
    setDisplayedPosts((prev) => prev + 6);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setDisplayedPosts(6); // Reset displayed posts when searching
  };

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setDisplayedPosts(6); // Reset displayed posts when changing category
    setError(null); // Reset error on category change
  };

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
      <CategoryTabs
        categories={blogCategories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

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
                  {postsToShow.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {/* Load More Button */}
                {hasMorePosts && (
                  <div className="my-12 text-center">
                    <button
                      onClick={handleLoadMore}
                      className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition-colors inline-flex items-center"
                    >
                      <i className="fas fa-plus mr-2"></i>
                      Load More
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
