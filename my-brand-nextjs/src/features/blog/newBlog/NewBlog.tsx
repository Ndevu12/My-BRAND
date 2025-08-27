"use client";

import React, { useState, useRef, useEffect } from "react";
import Typography from "@/components/atoms/Typography";
import Button from "@/components/atoms/Button";
import { NewBlogForm } from "./components/NewBlogForm";
import { PreviewModal } from "./components/PreviewModal";
import { BlogFormData } from "./types";

export interface NewBlogProps {
  className?: string;
}

const NewBlog: React.FC<NewBlogProps> = ({ className }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState<BlogFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handlePreview = (data: BlogFormData) => {
    setFormData(data);
    setShowPreview(true);
  };

  const handleSaveDraft = () => {
    if (formRef.current) {
      const event = new CustomEvent("saveDraft");
      formRef.current.dispatchEvent(event);
    }
  };

  const handleSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement blog creation API call
      console.log("Creating blog:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success notification and redirect
      // TODO: Implement notification system
      console.log("Blog created successfully!");

      // TODO: Redirect to blogs list
      // window.location.href = '/dashboard/blogs';
    } catch (error) {
      console.error("Failed to create blog:", error);
      // TODO: Show error notification
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      {/* Page header with actions */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Typography variant="h2" className="text-2xl font-bold">
            Create New Article
          </Typography>
          <Typography variant="p" className="text-gray-400">
            Add a new blog article to your portfolio
          </Typography>
        </div>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              if (formRef.current) {
                const event = new CustomEvent("requestPreview");
                formRef.current.dispatchEvent(event);
              }
            }}
            icon={<i className="fas fa-eye" />}
            iconPosition="left"
          >
            Preview
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSaveDraft}
            icon={<i className="fas fa-save" />}
            iconPosition="left"
          >
            Save Draft
          </Button>
        </div>
      </div>

      {/* Main form */}
      <NewBlogForm
        ref={formRef}
        onSubmit={handleSubmit}
        onPreview={handlePreview}
        isSubmitting={isSubmitting}
      />

      {/* Preview modal */}
      {showPreview && formData && (
        <PreviewModal data={formData} onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
};

export default NewBlog;
