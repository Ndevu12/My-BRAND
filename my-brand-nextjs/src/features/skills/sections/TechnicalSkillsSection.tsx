import { SkillCard } from "../components";
import Typography from "@/components/atoms/Typography";

const technicalSkills = [
  {
    title: "Frontend Development",
    skills: [
      "React",
      "Tailwind CSS",
      "HTML5 & CSS3",
      "JavaScript / TypeScript",
      "Redux",
    ],
    gradient: "bg-gradient-to-r from-blue-500 to-purple-600",
    delay: "0.2s",
  },
  {
    title: "UI/UX Design",
    skills: [
      "Figma",
      "Prototyping",
      "User Interface Design",
      "User Experience Design",
      "Design Systems",
    ],
    gradient: "bg-gradient-to-r from-pink-500 to-violet-600",
    delay: "0.3s",
  },
  {
    title: "Backend Development",
    skills: [
      "Node.js & Express",
      "NestJS",
      "Python & FastAPI/Flask",
      "GraphQL & REST APIs",
      "Apollo Server",
    ],
    gradient: "bg-gradient-to-r from-green-500 to-teal-600",
    delay: "0.5s",
  },
  {
    title: "Databases & ORMs",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "TypeORM", "SQLAlchemy"],
    gradient: "bg-gradient-to-r from-yellow-500 to-orange-600",
    delay: "0.7s",
  },
  {
    title: "DevOps & Cloud",
    skills: [
      "Docker",
      "GitHub Actions",
      "AWS Services",
      "CI/CD Pipelines",
      "Kubernetes (Basic)",
    ],
    gradient: "bg-gradient-to-r from-red-500 to-pink-600",
    delay: "0.9s",
  },
  {
    title: "Systems Programming",
    skills: [
      "C/C++",
      "Data Structures & Algorithms",
      "Memory Management",
      "System Programming",
      "Performance Optimization",
    ],
    gradient: "bg-gradient-to-r from-indigo-500 to-purple-600",
    delay: "1.1s",
  },
];

export function TechnicalSkillsSection() {
  return (
    <section className="mb-16">
      <div className="text-center mb-8">
        <Typography variant="h2" className="mb-4">
          <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            Technical Skills
          </span>
        </Typography>
        <div className="h-1 w-24 bg-gradient-to-r from-yellow-300 to-yellow-500 mx-auto mb-6"></div>
        <Typography
          variant="p"
          className="text-center text-gray-600 dark:text-gray-300"
        >
          I'm a Full-Stack Developer with expertise across the entire
          development spectrum, from low-level systems programming to modern web
          deployment
        </Typography>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {technicalSkills?.map((skill, index) => (
          <SkillCard
            key={index}
            title={skill.title}
            skills={skill.skills}
            gradient={skill.gradient}
            delay={skill.delay}
          />
        ))}
      </div>
    </section>
  );
}
