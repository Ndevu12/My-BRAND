"use client";

import React, { useState } from "react";
import Typography from "@/components/atoms/Typography";

export interface NewsletterProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => Promise<void> | void;
  className?: string;
  variant?: "default" | "compact" | "featured";
}

const Newsletter: React.FC<NewsletterProps> = ({
  title = "Subscribe to Newsletter",
  description = "Get the latest insights and updates delivered to your inbox",
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  onSubmit,
  className = "",
  variant = "default",
}) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && !isLoading) {
      setIsLoading(true);
      try {
        if (onSubmit) {
          await onSubmit(email);
        } else {
          // Default behavior - just simulate success
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
        setIsSuccess(true);
        setEmail("");
        setTimeout(() => setIsSuccess(false), 3000);
      } catch (error) {
        console.error("Newsletter subscription error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (variant === "compact") {
    return (
      <div className={`${className}`}>
        <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
          <input
            type="email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-gray-100 dark:bg-secondary/70 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || isSuccess}
            className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-green-400 disabled:to-green-500 text-black px-6 py-2 rounded-lg transition-all duration-300 flex items-center justify-center transform hover:scale-105 disabled:hover:scale-100 font-semibold min-w-[100px]"
            aria-label="Subscribe to newsletter"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            ) : isSuccess ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              buttonText
            )}
          </button>
        </form>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div className={`relative ${className}`}>
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-purple-500/5 to-blue-500/10 rounded-3xl blur-2xl" />

        <div className="relative bg-white/95 dark:bg-secondary/30 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-yellow-400/20 to-yellow-500/20 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-transparent animate-pulse" />
            <svg
              className="w-8 h-8 text-yellow-400 relative z-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {/* Floating particles */}
            <div className="absolute top-2 right-2 w-1 h-1 bg-yellow-400/60 rounded-full animate-ping" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-blue-400/60 rounded-full animate-pulse" />
          </div>

          <Typography
            variant="h3"
            className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4"
          >
            <span className="text-transparent bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text">
              {title}
            </span>
          </Typography>

          <Typography
            variant="p"
            className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-md mx-auto"
          >
            {description}
          </Typography>

          <form
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto"
          >
            <input
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-50 dark:bg-white/10 border border-gray-200 dark:border-gray-900 dark:border-white/20 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
              required
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="whitespace-nowrap px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 disabled:from-green-400 disabled:to-green-500 text-black font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Subscribing...</span>
                </div>
              ) : isSuccess ? (
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Subscribed!</span>
                </div>
              ) : (
                buttonText
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`${className}`}>
      <Typography
        variant="h4"
        className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300"
      >
        {title}
      </Typography>
      <Typography
        variant="p"
        className="text-gray-600 dark:text-gray-400 mb-4 text-sm"
      >
        {description}
      </Typography>
      <form onSubmit={handleNewsletterSubmit} className="flex">
        <input
          type="email"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white dark:bg-secondary/70 text-gray-900 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-yellow-400 w-full transition-all duration-200"
          required
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || isSuccess}
          className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-green-500 text-black px-4 rounded-r-md transition-colors duration-300 flex items-center justify-center transform hover:scale-105 disabled:hover:scale-100"
          aria-label="Subscribe to newsletter"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          ) : isSuccess ? (
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          )}
        </button>
      </form>
      {isSuccess && (
        <Typography
          variant="small"
          className="text-green-600 dark:text-green-400 mt-2 text-xs"
        >
          Successfully subscribed! Check your email for confirmation.
        </Typography>
      )}
    </div>
  );
};

export default Newsletter;
