"use client";

import { useState, useEffect } from "react";
import ClientLayout from "@/components/layout";
import {
  ProjectsSection,
  BlogSection,
  ContactSection,
  Hero,
  AboutSection,
  SkillsSection,
} from "./components";
import { getRecentBlogsForHome } from "@/services/blogService";
import { projectsData } from "@/lib/projectData";

export function HomePage() {
  // Blog state management
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);

  // Fetch recent blogs on component mount with timeout handling
  useEffect(() => {
    const fetchRecentBlogs = async () => {
      setBlogLoading(true);
      try {
        const blogs = await getRecentBlogsForHome();
        setBlogPosts(blogs); // blogs will be empty array if error occurred
      } catch (error) {
        // This shouldn't happen since service handles errors gracefully
        console.warn('Failed to fetch recent blogs:', error);
        setBlogPosts([]); // Fallback to empty array
      } finally {
        setBlogLoading(false);
      }
    };

    // Use setTimeout to prevent blocking initial render
    const timeoutId = setTimeout(fetchRecentBlogs, 100);
    
    return () => clearTimeout(timeoutId);
  }, []);

  // Sample data - in a real app, this would come from an API or CMS
  const heroData = {
    title: "Crafting Digital Experiences That Matter",
    subtitle: "I'm Jean Paul Elisa NIYOKWIZERWA, Full Stack Software Engineer.",
    description:
      "Welcome to my digital portfolio where code meets creativity. I specialize in building robust, scalable applications that deliver exceptional user experiences. With expertise spanning frontend design to backend architecture, I transform ideas into functional, beautiful digital products that solve real-world challenges.",
    quote:
      "Technology is best when it brings people together. My intention is to create digital solutions that connect, engage, and inspire users while solving meaningful problems that drive innovation and positive change.",
    profileImage: "/images/mypic.png",
    profileAlt: "Jean Paul Elisa NIYOKWIZERWA - Full Stack Software Engineer",
    socialLinks: [
      {
        href: "https://www.linkedin.com/in/jean-paul-elisa",
        icon: "/images/linkedin-logo.png",
        label: "LinkedIn Profile",
      },
      {
        href: "https://github.com/Ndevu12",
        icon: "/images/gith.png",
        label: "GitHub Profile",
      },
    ],
    primaryCTA: {
      text: "Download My CV",
      href: "/files/Jean Paul Elisa NIYOKWIZERWA_cv.pdf",
      download: true,
    },
  };

  const aboutData = {
    description: [
      "With over 5 years of experience in software development, I've built a diverse skill set that allows me to handle complex projects from conception to deployment. I'm passionate about creating intuitive user interfaces backed by robust, efficient code.",
      "My approach combines technical excellence with creative problem-solving. I specialize in JavaScript ecosystems (React, Node.js), modern CSS frameworks, and cloud-native architectures, always focusing on performance, accessibility, and maintainability.",
      "Beyond coding, I'm deeply committed to continuous learning and sharing knowledge with the developer community. I believe in the power of technology to solve real-world problems and create meaningful impact.",
    ],
    image: "/images/technology.jpg",
    imageAlt: "Technology and coding visualization",
    stats: [
      { label: "Projects Completed", value: "50+" },
      { label: "Years Experience", value: "5+" },
      { label: "Technologies", value: "20+" },
      { label: "Happy Clients", value: "25+" },
    ],
  };

  const skillsData = [
    {
      id: "ux-ui-design",
      title: "UX/UI Design",
      description:
        "Creating intuitive, user-centered designs that enhance engagement and satisfaction. I specialize in wireframing, prototyping, and implementing responsive interfaces that deliver exceptional experiences across all devices and platforms.",
      image: "/images/UX design.jfif",
      imageAlt: "UX/UI Design",
      skills: [
        "Figma",
        "Adobe XD",
        "Wireframing",
        "Prototyping",
        "User Research",
        "Design Systems",
      ],
    },
    {
      id: "full-stack-dev",
      title: "Full Stack Development",
      description:
        "Proficient in both frontend and backend technologies, enabling me to build complete, integrated solutions. My expertise spans modern JavaScript frameworks, API development, database design, and cloud infrastructure with a focus on scalability.",
      image: "/images/full.jfif",
      imageAlt: "Full Stack Development",
      skills: ["React", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker"],
    },
    {
      id: "technical-leadership",
      title: "Technical Leadership",
      description:
        "Experienced in guiding development teams, setting technical direction, and ensuring project success through effective planning, communication, and implementation of best practices in software development and architecture.",
      image: "/images/web.jfif",
      imageAlt: "Technical Leadership",
      skills: [
        "Team Leadership",
        "Code Review",
        "Architecture",
        "Mentoring",
        "Agile",
        "DevOps",
      ],
    },
  ];

  return (
    <ClientLayout>
      <Hero
        title={heroData.title}
        subtitle={heroData.subtitle}
        description={heroData.description}
        quote={heroData.quote}
        profileImage={heroData.profileImage}
        profileAlt={heroData.profileAlt}
        socialLinks={heroData.socialLinks}
        primaryCTA={heroData.primaryCTA}
      />

      <AboutSection
        description={aboutData.description}
        image={aboutData.image}
        imageAlt={aboutData.imageAlt}
        stats={aboutData.stats}
        className="bg-gray-50 dark:bg-secondary"
      />

      <SkillsSection
        skills={skillsData}
        title="Core Competencies"
        subtitle="Expertise that drives innovation and delivers results"
        maxDisplay={3}
        columns={3}
        onViewAll={() => {
          // Navigate to skills page
          if (typeof window !== "undefined") {
            window.location.href = "/skills";
          }
        }}
      />

      <ProjectsSection
        projects={projectsData}
        title="Featured Projects"
        subtitle="Showcasing solutions that combine technical excellence with creative innovation"
        maxDisplay={3}
        showViewAll={true}
      />

      <BlogSection
        posts={blogPosts}
        title="Latest Insights"
        subtitle="Thoughts, tutorials, and insights from my development journey and industry experience"
        maxDisplay={3}
        showViewAll={true}
        loading={blogLoading}
      />

      <ContactSection
        title="Let's Connect"
        subtitle="Have a project in mind or interested in working together? I'd love to hear from you! Let's discuss how we can bring your ideas to life and create something amazing together."
        onSubmit={async (data) => {
          // Handle form submission
          console.log("Contact form submitted:", data);
          // In a real app, you would send this data to your backend
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
      />
    </ClientLayout>
  );
}
