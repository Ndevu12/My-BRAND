import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogDetailPage } from "@/features/blog";
import { getPostBySlug, dummyBlogs } from "@/lib/blogData";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | NdevuSpace",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | NdevuSpace Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      siteName: "NdevuSpace",
      images: [
        {
          url: post.imageUrl || "/images/blog-og.png",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.createdAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.imageUrl || "/images/blog-og.png"],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogDetailPage post={post} />;
}

export async function generateStaticParams() {
  return dummyBlogs.map((post) => ({
    slug: post.slug,
  }));
}
