"use client";

import React from "react";
import { BlogFormData } from "../types";
import Typography from "@/components/atoms/Typography/Typography";
import { RichTextEditor } from "./RichTextEditor";

interface ContentSectionProps {
  data: BlogFormData;
  errors: Partial<Record<keyof BlogFormData, string>>;
  onChange: (field: keyof BlogFormData, value: any) => void;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  data,
  errors,
  onChange,
}) => {
  return (
    <div className="bg-secondary rounded-xl shadow-lg p-6 border border-gray-700">
      <Typography
        variant="h3"
        className="text-lg font-bold mb-4 flex items-center"
      >
        <span className="inline-block w-2 h-8 bg-yellow-500 rounded-sm mr-2"></span>
        Article Content
      </Typography>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Main Content <span className="text-red-400">*</span>
        </label>

        <RichTextEditor
          content={data.content}
          onContentChange={(content) => onChange("content", content)}
          placeholder="Start writing your content here..."
        />

        {errors.content && (
          <p className="text-sm text-red-500 mt-2">{errors.content}</p>
        )}

        <p className="text-xs text-gray-400 mt-1">
          Use the toolbar to format text, add images, and embed media
        </p>
      </div>
    </div>
  );
};
