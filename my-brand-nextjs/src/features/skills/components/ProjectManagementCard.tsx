import Typography from "@/components/atoms/Typography";

interface ProjectManagementCardProps {
  title: string;
  description: string;
  borderColor: string;
  textColor: string;
}

export function ProjectManagementCard({
  title,
  description,
  borderColor,
  textColor,
}: ProjectManagementCardProps) {
  return (
    <div
      className={`bg-white dark:bg-[#1f1f3d] p-6 rounded-lg border-l-4 ${borderColor} hover:transform hover:scale-105 hover:shadow-lg transition-all duration-300 h-full shadow-sm`}
    >
      <Typography variant="h4" className={`mb-3 ${textColor}`}>
        {title}
      </Typography>
      <Typography
        variant="p"
        className="text-gray-600 dark:text-gray-300 leading-relaxed"
      >
        {description}
      </Typography>
    </div>
  );
}
