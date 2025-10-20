"use client";
import React, { useRef } from "react";

// CV data for easy updates
const cvData = {
  name: "JEAN PAUL ELISA NIYOKWIZERWA",
  title: "Backend Engineer",
  contact: {
    phone: "+250785044398",
    email: "niyokwizerwajeanpaulelisa@gmail.com",
    location: "Gikondo – Kigali",
    linkedin: "https://www.linkedin.com/in/jean-paul-elisa",
    github: "https://github.com/Ndevu12",
  },
  summary:
    "Results-driven Backend Engineer with 4+ years of proven experience designing, developing, and maintaining robust backend applications and services. Expertise in building scalable RESTful APIs, GraphQL endpoints, and optimizing database performance for high-traffic systems. Strong proficiency in Node.js, Java/Spring Boot, database management, and cloud architecture with hands-on experience in Azure, Docker, and Kubernetes. Demonstrated ability to lead technical teams, implement secure authentication systems, troubleshoot production issues, and collaborate cross-functionally to deliver mission-critical solutions. Passionate about innovation, system optimization, and contributing to transformative digital platforms.",
  skills: [
    {
      label: "Backend Technologies:",
      value: "Node.js, Java/Spring Boot, TypeScript, JavaScript, Python",
    },
    {
      label: "API Development:",
      value:
        "RESTful APIs, GraphQL, API integrations with third-party services",
    },
    {
      label: "Database Management:",
      value:
        "PostgreSQL, MongoDB, SQL, database schema design, stored procedures, query optimization",
    },
    {
      label: "Cloud & DevOps:",
      value:
        "Microsoft Azure, Docker, Kubernetes, CI/CD pipelines, serverless architecture",
    },
    {
      label: "Authentication & Security:",
      value:
        "JWT, OAuth, secure authentication protocols, web application security best practices",
    },
    {
      label: "Testing & Quality:",
      value:
        "Jest, automated testing frameworks, unit testing, integration testing, debugging",
    },
    {
      label: "Version Control:",
      value: "Git, GitHub, code review practices",
    },
    {
      label: "Development Practices:",
      value:
        "Agile/Scrum methodology, OOP concepts, design patterns, system performance optimization",
    },
    {
      label: "Additional Tools:",
      value:
        "Supabase (backend-as-a-service), Linux systems, shell scripting, technical documentation",
    },
  ],
  experience: [
    {
      title: "Chief Technology Officer",
      company: "Global Real Estate Ltd, Kigali | Apr 2024 – Present",
      description:
        "Architected and deployed a scalable digital real estate platform with integration to external APIs for land registry data, tax calculations, and loan verification systems. Led a cross-functional engineering team of 5+ developers, conducting code reviews, technical mentorship, and sprint planning using Agile methodology to ensure timely delivery of high-quality solutions. Designed and optimized database schemas, stored procedures, and triggers in PostgreSQL, improving query performance by 40% and ensuring data integrity across microservices. Implemented DevOps best practices including Docker containerization and deployment to Microsoft Azure cloud, achieving 99.5% system uptime and enhanced scalability. Developed comprehensive technical documentation for backend systems and API architecture, facilitating knowledge transfer and system maintenance. Collaborated with stakeholders to align technical solutions with business objectives, ensuring platform compliance with industry standards.",
    },
    {
      title: "Software Engineer",
      company: "Global Real Estate Ltd, Kigali | Jan 2024 – Oct 2024",
      description:
        "Designed and developed core backend services and APIs using Node.js, PostgreSQL, and GraphQL, enabling efficient property search, user management, and secure transaction processing. Built and maintained robust authentication and authorization systems using JWT and OAuth protocols, enhancing platform security and achieving zero security breaches. Created and maintained database schemas with complex relationships, implementing stored procedures and triggers for automated business logic execution. Conducted thorough integration testing and production debugging, reducing reported bugs by 30% and improving overall system stability. Monitored and optimized system performance, implementing caching strategies and database indexing that reduced API response times by 35%. Collaborated with frontend developers and product managers to ensure seamless integration and alignment with user requirements and regulatory compliance.",
    },
    {
      title: "Full-Stack Developer (Freelance)",
      company: "Remote / On-site / Hybrid | Sep 2024 – Present",
      description:
        "Delivered end-to-end web applications for diverse clients, specializing in backend development using Node.js, Java/Spring Boot, Python, and modern frameworks. Developed RESTful and GraphQL APIs integrated with PostgreSQL, MongoDB, and Supabase backend services for rapid development and deployment. Implemented serverless architecture solutions and cloud-based backend services, optimizing costs and improving scalability. Coordinated directly with clients to gather requirements, provide technical consultation, and deliver solutions within project timelines while maintaining code quality standards. Applied automated testing practices and CI/CD pipelines to ensure reliable deployments and minimize production issues.",
    },
    {
      title: "Web Developer",
      company: "Andela Rwanda (Remote) | Feb 2024 – Nov 2024",
      description:
        "Built and maintained responsive web applications with React, Redux, and TypeScript, collaborating closely with backend teams to integrate APIs. Participated in Agile sprints, delivering features on schedule while adhering to coding standards and best practices. Implemented automated testing frameworks to ensure feature reliability, code quality, and maintainability. Mentored junior developers through code reviews and knowledge-sharing sessions, fostering a collaborative engineering culture.",
    },
    {
      title: "Backend Developer",
      company: "Nkubito Development Business, Kigali | Mar 2022 – Jul 2023",
      description:
        "Designed and implemented backend services and RESTful APIs using Java/Spring Boot and SQL, supporting critical business applications. Optimized database performance through schema redesign, query optimization, and indexing strategies, reducing average query execution time by 25%. Deployed applications to production environments and ensured system reliability through proactive monitoring, logging, and maintenance. Troubleshot and debugged production issues, resolving complex technical challenges and minimizing downtime. Collaborated with frontend developers to deliver integrated, full-stack solutions that met client specifications and business requirements.",
    },
    {
      title: "Software Engineering Program",
      company: "ALX Africa | Aug 2023 – Nov 2024",
      description:
        "Completed intensive software engineering curriculum covering algorithms, data structures, system design, backend development, and DevOps. Built multiple backend projects using Node.js, Python, C/C++, and SQL, applying problem-solving skills to real-world scenarios. Gained expertise in low-level programming, memory management, and system performance optimization. Collaborated in peer-programming and agile team environments, improving technical communication and code quality.",
    },
  ],
  education: [
    {
      degree:
        "Bachelor's Degree in Business Administration – Business Information Technology",
      institution: "University of Rwanda, Gikondo Campus | Expected June 2025",
    },
  ],
  certifications: [
    "Software Engineering — ALX Africa (Nov 2024)",
    "JavaScript Data Structures & Algorithms — freeCodeCamp (2024)",
    "Web Development — Andela Rwanda (Nov 2024)",
    "Foundations of User Experience Design — Google (2023)",
  ],
  achievements: [
    "Software Engineer, Pan-African Informatics Olympiad | Jan 2025",
    "Top 10 Finalist, NISR Big Data Hackathon | 2024",
    "Coach (Data Structures & Algorithms), Rwanda Informatics Olympiad | Feb 2024 – Present",
    "Coach (Data Structures & Algorithms), Pan-African Informatics Olympiad | Apr 2025 – Present",
    "Host Committee Member, Pan-African Informatics Olympiad | 2025",
  ],
  competencies: [
    {
      title: "Technical Expertise:",
      value:
        "Deep knowledge of backend programming with Node.js and Java/Spring Boot frameworks, database management, and cloud infrastructure",
    },
    {
      title: "Problem-Solving:",
      value:
        "Strong analytical thinking with proven ability to diagnose technical issues, break down complex problems, and develop creative, efficient solutions",
    },
    {
      title: "System Performance Optimization:",
      value:
        "Demonstrated expertise in optimizing database queries, implementing caching strategies, and improving application scalability and performance",
    },
    {
      title: "API Development:",
      value:
        "Extensive experience designing and implementing RESTful APIs, GraphQL endpoints, and integrating third-party services",
    },
    {
      title: "Security & Authentication:",
      value:
        "Expert in implementing secure authentication protocols, web application security best practices, and protecting sensitive data",
    },
    {
      title: "Project Management:",
      value:
        "Proven ability to coordinate resources, manage technical projects, track progress, and ensure timely delivery of tasks in Agile environments",
    },
    {
      title: "Communication & Collaboration:",
      value:
        "Strong written and verbal communication skills with experience working across cross-functional teams and effectively engaging with stakeholders",
    },
    {
      title: "Teamwork & Leadership:",
      value:
        "Demonstrated ability to mentor junior developers, conduct code reviews, and work collaboratively in team environments",
    },
    {
      title: "Attention to Detail:",
      value:
        "Meticulous approach to code review, testing, and documentation to ensure accuracy, quality, and maintainability",
    },
    {
      title: "Time Management:",
      value:
        "Proven ability to prioritize competing tasks, manage multiple projects simultaneously, and deliver results within deadlines",
    },
  ],
  references: [
    {
      name: "CYUZUZO Remy",
      role: "Software Engineer at Rhodes & Shwaz",
      phone: "+250783910300",
    },
    {
      name: "Adolphe ISHIMWE",
      role: "CEO at Global Real Estate",
      phone: "+250792491551",
    },
    {
      name: "Joel Lee",
      role: "Senior Software Engineer & Coach at Pan-African Informatics Olympiad",
      phone: "+6587906128",
    },
  ],
  footer:
    "Available for immediate start | Open to full-time opportunities\nPassionate about contributing to Rwanda's digital transformation through innovative backend solutions",
};

export default function CVPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (contentRef.current) {
      const text = contentRef.current.innerText;
      navigator.clipboard.writeText(text);
      alert("CV content copied to clipboard!");
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-800 max-w-3xl mx-auto px-4 py-8">
      {/* Buttons */}
      <div className="flex justify-center mb-8 print:hidden">
        <button
          className="px-6 py-3 bg-gray-900 text-white rounded font-bold hover:bg-gray-700"
          onClick={() => window.print()}
        >
          Download as PDF
        </button>
      </div>

      <div ref={contentRef}>
        {/* Header */}
        <div className="text-center mb-8 border-b-4 border-gray-900 pb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {cvData.name}
          </h1>
          <div className="text-lg font-semibold text-gray-600 mb-2">
            {cvData.title}
          </div>
          <div className="text-sm text-gray-600">
            {cvData.contact.phone} | {cvData.contact.email} |{" "}
            {cvData.contact.location}
            <br />
                <a href={cvData.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> | <a href={cvData.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
        </div>

        {/* Professional Summary */}
        <section className="mb-8">
          <div className="uppercase text-base font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-4 tracking-wide">
            Professional Summary
          </div>
          <div className="text-justify text-sm leading-relaxed">
            {cvData.summary}
          </div>
        </section>

        {/* Technical Competencies */}
        <section className="mb-8">
          <div className="uppercase text-base font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-4 tracking-wide">
            Technical Competencies
          </div>
          <div className="grid gap-2 text-sm">
            {cvData.skills.map((skill, i) => (
              <div key={i} className="leading-relaxed">
                <span className="font-bold text-gray-900">{skill.label}</span>{" "}
                {skill.value}
              </div>
            ))}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-8">
          <div className="uppercase text-base font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-4 tracking-wide">
            Professional Experience
          </div>
          {cvData.experience.map((job, i) => (
            <div key={i} className="mb-6">
              <div className="font-bold text-base text-gray-900 mb-1">
                {job.title}
              </div>
              <div className="italic text-gray-600 text-sm mb-2">
                {job.company}
              </div>
              <div className="text-justify text-sm leading-relaxed">
                {job.description}
              </div>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="mb-8">
          <div className="uppercase text-base font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-4 tracking-wide">
            Education
          </div>
          {cvData.education.map((edu, i) => (
            <div key={i} className="mb-4">
              <div className="font-bold text-sm text-gray-900">
                {edu.degree}
              </div>
              <div className="italic text-gray-600 text-sm">
                {edu.institution}
              </div>
            </div>
          ))}
        </section>

        {/* Certifications */}
        <section className="mb-8">
          <div className="uppercase text-base font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-4 tracking-wide">
            Certifications
          </div>
          {cvData.certifications.map((cert, i) => (
            <div key={i} className="mb-2 text-sm leading-relaxed">
              • {cert}
            </div>
          ))}
        </section>

        {/* Achievements */}
        <section className="mb-8">
          <div className="uppercase text-base font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-4 tracking-wide">
            Key Achievements & Recognition
          </div>
          {cvData.achievements.map((ach, i) => (
            <div key={i} className="mb-2 text-sm leading-relaxed">
              • {ach}
            </div>
          ))}
        </section>

        {/* Core Competencies */}
        <section className="mb-8">
          <div className="uppercase text-base font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-4 tracking-wide">
            Core Competencies
          </div>
          {cvData.competencies.map((comp, i) => (
            <div key={i} className="mb-3 text-sm leading-relaxed">
              <span className="font-bold text-gray-900">{comp.title}</span>{" "}
              {comp.value}
            </div>
          ))}
        </section>

        {/* References */}
        <section className="mb-8">
          <div className="uppercase text-base font-bold text-gray-900 border-b-2 border-gray-900 pb-1 mb-4 tracking-wide">
            References
          </div>
          {cvData.references.map((ref, i) => (
            <div key={i} className="mb-3 text-sm leading-relaxed">
              <span className="font-bold text-gray-900">{ref.name}</span>
              <br />
              {ref.role}
              <br />
              {ref.phone}
            </div>
          ))}
        </section>

        {/* Footer */}
        <div className="text-center italic text-gray-600 mt-8 pt-6 border-t-2 border-gray-200 text-xs">
          {cvData.footer}
        </div>
      </div>
    </div>
  );
}
