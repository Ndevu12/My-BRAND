import { BlogPost } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";
import { BlogSidebar } from "./components/BlogSidebar";
import { ShareArticle } from "./components/ShareArticle";
import { TableOfContents } from "./components/TableOfContents";
import { getPopularPosts, getAllTags, dummyBlogs } from "@/lib/blogData";
import ClientLayout from "@/components/layout";

interface BlogDetailPageProps {
  post: BlogPost;
}

export function BlogDetailPage({ post }: BlogDetailPageProps) {
  const popularPosts = getPopularPosts(3);
  const allTags = getAllTags();

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

  const relatedPosts = dummyBlogs
    .filter(
      (p) =>
        p.slug !== post.slug && p.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, 3);

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
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                post.category?.bgClass || "bg-gray-600/20"
              } ${post.category?.textClass || "text-gray-400"}`}
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
                  src={post.authorImage || "/images/mypic.png"}
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {post.author}
                </p>
                <p className="text-sm">Full Stack Developer</p>
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
                  <div className="space-y-6">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      This is a sample blog post content. In a real application,
                      this would contain the full article content with proper
                      formatting, code snippets, images, and other rich media
                      elements.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                      Introduction
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                      Key Points
                    </h2>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                      Core Concepts
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                      <li>Understanding the fundamentals of the topic</li>
                      <li>Best practices and common pitfalls to avoid</li>
                      <li>Practical examples and real-world applications</li>
                      <li>Future trends and considerations</li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
                      Implementation Strategies
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      When implementing these concepts, it's important to
                      consider the specific requirements of your project and
                      choose the approach that best fits your needs.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                      Best Practices
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Following industry best practices ensures that your
                      implementation is robust, maintainable, and scalable.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">
                      Conclusion
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      In conclusion, this topic provides valuable insights for
                      developers looking to improve their skills and stay
                      current with industry trends. Continue learning and
                      experimenting with these concepts.
                    </p>
                  </div>
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
                      key={relatedPost.id}
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
