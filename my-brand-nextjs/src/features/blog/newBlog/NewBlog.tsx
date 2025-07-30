import React, { useState, useRef } from "react";
import Image from "next/image";
import { showNotification } from "@/utils/notificationUtils";
import { createBlog } from "@/scripts/actions/blogs/blogActions";
import CategoryManager from "@/components/categoryManager";
import { getCategoryBadgeHTML } from "@/utils/categoryUtils";

import TinyMCEEditor from "./components/TinyMCEEditor";

const initialTags = ["javascript", "tutorial", "technology"];

export default function NewBlog() {
  // Form state
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    description: "",
    readingTime: "5",
    author: "Ndevu",
    featuredImage: null,
    imageCaption: "",
    imageUrl: "",
    content: "",
    categoryId: "",
    tags: initialTags,
    metaTitle: "",
    metaDescription: "",
    status: "published",
    publishDate: new Date().toISOString().slice(0, 16),
  });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Tag input
  const [tagInput, setTagInput] = useState("");

  // CategoryManager (simulate API)
  React.useEffect(() => {
    const manager = new CategoryManager();
    setCategories(manager._fallbackCategories);
  }, []);

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((f) => ({ ...f, featuredImage: files[0] }));
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result as string);
      reader.readAsDataURL(files[0]);
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleTagInput = (e) => {
    setTagInput(e.target.value);
  };

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const tag = tagInput.trim();
      if (tag && !form.tags.includes(tag)) {
        setForm((f) => ({ ...f, tags: [...f.tags, tag] }));
        setTagInput("");
      }
    }
  };

  const removeTag = (tag) => {
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }));
  };

  const handleCategoryChange = (e) => {
    setForm((f) => ({ ...f, categoryId: e.target.value }));
  };

  const handleEditorChange = (value) => {
    setForm((f) => ({ ...f, content: value }));
  };

  const handlePreview = () => {
    setPreviewOpen(true);
  };

  const closePreview = () => {
    setPreviewOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const blogData = { ...form };
      if (form.featuredImage) blogData.image = form.featuredImage;
      const createdBlog = await createBlog(blogData);
      if (createdBlog) {
        showNotification("Blog published successfully!", "success");
        // Redirect or reset form
      }
    } catch (error) {
      showNotification(`Failed to create blog: ${error.message}`, "error");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 flex-grow overflow-y-auto bg-gradient-to-b from-primary to-black/90">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Create New Article</h2>
          <p className="text-gray-400">
            Add a new blog article to your portfolio
          </p>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handlePreview}
            className="bg-secondary px-4 py-2 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-all text-sm flex items-center"
          >
            <i className="fas fa-eye mr-2"></i> Preview
          </button>
          <button
            type="button"
            className="bg-secondary px-4 py-2 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-all text-sm flex items-center"
          >
            <i className="fas fa-save mr-2"></i> Save Draft
          </button>
        </div>
      </div>
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="bg-secondary rounded-xl shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <span className="inline-block w-2 h-8 bg-yellow-500 rounded-sm mr-2"></span>
            Basic Information
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Article Title <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter a compelling title for your article"
                  className="w-full bg-primary/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  Try to keep it under 70 characters for optimal SEO
                </p>
              </div>
              <div>
                <label
                  htmlFor="subtitle"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Subtitle
                </label>
                <input
                  type="text"
                  id="subtitle"
                  name="subtitle"
                  value={form.subtitle}
                  onChange={handleChange}
                  placeholder="A brief subtitle or tagline (optional)"
                  className="w-full bg-primary/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Short Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  placeholder="A brief summary of your article that will appear in cards and search results"
                  className="w-full bg-primary/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">
                  150-160 characters recommended for best display in search
                  results
                </p>
              </div>
              <div className="flex gap-6">
                <div className="w-1/2">
                  <label
                    htmlFor="reading-time"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Reading Time (minutes)
                  </label>
                  <input
                    type="number"
                    id="reading-time"
                    name="readingTime"
                    value={form.readingTime}
                    onChange={handleChange}
                    min={1}
                    placeholder="5"
                    className="w-full bg-primary/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
                <div className="w-1/2">
                  <label
                    htmlFor="author"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={form.author}
                    onChange={handleChange}
                    className="w-full bg-primary/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Featured Image <span className="text-red-400">*</span>
              </label>
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 h-64 flex flex-col items-center justify-center relative bg-primary/30">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-lg absolute inset-0"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-3"></i>
                    <p className="text-gray-300 mb-2">
                      Drag and drop an image here, or
                    </p>
                    <label
                      htmlFor="featured-image"
                      className="cursor-pointer bg-yellow-500 text-black font-medium py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
                    >
                      Browse Files
                      <input
                        id="featured-image"
                        name="featuredImage"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleChange}
                      />
                    </label>
                    <p className="text-xs text-gray-400 mt-2">
                      Recommended size: 1200×800 pixels or 3:2 ratio
                    </p>
                  </div>
                )}
                {imagePreview && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-black/60 text-white p-2 rounded-full hover:bg-red-500/80 transition-colors"
                    title="Remove image"
                    onClick={() => {
                      setImagePreview("");
                      setForm((f) => ({ ...f, featuredImage: null }));
                    }}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                )}
              </div>
              <div>
                <label
                  htmlFor="image-caption"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Image Caption
                </label>
                <input
                  type="text"
                  id="image-caption"
                  name="imageCaption"
                  value={form.imageCaption}
                  onChange={handleChange}
                  placeholder="Describe the featured image"
                  className="w-full bg-primary/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div>
                <label
                  htmlFor="image-url"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Or Enter Image URL
                </label>
                <input
                  type="url"
                  id="image-url"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full bg-primary/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Article Content */}
        <div className="bg-secondary rounded-xl shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <span className="inline-block w-2 h-8 bg-yellow-500 rounded-sm mr-2"></span>
            Article Content
          </h3>
          <div className="mb-6">
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Main Content <span className="text-red-400">*</span>
            </label>
            <TinyMCEEditor value={form.content} onChange={handleEditorChange} />
            <p className="text-xs text-gray-400 mt-1">
              Use the toolbar to format text, add images, and embed media
            </p>
          </div>
        </div>
        {/* Categorization */}
        <div className="bg-secondary rounded-xl shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <span className="inline-block w-2 h-8 bg-yellow-500 rounded-sm mr-2"></span>
            Categorization
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {categories.length === 0 ? (
                  <div className="text-center text-gray-400 col-span-2 py-4">
                    <i className="fas fa-spinner fa-spin mr-2"></i> Loading
                    categories...
                  </div>
                ) : (
                  categories.map((category) => (
                    <label
                      key={category.id}
                      className={`flex items-center space-x-2 bg-primary/50 p-3 rounded-lg border border-gray-700 cursor-pointer hover:border-yellow-400/50 transition-colors ${
                        form.categoryId === category.id
                          ? "border-yellow-400"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={form.categoryId === category.id}
                        onChange={handleCategoryChange}
                        className="text-yellow-500 focus:ring-yellow-500"
                      />
                      <span className="flex items-center">
                        <i
                          className={`fas ${category.icon} mr-2 ${category.textClass}`}
                        ></i>
                        {category.name}
                      </span>
                    </label>
                  ))
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="tags-input"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Tags <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="tags-input"
                  value={tagInput}
                  onChange={handleTagInput}
                  onKeyDown={handleTagKeyDown}
                  placeholder="Type a tag and press Enter or comma to add"
                  className="w-full bg-primary/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {form.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/70 text-gray-300 px-2 py-1 text-sm rounded-full flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-1 text-gray-400 hover:text-red-400"
                      title={`Remove ${tag}`}
                      onClick={() => removeTag(tag)}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* SEO Settings */}
        <div className="bg-secondary rounded-xl shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <span className="inline-block w-2 h-8 bg-yellow-500 rounded-sm mr-2"></span>
            SEO Settings
          </h3>
          <div className="space-y-6">
            <div>
              <label
                htmlFor="meta-title"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Meta Title
              </label>
              <input
                type="text"
                id="meta-title"
                name="metaTitle"
                value={form.metaTitle}
                onChange={handleChange}
                placeholder="SEO-optimized title (defaults to article title if left blank)"
                className="w-full bg-primary/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                50-60 characters recommended
              </p>
            </div>
            <div>
              <label
                htmlFor="meta-description"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Meta Description
              </label>
              <textarea
                id="meta-description"
                name="metaDescription"
                value={form.metaDescription}
                onChange={handleChange}
                rows={2}
                placeholder="SEO-optimized description (defaults to article description if left blank)"
                className="w-full bg-primary/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                150-160 characters recommended
              </p>
            </div>
          </div>
        </div>
        {/* Publishing Options */}
        <div className="bg-secondary rounded-xl shadow-lg p-6 border border-gray-700">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <span className="inline-block w-2 h-8 bg-yellow-500 rounded-sm mr-2"></span>
            Publishing Options
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Status
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="published"
                    checked={form.status === "published"}
                    onChange={handleChange}
                    className="text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="ml-2">Published</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="status"
                    value="draft"
                    checked={form.status === "draft"}
                    onChange={handleChange}
                    className="text-yellow-500 focus:ring-yellow-500"
                  />
                  <span className="ml-2">Draft</span>
                </label>
              </div>
            </div>
            <div>
              <label
                htmlFor="publish-date"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Publication Date
              </label>
              <input
                type="datetime-local"
                id="publish-date"
                name="publishDate"
                value={form.publishDate}
                onChange={handleChange}
                className="w-full bg-primary/50 text-white border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Leave blank to publish immediately
              </p>
            </div>
          </div>
        </div>
        {/* Form Actions */}
        <div className="flex flex-col md:flex-row justify-end gap-4 pb-10">
          <button
            type="button"
            className="bg-secondary px-6 py-3 rounded-lg border border-gray-700 hover:border-red-500/50 transition-all text-sm flex items-center justify-center"
          >
            <i className="fas fa-trash mr-2"></i> Discard
          </button>
          <button
            type="submit"
            className="bg-yellow-500 px-6 py-3 rounded-lg text-black font-medium hover:bg-yellow-400 transition-colors text-sm flex items-center justify-center"
            disabled={loading}
          >
            <i className="fas fa-paper-plane mr-2"></i>{" "}
            {loading ? "Saving..." : "Save & Publish"}
          </button>
        </div>
      </form>
      {/* Preview Modal */}
      {previewOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-primary w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl">
            <div className="sticky top-0 bg-secondary z-10 px-6 py-3 flex items-center justify-between border-b border-gray-700">
              <h3 className="font-bold">Article Preview</h3>
              <button
                className="text-gray-400 hover:text-white p-2"
                title="Close Preview"
                onClick={closePreview}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6">
              <div className="prose prose-invert max-w-none">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {form.title || "Blog Title"}
                </h1>
                {form.subtitle && (
                  <h2 className="text-xl text-gray-300 mb-4">
                    {form.subtitle}
                  </h2>
                )}
                <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-gray-700/50">
                  <div className="flex items-center">
                    <Image
                      src="/images/mypic.png"
                      alt="Author"
                      width={48}
                      height={48}
                      className="rounded-full border-2 border-yellow-500"
                    />
                    <div className="ml-3">
                      <p className="font-medium">{form.author || "Ndevu"}</p>
                      <p className="text-sm text-gray-400">
                        Full Stack Developer
                      </p>
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
                          strokeWidth={2}
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
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {form.readingTime || "5"} min read
                    </span>
                  </div>
                </div>
                {imagePreview && (
                  <figure className="mb-10 relative overflow-hidden rounded-xl">
                    <img
                      src={imagePreview}
                      alt={form.title}
                      className="w-full h-auto rounded-xl"
                    />
                    {form.imageCaption && (
                      <figcaption className="text-sm text-gray-400 mt-2 italic text-center">
                        {form.imageCaption}
                      </figcaption>
                    )}
                  </figure>
                )}
                {form.categoryId && (
                  <div
                    className="mb-4"
                    dangerouslySetInnerHTML={{
                      __html: getCategoryBadgeHTML(form.categoryId),
                    }}
                  />
                )}
                {form.description && (
                  <p className="lead text-xl text-gray-300 mb-6">
                    {form.description}
                  </p>
                )}
                <div
                  className="article-content prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: form.content || "<p>No content yet...</p>",
                  }}
                />
                {form.tags.length > 0 && (
                  <div className="mt-10 pt-6 border-t border-gray-700/50">
                    <h3 className="text-lg font-bold mb-3">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {form.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-secondary text-gray-300 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="sticky bottom-0 bg-secondary z-10 px-6 py-3 flex justify-end border-t border-gray-700">
              <button
                className="bg-secondary px-4 py-2 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-all text-sm"
                onClick={closePreview}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
