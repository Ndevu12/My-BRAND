"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/atoms/Button";
import Typography from "@/components/atoms/Typography";

export interface ContactSectionProps {
  className?: string;
  title?: string;
  subtitle?: string;
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  className,
  title = "Let's Connect",
  subtitle = "Have a project in mind or interested in working together? I'd love to hear from you! Fill out the form below and I'll get back to you as soon as possible.",
  onSubmit,
}) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );
  const [isVisible, setIsVisible] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // Default behavior - simulate submission
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contactme"
      className={cn(
        "relative py-20 md:py-32 overflow-hidden bg-gray-50 dark:bg-primary",
        className
      )}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-yellow-400/5 dark:bg-yellow-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/5 rounded-full blur-3xl" />

        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(30deg,transparent_40%,rgba(0,0,0,.05)_40%,rgba(0,0,0,.05)_60%,transparent_60%),linear-gradient(-30deg,transparent_40%,rgba(0,0,0,.02)_40%,rgba(0,0,0,.02)_60%,transparent_60%)] dark:bg-[linear-gradient(30deg,transparent_40%,rgba(255,255,255,.1)_40%,rgba(255,255,255,.1)_60%,transparent_60%),linear-gradient(-30deg,transparent_40%,rgba(255,255,255,.05)_40%,rgba(255,255,255,.05)_60%,transparent_60%)] bg-[length:60px_60px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Section Badge */}
            <div
              className={cn(
                "inline-flex items-center gap-2 bg-yellow-400/10 dark:bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/20 dark:border-yellow-400/20 rounded-full px-6 py-3 text-sm font-medium text-yellow-400",
                "transform transition-all duration-1000 ease-out",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              )}
            >
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
              Get In Touch
            </div>

            {/* Main Title */}
            <div
              className={cn(
                "transform transition-all duration-1000 ease-out delay-200",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              )}
            >
              <Typography variant="h2" className="mb-6 leading-tight">
                {title.split(" ").map((word, index) => (
                  <span
                    key={index}
                    className={cn(
                      "inline-block mr-3",
                      index === title.split(" ").length - 1
                        ? "text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text"
                        : "text-gray-800 dark:text-white"
                    )}
                  >
                    {word}
                  </span>
                ))}
              </Typography>
            </div>

            {/* Subtitle */}
            <div
              className={cn(
                "transform transition-all duration-1000 ease-out delay-300",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              )}
            >
              <Typography
                variant="p"
                className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-lg"
              >
                {subtitle}
              </Typography>
            </div>

            {/* Contact Information */}
            <div
              className={cn(
                "space-y-6 transform transition-all duration-1000 ease-out delay-400",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              )}
            >
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-yellow-400/10 dark:bg-yellow-400/10 rounded-2xl flex items-center justify-center group-hover:bg-yellow-400/20 dark:group-hover:bg-yellow-400/20 transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-yellow-400"
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
                </div>
                <div>
                  <Typography
                    variant="p"
                    className="font-medium text-gray-800 dark:text-white"
                  >
                    Email
                  </Typography>
                  <a
                    href="mailto:ndevulion@gmail.com"
                    className="text-gray-600 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-300"
                  >
                    ndevulion@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-yellow-400/10 dark:bg-yellow-400/10 rounded-2xl flex items-center justify-center group-hover:bg-yellow-400/20 dark:group-hover:bg-yellow-400/20 transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <Typography
                    variant="p"
                    className="font-medium text-gray-800 dark:text-white"
                  >
                    Location
                  </Typography>
                  <Typography
                    variant="p"
                    className="text-gray-600 dark:text-gray-300"
                  >
                    Gikondo, Kigali, Rwanda
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-yellow-400/10 dark:bg-yellow-400/10 rounded-2xl flex items-center justify-center group-hover:bg-yellow-400/20 dark:group-hover:bg-yellow-400/20 transition-colors duration-300">
                  <svg
                    className="w-6 h-6 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <Typography
                    variant="p"
                    className="font-medium text-gray-800 dark:text-white"
                  >
                    Response Time
                  </Typography>
                  <Typography
                    variant="p"
                    className="text-gray-600 dark:text-gray-300"
                  >
                    Usually within 24 hours
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div
            className={cn(
              "transform transition-all duration-1000 ease-out delay-500",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            )}
          >
            <form
              onSubmit={handleSubmit}
              className="relative bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95 dark:from-yellow-400/5 dark:via-secondary/50 dark:to-yellow-500/10 backdrop-blur-sm border border-gray-200 dark:border-yellow-400/20 rounded-3xl p-8 space-y-6"
            >
              {/* Form Header */}
              <div className="mb-8">
                <Typography
                  variant="h3"
                  className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
                >
                  Send me a message
                </Typography>
                <Typography
                  variant="p"
                  className="text-gray-600 dark:text-gray-400"
                >
                  I&apos;ll get back to you as soon as possible
                </Typography>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={cn(
                        "w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300",
                        "focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50",
                        focusedField === "name" &&
                          "bg-yellow-50 dark:bg-gray-700 border-yellow-400/50"
                      )}
                      placeholder="Your full name"
                    />
                    {focusedField === "name" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className={cn(
                        "w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300",
                        "focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50",
                        focusedField === "email" &&
                          "bg-yellow-50 dark:bg-gray-700 border-yellow-400/50"
                      )}
                      placeholder="your.email@example.com"
                    />
                    {focusedField === "email" && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Subject *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    required
                    className={cn(
                      "w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300",
                      "focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50",
                      focusedField === "subject" &&
                        "bg-yellow-50 dark:bg-gray-700 border-yellow-400/50"
                    )}
                    placeholder="What's this about?"
                  />
                  {focusedField === "subject" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Message *
                </label>
                <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={5}
                    className={cn(
                      "w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 resize-none",
                      "focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50",
                      focusedField === "message" &&
                        "bg-yellow-50 dark:bg-gray-700 border-yellow-400/50"
                    )}
                    placeholder="Tell me about your project, ideas, or just say hello..."
                  />
                  {focusedField === "message" && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full",
                  isSubmitting && "animate-pulse"
                )}
              >
                <span className="flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="w-5 h-5 animate-spin"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                        />
                      </svg>
                    </>
                  )}
                </span>
              </Button>

              {/* Status Messages */}
              {submitStatus && (
                <div
                  className={cn(
                    "p-4 rounded-xl border animate-pulse",
                    submitStatus === "success"
                      ? "bg-green-500/10 border-green-500/30 text-green-400"
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {submitStatus === "success" ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    )}
                    <p className="font-medium">
                      {submitStatus === "success"
                        ? "Message sent successfully! I'll get back to you soon."
                        : "Failed to send message. Please try again."}
                    </p>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400/30 dark:bg-yellow-400/30 rounded-full animate-ping" />
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-purple-500/30 dark:bg-purple-500/30 rounded-full animate-pulse" />
      </div>
    </section>
  );
};

export default ContactSection;
