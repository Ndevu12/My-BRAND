/**
 * Project Card Component
 * A reusable component for displaying project cards with consistent styling
 */

class ProjectCard extends HTMLElement {
  constructor() {
    super();
  }

  /**
   * Generate tech stack badges with appropriate colors
   * @param {Array} techStack - Array of tech stack items with name and color
   * @returns {string} - HTML for tech stack badges
   */
  generateTechBadges(techStack) {
    if (!techStack || !techStack.length) return '';
    
    return techStack.map(tech => {
      const colorClass = `bg-${tech.color}-600`;
      return `<span class="text-xs ${colorClass} px-2 py-1 rounded-full text-white">${tech.name}</span>`;
    }).join('\n');
  }

  /**
   * Render the project card
   * @param {Object} project - Project data object
   */
  render(project) {
    const techBadges = this.generateTechBadges(project.techStack);
    
    // Create the card HTML using the same structure as the original design
    this.innerHTML = `
      <div class="group bg-secondary rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        <div class="relative overflow-hidden h-60">
          <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <div class="p-4 w-full">
              <div class="flex gap-2 mb-2">
                ${techBadges}
              </div>
              <h4 class="font-bold text-white">Tech Stack</h4>
            </div>
          </div>
        </div>
        <div class="p-6">
          <h3 class="text-xl font-bold mb-2 text-yellow-400">${project.title}</h3>
          <p class="text-gray-300 mb-4">${project.description}</p>
          <div class="flex justify-between items-center mt-4">
            <a href="${project.caseStudyLink}" class="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-medium transition-colors">
              Case Study
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <div class="flex items-center gap-4">
              ${project.isLive ? `
                <a href="${project.liveLink}" target="_blank" class="inline-flex items-center gap-1 text-green-400 hover:text-green-300 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Live
                </a>
              ` : ''}
              <a href="${project.githubLink}" target="_blank" class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Called when element is connected to the DOM
   */
  connectedCallback() {
    // Get attributes passed to the component
    const id = this.getAttribute('id');
    const title = this.getAttribute('title');
    const description = this.getAttribute('description');
    const image = this.getAttribute('image');
    const caseStudyLink = this.getAttribute('case-study-link') || '#';
    const githubLink = this.getAttribute('github-link') || '#';
    const liveLink = this.getAttribute('live-link');
    const isLive = this.hasAttribute('is-live');
    
    // Parse tech stack from data-tech-stack attribute (JSON string)
    const techStackAttr = this.getAttribute('tech-stack');
    const techStack = techStackAttr ? JSON.parse(techStackAttr) : [];
    
    // If we have all required attributes, render the card
    if (title && description && image) {
      this.render({
        id,
        title,
        description,
        image,
        techStack,
        caseStudyLink,
        githubLink,
        liveLink,
        isLive
      });
    }
  }
}

// Define the custom element
customElements.define('project-card', ProjectCard);

export default ProjectCard;