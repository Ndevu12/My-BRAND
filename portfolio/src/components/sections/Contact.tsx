"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { Section, SectionHeader, Button, Card } from "@/components/ui";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { submitContactForm, type ContactFormData } from "@/services/contact";
import {
  Send,
  Mail,
  MapPin,
  Github,
  Linkedin,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Email obfuscation - renders only on client to prevent bot scraping
function ObfuscatedEmail() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // Only reveal email on client-side (bots can't execute JS)
    setEmail("hello" + "@" + "ndevuspace" + "." + "com");
  }, []);

  if (!email) return <span>hello [at] ndevuspace [dot] com</span>;
  return <span>{email}</span>;
}

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    // Clear error when user starts typing
    if (submitStatus === "error") {
      setSubmitStatus(null);
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage(null);

    const result = await submitContactForm(formData);

    if (result.success) {
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setSubmitStatus("error");
      // Combine message and error for complete user feedback
      const fullMessage = result.error
        ? `${result.message} ${result.error}`
        : result.message;
      setErrorMessage(fullMessage);
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: <ObfuscatedEmail />,
      href: `mailto:${PERSONAL_INFO.email}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: PERSONAL_INFO.location,
      href: null,
    },
  ];

  return (
    <Section id="contact" className="bg-gray-50 dark:bg-secondary/50">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[80px]" />
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <SectionHeader
          badge="Get In Touch"
          title="Let's Work Together"
          subtitle="Have a project in mind or want to collaborate? I'd love to hear from you"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Let&apos;s start a conversation
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                Whether you have a project idea, a question, or just want to say
                hi, I&apos;m always open to discussing new opportunities and
                collaborations. Fill out the form or reach out directly through
                any of the channels below.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.href || undefined}
                  target={item.href?.startsWith("http") ? "_blank" : undefined}
                  rel={
                    item.href?.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-xl",
                    "bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08]",
                    item.href &&
                      "hover:bg-gray-50 dark:hover:bg-white/[0.06] hover:border-gray-300 dark:hover:border-white/20 cursor-pointer",
                    "transition-all duration-300 group shadow-sm dark:shadow-none"
                  )}
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300">
                    <item.icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{item.label}</p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <p className="text-gray-500 mb-4">
                Or connect with me on social media
              </p>
              <div className="flex gap-3">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 shadow-sm dark:shadow-none"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/[0.08] text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-200 dark:hover:border-blue-500/20 transition-all duration-300 shadow-sm dark:shadow-none"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
                    >
                      Your Name
                    </label>
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
                        "w-full px-4 py-3 rounded-xl",
                        "bg-gray-50 dark:bg-white/[0.03] border",
                        focusedField === "name"
                          ? "border-blue-500"
                          : "border-gray-200 dark:border-white/[0.08]",
                        "text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500",
                        "focus:outline-none focus:border-blue-500",
                        "transition-all duration-300"
                      )}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
                    >
                      Email Address
                    </label>
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
                        "w-full px-4 py-3 rounded-xl",
                        "bg-gray-50 dark:bg-white/[0.03] border",
                        focusedField === "email"
                          ? "border-blue-500"
                          : "border-gray-200 dark:border-white/[0.08]",
                        "text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500",
                        "focus:outline-none focus:border-blue-500",
                        "transition-all duration-300"
                      )}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
                  >
                    Subject
                  </label>
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
                      "w-full px-4 py-3 rounded-xl",
                      "bg-gray-50 dark:bg-white/[0.03] border",
                      focusedField === "subject"
                        ? "border-blue-500"
                        : "border-gray-200 dark:border-white/[0.08]",
                      "text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500",
                      "focus:outline-none focus:border-blue-500",
                      "transition-all duration-300"
                    )}
                    placeholder="Project Discussion"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2"
                  >
                    Message
                  </label>
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
                      "w-full px-4 py-3 rounded-xl resize-none",
                      "bg-gray-50 dark:bg-white/[0.03] border",
                      focusedField === "message"
                        ? "border-blue-500"
                        : "border-gray-200 dark:border-white/[0.08]",
                      "text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500",
                      "focus:outline-none focus:border-blue-500",
                      "transition-all duration-300"
                    )}
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={isSubmitting}
                  rightIcon={!isSubmitting && <Send className="w-5 h-5" />}
                  className="w-full"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="flex items-center gap-2 text-green-500 dark:text-green-400 text-sm">
                    <CheckCircle className="w-5 h-5" />
                    <span>
                      Message sent successfully! I&apos;ll get back to you soon.
                    </span>
                  </div>
                )}
                {submitStatus === "error" && (
                  <div className="flex items-center gap-2 text-red-500 dark:text-red-400 text-sm">
                    <AlertCircle className="w-5 h-5" />
                    <span>
                      {errorMessage ||
                        "Something went wrong. Please try again."}
                    </span>
                  </div>
                )}
              </form>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
}
