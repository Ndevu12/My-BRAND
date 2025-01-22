document.addEventListener("DOMContentLoaded", () => {

  const sections = document.querySelectorAll(".skills-section");
  if (sections.length > 0) {
    sections.forEach((section, index) => {
      setTimeout(() => {
        section.setAttribute("data-animate", section.dataset.effect);
      }, index * 500); 
    });
  }

  const cards = document.querySelectorAll(".card");
  if (cards.length > 0) {
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.setAttribute("data-animate", card.dataset.effect);
      }, index * 200); 
    });
  }
});
