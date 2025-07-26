import Typography from "@/components/atoms/Typography";

export function ProjectsHero() {
  return (
    <section className="text-center mb-20">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-yellow-400/20 dark:bg-yellow-400/10 backdrop-blur-sm border border-yellow-400/40 dark:border-yellow-400/20 rounded-full px-6 py-3 mb-6">
        <div className="w-2 h-2 bg-yellow-500 dark:bg-yellow-400 rounded-full animate-pulse" />
        <Typography
          variant="small"
          className="text-yellow-600 dark:text-yellow-400 font-medium"
        >
          Portfolio Showcase
        </Typography>
      </div>

      {/* Title */}
      <Typography
        variant="h1"
        className="mb-6 text-4xl md:text-6xl font-bold leading-tight text-gray-900 dark:text-white"
      >
        Featured{" "}
        <span className="text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text">
          Projects
        </span>
      </Typography>

      {/* Description */}
      <div className="max-w-4xl mx-auto">
        <Typography
          variant="p"
          className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-6"
        >
          Explore my projects where innovation meets creativity. Each project
          represents a unique challenge solved through thoughtful design,
          efficient code, and attention to user experience.
        </Typography>
        <Typography
          variant="p"
          className="text-gray-500 dark:text-gray-400 text-base md:text-lg"
        >
          From full-stack web applications to mobile solutions, discover how I
          turn ideas into functional, beautiful digital products that make a
          real impact.
        </Typography>
      </div>
    </section>
  );
}
