/**
 * Experience Data
 * Contains structured data for professional experience entries
 */

export interface Experience {
  id: number;
  title: string;
  period: string;
  location: string;
  description: string;
  tags: string[];
  tagColors: string[];
  image: string;
  link: string;
  linkText: string;
}

export const experienceData: Experience[] = [
  {
    id: 1,
    title: "Joined Andela ATLP Program",
    period: "2021 - 2022",
    location: "Rwanda, Kigali",
    description: "As part of the Andela Technical Leadership Program (ATLP), I enhanced my skills in software development, teamwork, and leadership, focusing on creating scalable and efficient solutions. The program provided hands-on experience with modern web technologies and best practices in software engineering.",
    tags: ["Software Development", "Leadership"],
    tagColors: ["blue", "purple"],
    image: "/images/technology.jpg",
    link: "https://andela.com/programs/",
    linkText: "Visit Program"
  },
  {
    id: 2,
    title: "ALX Software Engineering",
    period: "2022 - 2023",
    location: "Remote Program",
    description: "Successfully completed the ALX Software Engineering program with a specialization in backend development. This intensive training strengthened my expertise in modern backend technologies and best practices, including API design, database optimization, and server architecture.",
    tags: ["Backend Development", "System Design"],
    tagColors: ["green", "cyan"],
    image: "/images/web1.jpg",
    link: "https://www.alxafrica.com/",
    linkText: "Visit Program"
  },
  {
    id: 3,
    title: "Co-Founder and CTO at Global Real Estate",
    period: "2023 - Present",
    location: "Kigali, Rwanda",
    description: "Currently leading the technical development of an innovative platform for buying and selling properties. As CTO, I oversee architectural design, platform development, and team coordination to ensure project success while implementing cutting-edge technologies and maintaining high code quality standards.",
    tags: ["Leadership", "Architecture"],
    tagColors: ["purple", "red"],
    image: "/images/project/green.jpg",
    link: "#",
    linkText: "Company Website"
  }
];

export default experienceData;
