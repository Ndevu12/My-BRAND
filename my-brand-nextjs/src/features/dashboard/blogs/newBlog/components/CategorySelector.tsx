"use client";

import React, { useState, useEffect } from "react";
import { CategorySelectorProps } from "../types";
import { BlogCategory } from "@/types/blog";

// Default categories based on the original implementation
const DEFAULT_CATEGORIES: BlogCategory[] = [
  {
    id: "programming",
    name: "Programming",
    slug: "programming",
    icon: "fa-code",
    bgClass: "bg-blue-600/30",
    textClass: "text-blue-400",
    description: "Articles about programming and software development",
  },
  {
    id: "webdev",
    name: "Web Development",
    slug: "web-development",
    icon: "fa-globe",
    bgClass: "bg-green-600/30",
    textClass: "text-green-400",
    description: "Articles about web development",
  },
  {
    id: "design",
    name: "UX/UI Design",
    slug: "design",
    icon: "fa-palette",
    bgClass: "bg-pink-600/30",
    textClass: "text-pink-400",
    description: "Articles about design and user experience",
  },
  {
    id: "technology",
    name: "Technology",
    slug: "technology",
    icon: "fa-microchip",
    bgClass: "bg-purple-600/30",
    textClass: "text-purple-400",
    description: "Articles about technology trends",
  },
];

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategoryId,
  onCategoryChange,
  categories = DEFAULT_CATEGORIES,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    onCategoryChange(categoryId);
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-400 py-4">
        <i className="fas fa-spinner fa-spin mr-2"></i> Loading categories...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {categories.map((category) => {
        const isSelected = category.id === selectedCategoryId;

        return (
          <label
            key={category.id}
            className={`flex items-center space-x-2 bg-primary/50 p-3 rounded-lg border cursor-pointer hover:border-yellow-400/50 transition-colors ${
              isSelected ? "border-yellow-400" : "border-gray-700"
            }`}
          >
            <input
              type="radio"
              name="category"
              value={category.id}
              checked={isSelected}
              onChange={() => handleCategorySelect(category.id)}
              className="text-yellow-500 focus:ring-yellow-500"
            />
            <span className="flex items-center">
              <i
                className={`fas ${category.icon} mr-2 ${category.textClass}`}
              ></i>
              <span className="text-white">{category.name}</span>
            </span>
          </label>
        );
      })}
    </div>
  );
};
