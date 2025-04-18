/**
 * Projects Page Script
 * Handles dynamic rendering of project cards and category filtering
 * with load more functionality
 */

import projectsData from '../data/projectsData.js';
import '../components/projectCard.js';
import { createContentLoader } from '../utils/contentLoader.js';

// Configuration
const PROJECTS_PER_PAGE = 3; // Show 3 projects initially and on each "Load More" click
let contentLoader = null;

/**
 * Initialize the projects page
 */
function initializeProjectsPage() {
  const projectsContainer = document.getElementById('projects-container');
  const categoryButtons = document.querySelectorAll('.category-btn');
  
  if (!projectsContainer) {
    console.error('Projects container not found');
    return;
  }
  
  // Add a load more button after the projects container if it doesn't exist
  let loadMoreButton = document.getElementById('load-more-btn');
  if (!loadMoreButton) {
    const loadMoreContainer = document.createElement('div');
    loadMoreContainer.id = 'load-more-container';
    loadMoreContainer.className = 'text-center mt-10';
    loadMoreContainer.innerHTML = `
      <button id="load-more-btn" class="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition-colors inline-flex items-center">
        Load More
      </button>
    `;
    
    // Insert the load more button after the projects container
    projectsContainer.parentNode.insertBefore(loadMoreContainer, projectsContainer.nextSibling);
    loadMoreButton = document.getElementById('load-more-btn');
  }
  
  // Initialize the content loader
  contentLoader = createContentLoader({
    containerId: 'projects-container',
    buttonId: 'load-more-btn',
    items: projectsData,
    itemsPerPage: PROJECTS_PER_PAGE,
    renderItem: createProjectElement
  });
  
  if (contentLoader) {
    contentLoader.initialize();
  }
  
  // Set up category filtering
  if (categoryButtons) {
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        categoryButtons.forEach(btn => {
          btn.classList.remove('bg-yellow-500', 'text-black');
          btn.classList.add('bg-secondary', 'text-white');
        });
        
        button.classList.remove('bg-secondary', 'text-white');
        button.classList.add('bg-yellow-500', 'text-black');
        
        // Filter projects
        const category = button.getAttribute('data-category');
        
        if (category === 'All Projects') {
          contentLoader.resetFilter();
        } else {
          contentLoader.filterItems(project => project.category === category);
        }
      });
    });
  }
}

/**
 * Create a project element from project data
 * @param {Object} project - Project data object
 * @returns {HTMLElement} - The project card element
 */
function createProjectElement(project) {
  const projectCard = document.createElement('project-card');
  
  // Set all attributes from the project data
  projectCard.setAttribute('id', project.id);
  projectCard.setAttribute('title', project.title);
  projectCard.setAttribute('description', project.description);
  projectCard.setAttribute('image', project.image);
  projectCard.setAttribute('case-study-link', project.caseStudyLink);
  projectCard.setAttribute('github-link', project.githubLink);
  
  // Only add live link if the project is live
  if (project.isLive) {
    projectCard.setAttribute('live-link', project.liveLink);
    projectCard.setAttribute('is-live', 'true');
  }
  
  // Add tech stack as a JSON string
  projectCard.setAttribute('tech-stack', JSON.stringify(project.techStack));
  
  return projectCard;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjectsPage);

export { initializeProjectsPage };