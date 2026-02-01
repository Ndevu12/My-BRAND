export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  techStack: string[];
  githubLink?: string;
  liveLink?: string;
  featured?: boolean;
}

export interface Skill {
  id: string;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  type: 'work' | 'education';
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

export interface NavItem {
  name: string;
  href: string;
}
