import { EntrepreneurialMilestone } from "../components";
import Typography from "@/components/atoms/Typography";

const milestones = [
  {
    step: 1,
    title: "Co-Founded Global Real Estate Platform",
    description:
      "Led technical development of an innovative property marketplace, overseeing platform architecture and team management.",
    delay: "0.3s",
  },
  {
    step: 2,
    title: "Technical Consultant for Startups",
    description:
      "Provided strategic technical guidance to early-stage startups, helping them build scalable infrastructure and optimize development processes.",
    delay: "0.6s",
  },
  {
    step: 3,
    title: "Project Lead for Client Solutions",
    description:
      "Managed full-cycle development for client projects, focusing on delivering high-quality solutions that meet business objectives and user needs.",
    delay: "0.9s",
  },
];

export function EntrepreneurialSection() {
  return (
    <section className="mb-12">
      <div className="text-center mb-8">
        <Typography variant="h2" className="mb-4">
          <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            Entrepreneurial Journey
          </span>
        </Typography>
        <div className="h-1 w-24 bg-gradient-to-r from-yellow-300 to-yellow-500 mx-auto"></div>
      </div>

      <div className="max-w-3xl mx-auto">
        <Typography
          variant="p"
          className="text-gray-600 dark:text-gray-300 mb-8 text-center"
        >
          My entrepreneurial experience has shaped my approach to
          problem-solving and project execution, bringing business insights to
          technical solutions.
        </Typography>

        <div className="relative border-l-2 border-yellow-500 pl-8 ml-4 space-y-10">
          {milestones.map((milestone, index) => (
            <EntrepreneurialMilestone
              key={index}
              step={milestone.step}
              title={milestone.title}
              description={milestone.description}
              delay={milestone.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
