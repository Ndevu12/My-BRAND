import { ReactNode } from "react";
import Typography from "@/components/atoms/Typography";

interface SkillCardProps {
  title: string;
  skills: string[];
  gradient: string;
  delay?: string;
}

export function SkillCard({
  title,
  skills,
  gradient,
  delay = "0s",
}: SkillCardProps) {
  return (
    <div
      className={`bg-white dark:bg-secondary border border-gray-200 dark:border-gray-700 rounded-xl p-0 hover:border-yellow-400 hover:shadow-xl hover:shadow-yellow-400/10 overflow-hidden transition-all duration-300 opacity-0 animate-fade-in group transform hover:scale-105 [animation-delay:${delay}]`}
    >
      <div className={`p-4 ${gradient} text-center relative`}>
        <Typography
          variant="h5"
          className="text-lg font-bold text-white relative z-10"
        >
          {title}
        </Typography>
      </div>
      <div className="p-6">
        <ul className="space-y-3 text-gray-600 dark:text-gray-300">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="flex items-center group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors duration-200"
            >
              <span className="text-yellow-400 mr-3 font-bold">▸</span>
              <Typography variant="span" className="text-sm font-medium">
                {skill}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
