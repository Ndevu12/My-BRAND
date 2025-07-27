"use client";

import { useState } from "react";

interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function BlogSearch({
  onSearch,
  placeholder = "Search articles by keyword or topic...",
}: BlogSearchProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Debounced search - could be enhanced with useDebounce hook
    const timeoutId = setTimeout(() => {
      onSearch(newQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  return (
    <div className="max-w-2xl mx-auto relative opacity-100 transition-opacity duration-800">
      <form onSubmit={handleSubmit}>
        <div className="flex rounded-lg overflow-hidden shadow-[0_0_15px_rgba(250,204,21,0.15)] border border-gray-300 dark:border-gray-600 focus-within:border-yellow-400 dark:focus-within:border-yellow-400 transition-all duration-300">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="flex-grow bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm py-4 px-5 outline-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            type="submit"
            className="bg-yellow-500 px-6 flex items-center justify-center hover:bg-yellow-600 transition-colors group"
            title="Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black group-hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
