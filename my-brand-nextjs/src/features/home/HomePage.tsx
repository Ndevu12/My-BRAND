"use client";

import ClientLayout from "@/components/layout";
import {
  ProjectsSection,
  BlogSection,
  ContactSection,
  Hero,
  AboutSection,
  SkillsSection,
} from "./components";

export function HomePage() {
  // Sample data - in a real app, this would come from an API or CMS
  const heroData = {
    title: "Crafting Digital Experiences That Matter",
    subtitle: "I'm Jean Paul Elisa NIYOKWIZERWA, Full Stack Software Engineer.",
    description:
      "Welcome to my digital portfolio where code meets creativity. I specialize in building robust, scalable applications that deliver exceptional user experiences. With expertise spanning frontend design to backend architecture, I transform ideas into functional, beautiful digital products that solve real-world challenges.",
    quote:
      "Technology is best when it brings people together. My mission is to create digital solutions that connect, engage, and inspire users while solving meaningful problems that drive innovation and positive change.",
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

  const projectsData = [
    {
      id: "shell-implementation",
      title: "Custom Shell Implementation",
      description:
        "Developed a Unix-like shell with advanced features including command parsing, process management, and I/O redirection, demonstrating deep understanding of system programming concepts.",
      image: "/images/shell.jfif",
      imageAlt: "Unix shell project",
      technologies: ["C", "Unix", "System Programming", "Process Management"],
      githubUrl:
        "https://github.com/Jean Paul Elisa NIYOKWIZERWA12/simple_shell",
      category: "System Programming",
    },
    {
      id: "property-marketplace",
      title: "Property Marketplace Platform",
      description:
        "Built a full-featured accommodation booking platform with secure user authentication, advanced search capabilities, integrated payment processing, and responsive design for optimal user experience.",
      image: "/images/airbnb.png",
      imageAlt: "AirBnB clone project",
      technologies: ["Python", "Flask", "MySQL", "JavaScript", "Bootstrap"],
      githubUrl:
        "https://github.com/Jean Paul Elisa NIYOKWIZERWA12/AirBnB_clone_v4",
      demoUrl: "#",
      category: "Web Application",
    },
    {
      id: "bytecode-interpreter",
      title: "Bytecode Interpreter",
      description:
        "Created a robust interpreter for Monty bytecode, implementing stack and queue operations, memory management, and error handling—showcasing advanced algorithm design and low-level programming skills.",
      image: "/images/monty.jfif",
      imageAlt: "Monty interpreter project",
      technologies: ["C", "Data Structures", "Algorithms", "Memory Management"],
      githubUrl: "https://github.com/Jean Paul Elisa NIYOKWIZERWA12/monty",
      category: "Interpreter",
    },
    {
      id: "portfolio-website",
      title: "Personal Portfolio Website",
      description:
        "Modern, responsive portfolio website built with Next.js and TypeScript, featuring advanced animations, optimized performance, and seamless user experience across all devices.",
      image: "/images/web1.jpg",
      imageAlt: "Portfolio website project",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      githubUrl: "https://github.com/Ndevu12/My-BRAND",
      demoUrl: "https://ndevu-portfolio.vercel.app",
      category: "Web Development",
    },
  ];

  const blogData = [
    {
      id: "web-architecture-evolution",
      title: "The Evolution of Modern Web Architecture",
      excerpt:
        "From monolithic applications to microservices and serverless computing—explore how web architecture has transformed over time and what approach might work best for your next project.",
      publishedAt: "2023-02-15T10:30:00Z",
      readTime: "8 min read",
      category: "Architecture",
      slug: "web-architecture-evolution",
      image: "/images/technology.jpg",
      imageAlt: "Web architecture evolution",
    },
    {
      id: "react-performance-optimization",
      title: "React Performance Optimization: A Developer's Guide",
      excerpt:
        "Learn practical techniques to optimize React applications for better user experience. From memo and useMemo to code splitting and lazy loading.",
      publishedAt: "2023-01-22T14:15:00Z",
      readTime: "12 min read",
      category: "React",
      slug: "react-performance-optimization",
      image: "/images/web.jfif",
      imageAlt: "React performance optimization",
    },
    {
      id: "optimization",
      title: "Performance Optimization: A Developer's Guide",
      excerpt:
        "Learn practical techniques to optimize React applications for better user experience. From memo and useMemo to code splitting and lazy loading.",
      publishedAt: "2023-01-22T14:15:00Z",
      readTime: "12 min read",
      category: "React",
      slug: "react-performance-optimization",
      image: "/images/web.jfif",
      imageAlt: "React performance optimization",
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
        posts={blogData}
        title="Latest Insights"
        subtitle="Thoughts, tutorials, and insights from my development journey and industry experience"
        maxDisplay={3}
        showViewAll={true}
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
