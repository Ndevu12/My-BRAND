/**
 * Experience Page Script
 * Renders experience cards dynamically using the experience data module
 */

import experienceData from '../data/experienceData.js';
import '../components/experienceCard.js';

/**
 * Initialize the experience page
 * Creates and renders experience cards using the component
 */
function initializeExperiencePage() {
  const experienceContainer = document.getElementById('experience-container');
  
  if (!experienceContainer) {
    console.error('Experience container element not found');
    return;
  }
  
  // Clear any existing content
  experienceContainer.innerHTML = '';
  
  // Create and append experience cards
  experienceData.forEach(experience => {
    const experienceCard = document.createElement('experience-card');
    
    // Set attributes from experience data
    experienceCard.setAttribute('id', experience.id);
    experienceCard.setAttribute('title', experience.title);
    experienceCard.setAttribute('period', experience.period);
    experienceCard.setAttribute('location', experience.location);
    experienceCard.setAttribute('description', experience.description);
    experienceCard.setAttribute('tags', experience.tags.join(','));
    experienceCard.setAttribute('tag-colors', experience.tagColors.join(','));
    experienceCard.setAttribute('image', experience.image);
    experienceCard.setAttribute('link', experience.link);
    experienceCard.setAttribute('link-text', experience.linkText);
    
    // Append to container
    experienceContainer.appendChild(experienceCard);
  });
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeExperiencePage);

// Export for potential use in other modules
export { initializeExperiencePage };