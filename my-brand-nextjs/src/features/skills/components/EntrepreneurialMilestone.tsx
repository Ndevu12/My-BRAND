import Typography from "@/components/atoms/Typography";

interface EntrepreneurialMilestoneProps {
  step: number;
  title: string;
  description: string;
  delay: string;
}

export function EntrepreneurialMilestone({
  step,
  title,
  description,
  delay,
}: EntrepreneurialMilestoneProps) {
  return (
    <div
      className={`relative opacity-0 animate-fade-in [animation-delay:${delay}]`}
    >
      <div className="absolute -left-[41px] bg-yellow-500 rounded-full w-8 h-8 flex items-center justify-center">
        <Typography variant="span" className="text-black font-bold">
          {step}
        </Typography>
      </div>
      <Typography variant="h4" className="mb-2 text-yellow-400">
        {title}
      </Typography>
      <Typography variant="p" className="text-gray-600 dark:text-gray-300">
        {description}
      </Typography>
    </div>
  );
}
