import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import CustomLink from "@/components/atoms/Link";

export interface SkillCardProps {
  title: string;
  description: string;
  image: string;
  href?: string;
  className?: string;
  animationDelay?: number;
}

const SkillCard: React.FC<SkillCardProps> = ({
  title,
  description,
  image,
  href,
  className,
  animationDelay = 0,
}) => {
  const cardContent = (
    <div
      className={cn(
        "card group bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 p-6",
        className
      )}
    >
      <div className="mb-6 overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h2 className="text-xl font-bold mb-2 group-hover:text-yellow-400 transition-colors">
        {title}
      </h2>
      <p className="text-gray-300 leading-relaxed">{description}</p>
    </div>
  );

  if (href) {
    return (
      <CustomLink href={href} className="block">
        {cardContent}
      </CustomLink>
    );
  }

  return cardContent;
};

export default SkillCard;
