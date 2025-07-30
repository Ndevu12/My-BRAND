import { BlogCategory } from "@/types/blog";

interface CategoryTabsProps {
  categories: BlogCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="bg-gray-100/50 dark:bg-gray-800/50 py-4 sticky top-16 z-10 backdrop-blur-sm border-y border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-6xl mx-auto px-4">
        <div
          className="flex gap-2 md:gap-4 justify-start md:justify-center min-w-max overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-500 scrollbar-track-transparent snap-x snap-mandatory"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {categories?.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap snap-center ${
                activeCategory === category.id
                  ? "bg-yellow-500 text-black shadow-lg scale-105"
                  : "bg-white/70 dark:bg-gray-700/70 text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-gray-600 hover:scale-105"
              }`}
              tabIndex={0}
            >
              <i className={`fas fa-${category.icon} mr-2`}></i>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
