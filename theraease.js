/* ==========================
   ABOUT SECTION ANIMATIONS
   (Re-triggers on scroll)
   ========================== */
const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show'); // Remove class to re-trigger animation
    }
  });
}, {
  threshold: 0.1 // Trigger when 10% of the element is visible
});

const aboutElements = document.querySelectorAll('.section-title, .about-image, .about-text');
aboutElements.forEach(el => aboutObserver.observe(el));


/* ==========================
   UNIFIED FILTERING LOGIC
   ========================== */

/**
 * Sets up filtering for a group of buttons and target items.
 * @param {string} btnContainerSelector - Selector for the container of filter buttons
 * @param {string} itemSelector - Selector for the items to be filtered
 */
function setupFilter(btnContainerSelector, itemSelector) {
  const container = document.querySelector(btnContainerSelector);
  if (!container) return;

  const buttons = container.querySelectorAll('.modern-filter-btn');
  const items = document.querySelectorAll(itemSelector);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons in this group
      buttons.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      items.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        // Show if 'all' or matches category
        if (filterValue === 'all' || filterValue === itemCategory) {
          item.style.display = ''; // Reverts to CSS default (block/flex/grid-item)
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Initialize filters when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Services Section
  setupFilter('.filter-buttons', '.service-cards .card');

  // Therapists Section
  setupFilter('.therapist-filters', '.therapist-grid .therapist-card');

  // Resources Section
  setupFilter('.filters', '.resource-card');
});


/* ==========================
   OTHER ANIMATIONS & UTILS
   ========================== */

const elements = document.querySelectorAll('.fade-in, .animate-down, .animate-up, .slide-in-left');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));


window.addEventListener('load', () => {
  // Animate title - slides from top
  const title = document.getElementById('mainTitle');
  if (title) {
    setTimeout(() => {
      title.classList.add('animate');
    }, 100);
  }

  // Animate header section - slides from bottom
  const headerSection = document.getElementById('headerSection');
  if (headerSection) {
    setTimeout(() => {
      headerSection.classList.add('animate');
    }, 200);
  }

  // 1st: left, 2nd: down, 3rd: up, 4th: right
  const cards = document.querySelectorAll('.tile');
  cards.forEach((card) => {
    const delay = parseFloat(card.dataset.delay) * 1000;
    setTimeout(() => {
      card.classList.add('animate');
    }, delay);
  });
});





// Search Bar Logic (Resource Section)
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();
    const resourceCards = document.querySelectorAll(".resource-card");

    resourceCards.forEach(card => {
      // Check h3 and p tags for text match
      let text = card.innerText.toLowerCase();
      card.style.display = text.includes(value) ? "" : "none";
    });
  });
}


// Scroll Animations (Extra)
const revealElements = document.querySelectorAll(".resource-card");

// Note: 'IntersectionObserverr' in original code was likely a typo. Fixed to IntersectionObserver elsewhere or checking existence.
// Assuming standart IntersectionObserver needs to be used here if distinct from line 53.
// But let's stick to the earlier observer if possible, or create a new valid one.
// The original code had `new IntersectionObserverr` (typo). I will fix it.

const scrollObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = "translateY(0)";
    }
  });
});

revealElements.forEach(el => scrollObserver.observe(el));








// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger-menu');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Optional: Toggle icon between bars and times (close)
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
}

// Close menu when a link is clicked
const navItems = document.querySelectorAll('.nav-links li a');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const icon = hamburger.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
});

// Animate Filter Buttons Staggered
const filterGroups = document.querySelectorAll('.filter-buttons, .therapist-filters, .filters');

filterGroups.forEach(group => {
  const buttons = group.querySelectorAll('button');
  buttons.forEach((btn, index) => {
    btn.classList.add('btn-animate');
    btn.style.animationDelay = `${index * 0.1}s`; // Stagger delay: 0s, 0.1s, 0.2s...
    observer.observe(btn);
  });
});
});
