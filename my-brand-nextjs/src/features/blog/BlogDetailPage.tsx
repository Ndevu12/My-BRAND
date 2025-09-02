"use client";

import { BlogPost } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { BlogSidebar } from "./components/BlogSidebar";
import { ShareArticle } from "./components/ShareArticle";
import { TableOfContents } from "./components/TableOfContents";
import { CommentForm, CommentList, Comment } from "@/features/comments";
import { getRecentBlogs, getBlogsByCategory } from "@/services/blogService";
import { getCommentsForBlog } from "@/services/comment/commentService";
import { getAuthorName, getAuthorImage } from "utils/blogUtils";
import ClientLayout from "@/components/layout";

interface BlogDetailPageProps {
  post: BlogPost;
}

export function BlogDetailPage({ post }: BlogDetailPageProps) {
  const [popularPosts, setPopularPosts] = useState<BlogPost[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch popular/recent posts for sidebar
        const recentPosts = await getRecentBlogs(3);
        setPopularPosts(recentPosts);

        // Extract tags from all posts (simplified for now)
        const tags = post.tags || [];
        setAllTags(tags);

        // Fetch related posts by category if available
        if (post.category?._id) {
          const categoryPosts = await getBlogsByCategory(
            post.category._id,
            1,
            6
          );
          const filtered = categoryPosts.blogs
            .filter((p: BlogPost) => p.slug !== post.slug)
            .slice(0, 3);
          setRelatedPosts(filtered);
        }

        // Fetch comments for this blog
        setCommentsLoading(true);
        const blogComments = await getCommentsForBlog(post._id);
        setComments(blogComments);
      } catch (error) {
        console.error("Error fetching blog detail data:", error);
        setPopularPosts([]);
        setAllTags([]);
        setRelatedPosts([]);
        setComments([]);
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchData();
  }, [post._id, post.slug, post.category, post.tags]);

  // Handle new comment added
  const handleCommentAdded = (newComment: Comment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  if (!post) {
    return (
      <ClientLayout>
        <section className="flex flex-col min-h-screen">
          <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Blog Post Not Found
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              The blog post you are looking for does not exist or has been
              removed.
            </p>
          </div>
        </section>
      </ClientLayout>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Generate the current URL for sharing
  const currentUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `${process.env.NEXT_PUBLIC_SITE_URL || "https://my-brand.com"}/blog/${
          post.slug
        }`;

  return (
    <ClientLayout>
      {/* Article Header */}
      <section className="relative bg-white dark:bg-gray-800 pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link
                  href="/"
                  className="hover:text-yellow-500 dark:hover:text-yellow-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-yellow-500 dark:hover:text-yellow-400"
                >
                  Blog
                </Link>
              </li>
              <li>
                <span className="mx-2">/</span>
              </li>
              <li className="text-gray-700 dark:text-gray-300 truncate">
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Category Badge */}
          <div className="mb-6">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-600/20 text-gray-400`}
            >
              <i
                className={`fas fa-${post.category?.icon || "bookmark"} mr-2`}
              ></i>
              {post.category?.name || "Uncategorized"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600 dark:text-gray-400">
            <div className="flex items-center">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500 mr-3">
                <Image
                  src={getAuthorImage(post)}
                  alt={getAuthorName(post.author)}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {getAuthorName(post.author)}
                </p>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <i className="fas fa-calendar mr-2"></i>
              {formattedDate}
            </div>
            <div className="flex items-center text-sm">
              <i className="fas fa-clock mr-2"></i>
              {post.readTime}
            </div>
          </div>

          {/* Featured Image */}
          {post.imageUrl && (
            <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden mb-8">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Description */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {post.description}
            </p>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Article Content */}
          <div className="lg:w-3/4">
            <article className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
              {/* Article Body */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {post.content ? (
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                ) : (
                  <div className="space-y-6"></div>
                )}
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-yellow-100 dark:hover:bg-yellow-500/20 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Share Article */}
              <ShareArticle
                title={post.title}
                url={currentUrl}
                className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
                inline={true}
              />
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <section className="mt-12">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Related Articles
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost._id || relatedPost.id}
                      href={`/blog/${relatedPost.slug}`}
                      className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="relative w-full h-40">
                        <Image
                          src={
                            relatedPost.imageUrl ||
                            "/images/placeholder-blog.jpg"
                          }
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 overflow-hidden max-h-[3rem]">
                          {relatedPost.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {relatedPost.readTime}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Comments Section */}
            <section className="mt-12 space-y-8">
              {/* Display Comments */}
              <CommentList comments={comments} isLoading={commentsLoading} />

              {/* Comment Form */}
              <CommentForm
                blogId={post._id}
                onCommentAdded={handleCommentAdded}
              />
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/4 space-y-8">
            {/* Table of Contents */}
            <TableOfContents />

            {/* Share Article for Mobile */}
            <div className="lg:hidden">
              <ShareArticle title={post.title} url={currentUrl} />
            </div>

            {/* Blog Sidebar */}
            <BlogSidebar popularPosts={popularPosts} tags={allTags} />
          </aside>
        </div>
      </main>
    </ClientLayout>
  );
}
