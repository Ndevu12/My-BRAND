/**
 * Experience navigation utilities
 */

/**
 * Navigate to contact form
 */
export const navigateToContact = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/contactme";
  }
};

/**
 * Navigate to projects page
 */
export const navigateToProjects = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/projects";
  }
};

/**
 * Navigate to skills page
 */
export const navigateToSkills = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/skills";
  }
};

/**
 * Navigate to home page
 */
export const navigateToHome = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
};

/**
 * Navigate to about page
 */
export const navigateToAbout = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/about";
  }
};
