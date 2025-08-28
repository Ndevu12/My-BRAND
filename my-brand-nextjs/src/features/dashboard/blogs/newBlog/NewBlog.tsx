"use client";

import React, { useState, useRef, useEffect } from "react";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import { NewBlogForm, PreviewModal } from "./components";
import { BlogFormData } from "./types";
import {
  getBlogById,
  updateBlog,
  createBlog,
  blogCategories,
} from "@/lib/blogData";
import { useRouter } from "next/navigation";

interface NewBlogProps {
  blogId?: string; // Optional blog ID for edit mode
}

export default function NewBlog({ blogId }: NewBlogProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<BlogFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [initialData, setInitialData] = useState<
    Partial<BlogFormData> | undefined
  >(undefined);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const isEditMode = Boolean(blogId);

  // Load blog data for editing
  useEffect(() => {
    if (isEditMode && blogId) {
      setIsLoading(true);
      try {
        const blog = getBlogById(blogId);
        if (blog) {
          // Helper function to safely format dates
          const formatDateForInput = (dateString?: string) => {
            if (!dateString) return undefined;
            try {
              const date = new Date(dateString);
              // Ensure we get a consistent format
              date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
              return date.toISOString().slice(0, 16);
            } catch {
              return undefined;
            }
          };

          // Convert BlogPost to BlogFormData format
          const blogFormData = {
            title: blog.title,
            subtitle: (blog as any).subtitle || "",
            description: blog.description,
            content: blog.content || "",
            categoryId:
              typeof blog.category === "object"
                ? blog.category.id
                : (blog.category as string),
            tags: blog.tags,
            readingTime: blog.readTime?.replace(" min read", "") || "5",
            author: blog.author,
            imageUrl: blog.imageUrl,
            imageCaption: (blog as any).imageCaption || "",
            metaTitle: (blog as any).metaTitle || blog.title,
            metaDescription: (blog as any).metaDescription || blog.description,
            status: ((blog as any).status as "published" | "draft") || "draft",
            publishDate:
              formatDateForInput((blog as any).publishDate) ||
              formatDateForInput(blog.createdAt),
          };

          setInitialData(blogFormData);
        } else {
          console.error("Blog not found");
          router.push("/dashboard/blogs");
        }
      } catch (error) {
        console.error("Error loading blog:", error);
        router.push("/dashboard/blogs");
      } finally {
        setIsLoading(false);
      }
    }
  }, [blogId, isEditMode, router]);

  const handlePreview = (data: BlogFormData) => {
    setPreviewData(data);
    setIsPreviewOpen(true);
  };

  const handleSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    try {
      if (isEditMode && blogId) {
        // Update existing blog
        const categoryObj =
          blogCategories.find((cat) => cat.id === data.categoryId) ||
          blogCategories.find((cat) => cat.id === "webdev");
        await updateBlog(blogId, {
          title: data.title,
          description: data.description,
          content: data.content,
          category: categoryObj!, // Use the category object
          tags: data.tags,
          readTime: data.readingTime
            ? `${data.readingTime} min read`
            : "5 min read",
          author: data.author,
          imageUrl: data.imageUrl,
          // Handle additional properties through type assertion
        } as any);

        router.push("/dashboard/blogs");
      } else {
        // Create new blog
        const categoryObj =
          blogCategories.find((cat) => cat.id === data.categoryId) ||
          blogCategories.find((cat) => cat.id === "webdev");
        await createBlog({
          title: data.title,
          description: data.description,
          content: data.content,
          category: categoryObj!,
          tags: data.tags,
          readTime: data.readingTime
            ? `${data.readingTime} min read`
            : "5 min read",
          author: data.author,
          imageUrl: data.imageUrl,
          slug: data.title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, ""),
        } as any);

        router.push("/dashboard/blogs");
      }
    } catch (error) {
      console.error("Error saving blog:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    if (formRef.current) {
      const data = formRef.current.getFormData();
      handleSubmit({ ...data, status: "draft" });
    }
  };

  const handlePublish = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
        <span className="ml-2 text-gray-400">Loading blog...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-black/90">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Typography variant="h1" className="text-2xl font-bold">
              {isEditMode ? "Edit Article" : "Create New Article"}
            </Typography>
            <Typography variant="p" className="text-gray-400">
              {isEditMode
                ? "Update your existing blog article"
                : "Share your thoughts and expertise with the world"}
            </Typography>
          </div>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => {
                if (formRef.current) {
                  const data = formRef.current.getFormData();
                  handlePreview(data);
                }
              }}
              className="flex items-center"
            >
              <i className="fas fa-eye mr-2"></i>
              Preview
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
              className="flex items-center"
            >
              <i className="fas fa-save mr-2"></i>
              Save Draft
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handlePublish}
              disabled={isSubmitting}
              className="flex items-center"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  {isEditMode ? "Updating..." : "Publishing..."}
                </>
              ) : (
                <>
                  <i className="fas fa-rocket mr-2"></i>
                  {isEditMode ? "Update Article" : "Publish Article"}
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Form */}
        <NewBlogForm
          ref={formRef}
          onSubmit={handleSubmit}
          onPreview={handlePreview}
          isSubmitting={isSubmitting}
          initialData={initialData}
        />

        {/* Preview Modal */}
        {isPreviewOpen && previewData && (
          <PreviewModal
            data={previewData}
            onClose={() => setIsPreviewOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
