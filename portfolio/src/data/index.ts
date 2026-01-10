import { Project, Skill, Experience } from '@/types';

// Import JSON data
import profileJson from './json/profile.json';
import experienceJson from './json/experience.json';
import skillsJson from './json/skills.json';
import projectsJson from './json/projects.json';

// ============================================
// PROFILE DATA
// ============================================
export const profileData = profileJson;

// ============================================
// PROJECTS DATA
// ============================================

// Transform JSON projects to match the Project type
export const projectsData: Project[] = [
  // Featured projects first
  ...projectsJson.featured.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image,
    category: project.category === 'fullstack' ? 'Web Apps' : 
              project.category === 'frontend' ? 'Web Apps' : 
              project.category === 'backend' ? 'Backend' : 
              project.category === 'mobile' ? 'Mobile' : 'Web Apps',
    techStack: project.technologies,
    githubLink: project.links.github || 'https://github.com/Ndevu12',
    liveLink: project.links.demo || undefined,
    featured: project.featured,
  })),
  // Other projects
  ...projectsJson.projects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image,
    category: project.category === 'fullstack' ? 'Web Apps' : 
              project.category === 'frontend' ? 'Web Apps' : 
              project.category === 'backend' ? 'Backend' : 
              project.category === 'mobile' ? 'Mobile' : 'Web Apps',
    techStack: project.technologies,
    githubLink: project.links.github || 'https://github.com/Ndevu12',
    liveLink: project.links.demo || undefined,
    featured: false,
  })),
];

// Export raw project data for more detailed views
export const featuredProjects = projectsJson.featured;
export const allProjects = projectsJson.projects;
export const projectCategories = projectsJson.categories;

// ============================================
// SKILLS DATA
// ============================================

// Transform JSON skills to match the Skill type
export const skillsData: Skill[] = skillsJson.categories.map((category) => ({
  id: category.id,
  title: category.title,
  description: category.description,
  icon: category.icon,
  technologies: category.technologies.map((tech) => tech.name),
}));

// Export detailed skills data with proficiency levels
export const skillsDetailed = skillsJson.categories;
export const coreCompetencies = skillsJson.coreCompetencies;
export const languageSkills = skillsJson.languages;

// ============================================
// EXPERIENCE DATA
// ============================================

// Transform JSON experience to match the Experience type
export const experienceData: Experience[] = [
  // Work experience
  ...experienceJson.work.map((exp, index) => ({
    id: `work-${index + 1}`,
    title: exp.title,
    company: exp.company,
    location: exp.location,
    period: exp.period,
    description: exp.description,
    technologies: exp.technologies,
    type: 'work' as const,
  })),
  // Education
  ...experienceJson.education.map((edu, index) => ({
    id: `edu-${index + 1}`,
    title: edu.title,
    company: edu.company,
    location: edu.location,
    period: edu.period,
    description: edu.description,
    technologies: edu.technologies || [],
    type: 'education' as const,
  })),
];

// Export separate arrays for more granular access
export const workExperience = experienceJson.work;
export const education = experienceJson.education;
export const certifications = experienceJson.certifications;
export const awards = experienceJson.awards;
export const volunteering = experienceJson.volunteering;

// ============================================
// STATS DATA
// ============================================

export const statsData = [
  { label: "Projects Completed", value: "50+" },
  { label: "Years Experience", value: "4+" },
  { label: "Technologies", value: "25+" },
  { label: "Happy Clients", value: "30+" },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

// Get featured projects only
export const getFeaturedProjects = () => projectsData.filter(p => p.featured);

// Get projects by category
export const getProjectsByCategory = (category: string) => 
  category === 'all' ? projectsData : projectsData.filter(p => p.category === category);

// Get skill by ID
export const getSkillById = (id: string) => skillsData.find(s => s.id === id);

// Get work experience only
export const getWorkExperience = () => experienceData.filter(e => e.type === 'work');

// Get education only
export const getEducation = () => experienceData.filter(e => e.type === 'education');
