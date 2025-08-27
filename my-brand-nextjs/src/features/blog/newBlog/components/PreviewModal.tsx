"use client";

import React from "react";
import { PreviewModalProps } from "../types";
import Button from "@/components/atoms/Button/Button";
import Typography from "@/components/atoms/Typography/Typography";

export const PreviewModal: React.FC<PreviewModalProps> = ({
  data,
  onClose,
}) => {
  const imageUrl = data.featuredImage
    ? URL.createObjectURL(data.featuredImage)
    : data.imageUrl || "";

  // Create preview HTML content
  const createPreviewContent = () => {
    return (
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <Typography
            variant="h1"
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {data.title || "Blog Title"}
          </Typography>

          {data.subtitle && (
            <Typography variant="h2" className="text-xl text-gray-300 mb-4">
              {data.subtitle}
            </Typography>
          )}

          <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-gray-700/50">
            <div className="flex items-center">
              <img
                src="/images/mypic.png"
                alt="Author"
                className="w-12 h-12 rounded-full border-2 border-yellow-500"
              />
              <div className="ml-3">
                <p className="font-medium">{data.author || "Ndevu"}</p>
                <p className="text-sm text-gray-400">Full Stack Developer</p>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {data.readingTime || "5"} min read
              </span>
            </div>
          </div>
        </header>

        {imageUrl && (
          <figure className="mb-10 relative overflow-hidden rounded-xl">
            <img
              src={imageUrl}
              alt={data.title}
              className="w-full h-auto rounded-xl"
            />
            {data.imageCaption && (
              <figcaption className="text-sm text-gray-400 mt-2 italic text-center">
                {data.imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        {data.description && (
          <Typography
            variant="p"
            className="text-xl text-gray-300 mb-6 leading-relaxed"
          >
            {data.description}
          </Typography>
        )}

        <div
          className="article-content prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: data.content || "<p>No content yet...</p>",
          }}
        />

        {data.tags.length > 0 && (
          <div className="mt-10 pt-6 border-t border-gray-700/50">
            <Typography variant="h3" className="text-lg font-bold mb-3">
              Tags:
            </Typography>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-secondary text-gray-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-primary w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-secondary z-10 px-6 py-3 flex items-center justify-between border-b border-gray-700">
          <Typography variant="h3" className="font-bold">
            Article Preview
          </Typography>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-2 transition-colors"
            title="Close Preview"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{createPreviewContent()}</div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-secondary z-10 px-6 py-3 flex justify-end border-t border-gray-700">
          <Button variant="secondary" onClick={onClose}>
            Close Preview
          </Button>
        </div>
      </div>
    </div>
  );
};
