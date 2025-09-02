import Typography from "@/components/atoms/Typography";
import { projectCategories } from "@/lib/projectData";

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-16">
      {projectCategories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 transform hover:scale-105 ${
            activeCategory === category
              ? "bg-yellow-500 text-black hover:bg-yellow-400 shadow-lg shadow-yellow-500/30"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-secondary dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
        >
          <Typography variant="span" className="font-medium">
            {category}
          </Typography>
        </button>
      ))}
    </div>
  );
}
