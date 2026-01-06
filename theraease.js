const title = document.querySelector('.section-title');
const images = document.querySelectorAll('.about-image');
const texts = document.querySelectorAll('.about-text');

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.8;

  if (title) {
    const titleTop = title.getBoundingClientRect().top;
    if (titleTop < triggerBottom) title.classList.add('show');
  }

  images.forEach((img, i) => {
    const imgTop = img.getBoundingClientRect().top;
    if (imgTop < triggerBottom) img.classList.add('show');

    if (texts[i]) {
      const textTop = texts[i].getBoundingClientRect().top;
      if (textTop < triggerBottom) texts[i].classList.add('show');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();


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

const elements = document.querySelectorAll('.fade-in, .animate-down, .animate-up');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
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


// Resource Slider
const slider = document.getElementById("resourceSlider");
const btnLeft = document.querySelector(".slide-btn.left");
const btnRight = document.querySelector(".slide-btn.right");

if (slider && btnLeft && btnRight) {
  btnLeft.addEventListener("click", () => {
    slider.scrollLeft -= 350;
  });

  btnRight.addEventListener("click", () => {
    slider.scrollLeft += 350;
  });
}


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
const revealElements = document.querySelectorAll(".section-title, .resource-card");

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







