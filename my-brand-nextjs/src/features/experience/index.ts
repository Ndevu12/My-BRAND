// Experience feature exports
export { default as ExperiencePage } from "./ExperiencePage";
export { default as ExperienceHero } from "./components/ExperienceHero";
export { default as ExperienceCard } from "./components/NewExperienceCard";
export { default as TimelineItem } from "./components/TimelineItem";
export { experienceData } from "./data/experienceData";
export type { Experience } from "./data/experienceData";
export type { ExperienceCardProps } from "./components/NewExperienceCard";
export type { TimelineItemProps } from "./components/TimelineItem";
export type { ExperienceHeroProps } from "./components/ExperienceHero";

// Navigation utilities
export * from "./utils/navigation";