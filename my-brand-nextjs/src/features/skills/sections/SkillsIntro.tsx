import Typography from "@/components/atoms/Typography";

export function SkillsIntro() {
  return (
    <section className="mb-20 text-center">
      <Typography
        variant="h1"
        className="mb-8 leading-tight text-4xl md:text-6xl font-bold"
      >
        My{" "}
        <span className="text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text">
          Expertise
        </span>
      </Typography>

      <div className="max-w-4xl mx-auto">
        <Typography
          variant="p"
          className="text-gray-600 dark:text-gray-300 text-lg md:text-xl leading-relaxed mb-6"
        >
          Welcome to my skills showcase! Here you'll find a comprehensive
          overview of my technical capabilities, project management approach,
          and entrepreneurial mindset.
        </Typography>
        <Typography
          variant="p"
          className="text-gray-500 dark:text-gray-400 text-base md:text-lg"
        >
          Each section highlights the tools and technologies I've mastered to
          deliver exceptional digital solutions that drive innovation and create
          meaningful impact.
        </Typography>
      </div>
    </section>
  );
}
