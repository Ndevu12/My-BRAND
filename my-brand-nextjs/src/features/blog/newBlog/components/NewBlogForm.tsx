"use client";

import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { BlogFormData, NewBlogFormProps } from "../types";
import { BasicInfoSection } from "./BasicInfoSection";
import { ContentSection } from "./ContentSection";
import { CategorySection } from "./CategorySection";
import { SEOSection } from "./SEOSection";
import { PublishingSection } from "./PublishingSection";
import Button from "@/components/atoms/Button/Button";

const NewBlogForm = forwardRef<HTMLFormElement, NewBlogFormProps>(
  ({ onSubmit, onPreview, isSubmitting = false, initialData }, ref) => {
    const [formData, setFormData] = useState<BlogFormData>({
      title: "",
      subtitle: "",
      description: "",
      content: "",
      categoryId: "",
      tags: ["javascript", "tutorial", "technology"], // Default tags
      readingTime: "5",
      author: "Ndevu",
      imageCaption: "",
      metaTitle: "",
      metaDescription: "",
      status: "published",
      publishDate: new Date().toISOString().slice(0, 16),
      ...initialData,
    });

    const [errors, setErrors] = useState<
      Partial<Record<keyof BlogFormData, string>>
    >({});

    useImperativeHandle(
      ref,
      () =>
        ({
          requestPreview: () => {
            handlePreview();
          },
          saveDraft: () => {
            handleSaveDraft();
          },
        } as any)
    );

    const updateFormData = (field: keyof BlogFormData, value: any) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when field is updated
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: undefined,
        }));
      }
    };

    const validateForm = (): boolean => {
      const newErrors: Partial<Record<keyof BlogFormData, string>> = {};

      if (!formData.title.trim()) {
        newErrors.title = "Title is required";
      }

      if (!formData.description.trim()) {
        newErrors.description = "Description is required";
      }

      if (!formData.content.trim()) {
        newErrors.content = "Content is required";
      }

      if (!formData.categoryId) {
        newErrors.categoryId = "Category is required";
      }

      if (formData.tags.length === 0) {
        newErrors.tags = "At least one tag is required";
      }

      if (!formData.featuredImage && !formData.imageUrl) {
        newErrors.featuredImage = "Featured image is required";
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handlePreview = () => {
      // Auto-set meta fields if not provided
      const previewData = {
        ...formData,
        metaTitle: formData.metaTitle || formData.title,
        metaDescription: formData.metaDescription || formData.description,
      };
      onPreview(previewData);
    };

    const handleSaveDraft = () => {
      const draftData = {
        ...formData,
        status: "draft" as const,
      };
      setFormData(draftData);
      onSubmit(draftData);
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }

      // Auto-set meta fields if not provided
      const submitData = {
        ...formData,
        metaTitle: formData.metaTitle || formData.title,
        metaDescription: formData.metaDescription || formData.description,
      };

      await onSubmit(submitData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <BasicInfoSection
          data={formData}
          errors={errors}
          onChange={updateFormData}
        />

        {/* Content */}
        <ContentSection
          data={formData}
          errors={errors}
          onChange={updateFormData}
        />

        {/* Categorization */}
        <CategorySection
          data={formData}
          errors={errors}
          onChange={updateFormData}
        />

        {/* SEO Settings */}
        <SEOSection data={formData} errors={errors} onChange={updateFormData} />

        {/* Publishing Options */}
        <PublishingSection
          data={formData}
          errors={errors}
          onChange={updateFormData}
        />

        {/* Form Actions */}
        <div className="flex flex-col md:flex-row justify-end gap-4 pb-10">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              if (
                confirm(
                  "Are you sure you want to discard this blog? All changes will be lost."
                )
              ) {
                // TODO: Redirect to blogs list
                console.log("Discarding changes...");
              }
            }}
            icon={<i className="fas fa-trash" />}
            iconPosition="left"
          >
            Discard
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            loadingText="Saving..."
            icon={<i className="fas fa-paper-plane" />}
            iconPosition="left"
            className="bg-yellow-500 hover:bg-yellow-400 text-black font-medium"
          >
            Save & Publish
          </Button>
        </div>
      </form>
    );
  }
);

NewBlogForm.displayName = "NewBlogForm";

export { NewBlogForm };
