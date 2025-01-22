/**
 * Experience Card Component
 * A reusable component for displaying professional experience cards
 * with consistent styling using Tailwind CSS
 */

import { createSquaredCardDescription } from '../utils/textUtils.js';

class ExperienceCard extends HTMLElement {
  constructor() {
    super();
    this.isExpanded = false;
  }

  /**
   * Generate tag colors based on the tag type
   * @param {string} color - Color type (blue, green, red, purple, etc.)
   * @returns {string} - CSS classes for the tag
   */
  getTagClasses(color) {
    const colorMap = {
      blue: 'bg-blue-500/20 text-blue-300',
      green: 'bg-green-500/20 text-green-300',
      red: 'bg-red-500/20 text-red-300',
      purple: 'bg-purple-500/20 text-purple-300',
      yellow: 'bg-yellow-500/20 text-yellow-300',
      orange: 'bg-orange-600/20 text-orange-400',
      cyan: 'bg-cyan-600/20 text-cyan-400',
      pink: 'bg-pink-600/20 text-pink-400'
    };
    
    return colorMap[color] || 'bg-gray-600/20 text-gray-400';
  }

  /**
   * Generate HTML for tags
   * @param {Array} tags - Array of tag names
   * @param {Array} colors - Array of tag colors
   * @returns {string} - HTML for tags
   */
  generateTags(tags, colors) {
    if (!tags || !tags.length) return '';
    
    return tags.map((tag, index) => {
      const colorClass = this.getTagClasses(colors[index] || 'gray');
      const marginClass = index > 0 ? 'ml-2' : '';
      return `<span class="inline-block ${colorClass} text-xs px-3 py-1 rounded-full ${marginClass}">${tag}</span>`;
    }).join('');
  }

  /**
   * Render the experience card with consistent dimensions
   * @param {Object} data - Experience data object
   */
  render(data) {
    // Process description for consistent card height
    const processedDesc = createSquaredCardDescription(data.description);
    
    // Generate animation delay
    const animationDelay = (data.id * 0.2).toFixed(1);
    
    // Determine animation class based on id
    let animationClass = 'animate-fade-in';
    if (data.id % 3 === 1) animationClass = 'animate-fade-in';
    else if (data.id % 3 === 2) animationClass = 'animate-slide-in';
    else animationClass = 'animate-scale-up';

    // Create the card HTML using only Tailwind CSS classes
    this.innerHTML = `
      <div class="bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-[480px] opacity-0 ${animationClass} transform hover:-translate-y-2" 
           style="animation-delay: ${animationDelay}s;">
        
        <!-- Experience Image with Overlay -->
        <div class="h-[200px] overflow-hidden relative">
          <img src="${data.image}" alt="${data.title}" 
               class="w-full h-full object-cover transition-transform duration-700 hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent"></div>
          <div class="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">
            ${data.period}
          </div>
        </div>
        
        <!-- Content -->
        <div class="p-6 flex flex-col flex-grow">
          <div class="flex flex-wrap items-center mb-4 gap-2">
            ${this.generateTags(data.tags, data.tagColors)}
          </div>
          
          <h3 class="text-xl font-bold mb-3 hover:text-yellow-400 transition-colors">
            ${data.title}
          </h3>
          
          <div class="flex flex-col mb-4 flex-grow">
            <p class="experience-description text-base text-gray-300 mb-2 transition-all duration-300"
               data-full-description="${data.description}">
              ${processedDesc.truncatedText}
            </p>
            ${processedDesc.isTruncated ? 
              `<button class="text-sm text-yellow-400 hover:text-yellow-300 mt-1 self-start focus:outline-none toggle-description">
                Read more
              </button>` : ''
            }
          </div>
          
          <div class="mt-auto flex items-center justify-between">
            <span class="text-sm text-gray-400">${data.location}</span>
            <a href="${data.link}" target="_blank" class="flex items-center text-yellow-400 hover:text-yellow-300 transition-colors">
              ${data.linkText}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    `;

    // Add event listeners after rendering
    this.addEventListeners();
  }

  /**
   * Add event listeners to toggle description
   */
  addEventListeners() {
    const toggleButton = this.querySelector('.toggle-description');
    if (toggleButton) {
      toggleButton.addEventListener('click', () => {
        const descriptionEl = this.querySelector('.experience-description');
        const fullDescription = descriptionEl.getAttribute('data-full-description');
        
        if (!this.isExpanded) {
          // Expand description
          descriptionEl.textContent = fullDescription;
          toggleButton.textContent = 'Read less';
          this.isExpanded = true;
        } else {
          // Collapse description
          const processedDesc = createSquaredCardDescription(fullDescription);
          descriptionEl.textContent = processedDesc.truncatedText;
          toggleButton.textContent = 'Read more';
          this.isExpanded = false;
        }
      });
    }
  }

  /**
   * Called when element is connected to the DOM
   */
  connectedCallback() {
    // Get attributes passed to the component
    const id = this.getAttribute('id');
    const title = this.getAttribute('title');
    const period = this.getAttribute('period');
    const location = this.getAttribute('location');
    const description = this.getAttribute('description');
    const tags = this.getAttribute('tags')?.split(',') || [];
    const tagColors = this.getAttribute('tag-colors')?.split(',') || [];
    const image = this.getAttribute('image');
    const link = this.getAttribute('link');
    const linkText = this.getAttribute('link-text');

    // If we have all required attributes, render the card
    if (id && title && description && image) {
      this.render({
        id: parseInt(id, 10),
        title,
        period,
        location,
        description,
        tags,
        tagColors,
        image,
        link,
        linkText
      });
    }
  }
}

// Define the custom element
customElements.define('experience-card', ExperienceCard);

export default ExperienceCard;