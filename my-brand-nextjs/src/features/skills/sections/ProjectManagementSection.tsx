import { ProjectManagementCard } from "../components";
import Typography from "@/components/atoms/Typography";

const projectManagementData = [
  {
    title: "Agile Methodologies",
    description:
      "Scrum and Kanban implementation for efficient project delivery and team coordination",
    borderColor: "border-blue-500",
    textColor: "text-blue-400",
  },
  {
    title: "Project Planning",
    description:
      "Requirements gathering, scope definition, and detailed execution planning",
    borderColor: "border-green-500",
    textColor: "text-green-400",
  },
  {
    title: "Tools",
    description:
      "Proficient with Jira, Trello, and GitHub Projects for task tracking and collaboration",
    borderColor: "border-purple-500",
    textColor: "text-purple-400",
  },
];

export function ProjectManagementSection() {
  return (
    <section className="mb-16 bg-gray-50 dark:bg-secondary py-12 px-6 rounded-lg shadow-xl opacity-0 animate-scale-up transition-colors duration-300">
      <div className="text-center mb-8">
        <Typography variant="h2" className="mb-4">
          <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            Project Management
          </span>
        </Typography>
        <div className="h-1 w-24 bg-gradient-to-r from-yellow-300 to-yellow-500 mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {projectManagementData.map((item, index) => (
          <ProjectManagementCard
            key={index}
            title={item.title}
            description={item.description}
            borderColor={item.borderColor}
            textColor={item.textColor}
          />
        ))}
      </div>
    </section>
  );
}
