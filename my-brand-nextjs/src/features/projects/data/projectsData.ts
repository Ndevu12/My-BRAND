export interface TechStack {
  name: string;
  color: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'pink' | 'orange';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  category: 'Web Apps' | 'Mobile' | 'UI/UX Design' | 'All Projects';
  techStack: TechStack[];
  caseStudyLink?: string;
  githubLink?: string;
  liveLink?: string;
  isLive: boolean;
}

export const projectsData: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A comprehensive online shopping platform with real-time inventory management, secure payment processing, and customer support features.",
    image: "/images/project/e-commerce.jpg",
    category: "Web Apps",
    techStack: [
      { name: "React", color: "blue" },
      { name: "Node.js", color: "green" },
      { name: "MongoDB", color: "yellow" }
    ],
    caseStudyLink: "#",
    githubLink: "#",
    liveLink: "https://e-commerce-demo.ndevuspace.com",
    isLive: true
  },
  {
    id: 2,
    title: "Green Mobility Solution",
    description: "An innovative platform for sustainable urban transportation with real-time tracking, route optimization, and carbon footprint calculation.",
    image: "/images/project/green.jpg",
    category: "Mobile",
    techStack: [
      { name: "React Native", color: "purple" },
      { name: "Express", color: "blue" },
      { name: "PostgreSQL", color: "red" }
    ],
    caseStudyLink: "#",
    githubLink: "#",
    isLive: false
  },
  {
    id: 3,
    title: "Digital Land Platform",
    description: "A secure marketplace for property transactions with blockchain-verified ownership documentation, virtual property tours, and automated contract generation.",
    image: "/images/project/GRE.jpg",
    category: "Web Apps",
    techStack: [
      { name: "Next.js", color: "blue" },
      { name: "NestJS", color: "green" },
      { name: "TypeORM", color: "yellow" }
    ],
    caseStudyLink: "#",
    githubLink: "#",
    liveLink: "https://digital-land.ndevuspace.com",
    isLive: true
  },
  {
    id: 4,
    title: "Health Monitoring App",
    description: "Mobile application for tracking health metrics, medication schedules, and providing personalized wellness recommendations based on user data.",
    image: "/images/web1.jpg",
    category: "Mobile",
    techStack: [
      { name: "Flutter", color: "blue" },
      { name: "Firebase", color: "yellow" },
      { name: "ML Kit", color: "green" }
    ],
    caseStudyLink: "#",
    githubLink: "#",
    isLive: false
  },
  {
    id: 5,
    title: "Portfolio Dashboard",
    description: "Interactive dashboard for visualizing financial portfolio performance with real-time data integration and predictive analytics features.",
    image: "/images/technology.jpg",
    category: "UI/UX Design",
    techStack: [
      { name: "Vue.js", color: "green" },
      { name: "D3.js", color: "orange" },
      { name: "GraphQL", color: "pink" }
    ],
    caseStudyLink: "#",
    githubLink: "#",
    liveLink: "https://portfolio-dash.ndevuspace.com",
    isLive: true
  },
  {
    id: 6,
    title: "Social Learning Platform",
    description: "Educational platform connecting students and mentors through collaborative learning environments and interactive course materials.",
    image: "/images/social life.jpg",
    category: "Web Apps",
    techStack: [
      { name: "Angular", color: "red" },
      { name: "Django", color: "green" },
      { name: "WebRTC", color: "blue" }
    ],
    caseStudyLink: "#",
    githubLink: "#",
    liveLink: "https://learn-social.ndevuspace.com",
    isLive: true
  },
  {
    id: 7,
    title: "Money Tasky Web App",
    description: "A personnel financial management web application designed to help users track their income, expenses, and savings goals. It features a user-friendly interface, real-time financial analytics, and secure data storage.",
    image: "/images/project/money-tasky.jpg",
    category: "Web Apps",
    techStack: [
      { name: "React", color: "blue" },
      { name: "Node.js", color: "green" },
      { name: "MongoDB", color: "yellow" }
    ],
    caseStudyLink: "#",
    githubLink: "#",
    liveLink: "https://moneyTasky.netlify.app",
    isLive: true
  }
];

export const projectCategories = [
  "All Projects",
  "Web Apps",
  "Mobile",
  "UI/UX Design"
] as const;
