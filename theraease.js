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

const elements = document.querySelectorAll('.fade-in, .animate-down, .animate-up, .slide-in-left, .slide-in-right');

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



// FAQ Accordion Logic
const faqs = document.querySelectorAll('.faq-question');
faqs.forEach(faq => {
  faq.addEventListener('click', () => {
    const answer = faq.nextElementSibling;
    const icon = faq.querySelector('i');

    // Toggle active class
    faq.classList.toggle('active');

    // Toggle Answer visibility
    if (faq.classList.contains('active')) {
      answer.style.maxHeight = answer.scrollHeight + "px";
      icon.style.transform = "rotate(180deg)";
    } else {
      answer.style.maxHeight = "0";
      icon.style.transform = "rotate(0deg)";
    }
  });
});


/* ==========================
   CHECK AVAILABILITY LOGIC
   ========================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. HOME PAGE: Check Availability Click
  const checkBtn = document.getElementById('check-availability-btn');
  if (checkBtn) {
    checkBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const date = document.getElementById('hero-date').value;
      const type = document.getElementById('hero-session-type').value;
      const therapist = document.getElementById('hero-therapist').value;

      // Construct URL parameters
      const params = new URLSearchParams({
        date: date,
        type: type,
        therapist: therapist
      });

      // Redirect to availability page
      window.location.href = `/availability.html?${params.toString()}`;
    });
  }

  // 2. AVAILABILITY PAGE: Render Mock Results
  const availabilityMsg = document.getElementById('availability-message');
  const resultsContainer = document.getElementById('availability-results');

  if (availabilityMsg && resultsContainer) {
    const params = new URLSearchParams(window.location.search);
    const date = params.get('date');
    const type = params.get('type') || 'Online';
    const therapist = params.get('therapist') || 'Any Available';

    let displayDate = date ? new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Flexible Dates';

    availabilityMsg.innerHTML = `Showing results for <strong>${type}</strong> session with <strong>${therapist}</strong> on <br><strong>${displayDate}</strong>`;

    // Mock Data for slots
    const mockSlots = [
      { time: '09:00 AM', doctor: therapist === 'Any Available' ? 'Dr. Amelia Hart' : therapist },
      { time: '11:00 AM', doctor: therapist === 'Any Available' ? 'Dr. Michael Brooks' : therapist },
      { time: '02:00 PM', doctor: therapist === 'Any Available' ? 'Sarah Ojo' : therapist },
      { time: '04:30 PM', doctor: therapist === 'Any Available' ? 'Dr. Nathan Okoro' : therapist }
    ];

    // Generate Cards
    mockSlots.forEach(slot => {
      const card = document.createElement('div');
      card.className = 'slot-card';
      // Inline styles for simplicity, move to CSS for production
      card.style.cssText = 'background: var(--bg-secondary); padding: 25px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); text-align: center; border: 1px solid var(--border-color); transition: 0.3s;';

      card.innerHTML = `
        <div class="time" style="font-size: 1.4rem; color: var(--primary-color); font-weight: 700; margin-bottom: 10px;">${slot.time}</div>
        <div class="details" style="color: var(--text-secondary); margin-bottom: 20px;">
          <p style="font-weight:600; font-size: 1.1rem; margin-bottom: 5px;">${slot.doctor}</p>
          <p style="font-size: 0.9rem;">${type} Session</p>
        </div>
        <a href="#" class="btn book-slot-btn" data-time="${slot.time}" data-doctor="${slot.doctor}" 
           style="background: var(--primary-color); border-radius: 50px; display: inline-block; padding: 10px 25px; color: #fff; text-decoration: none;">Book Now</a>
      `;

      // Add hover effect via JS listener or CSS class 'slot-card:hover' in CSS file
      card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-5px)');
      card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');

      resultsContainer.appendChild(card);
    });

    // Handle "Book Now" click on availability page
    resultsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('book-slot-btn')) {
        e.preventDefault();
        const time = e.target.getAttribute('data-time');
        const doctor = e.target.getAttribute('data-doctor');

        // Redirect to Booking Page with all details
        const bookParams = new URLSearchParams({
          date: date || '',
          type: type,
          therapist: doctor, // Use specific doctor chosen
          time: time
        });
        window.location.href = `/book.html?${bookParams.toString()}`;
      }
    });

  }


  // 3. BOOKING PAGE: Pre-fill Form
  const bookingForm = document.querySelector('.booking-form');
  if (bookingForm) {
    const params = new URLSearchParams(window.location.search);

    const dateInput = document.getElementById('date');
    const typeInput = document.getElementById('session-type');
    const therapistInput = document.getElementById('therapist-select');
    // Note: If you have a time field in the future, pre-fill it too. 
    // Currently adding 'Time' to notes if no field exists or just leaving it.

    if (params.has('date') && dateInput) dateInput.value = params.get('date');
    if (params.has('type') && typeInput) {
      // Simple mapping if values match exactly
      // Lowercase comparison
      const typeVal = params.get('type').toLowerCase();
      Array.from(typeInput.options).forEach(opt => {
        if (opt.value.includes(typeVal) || typeVal.includes(opt.value)) {
          typeInput.value = opt.value;
        }
      });
    }

    if (params.has('therapist') && therapistInput) {
      const therapistVal = params.get('therapist');
      // Try to find matching option
      let found = false;
      Array.from(therapistInput.options).forEach(opt => {
        if (opt.text.includes(therapistVal) || therapistVal.includes(opt.text)) {
          therapistInput.value = opt.value;
          found = true;
        }
      });
    }

    // Optional: Add Time to message/notes if provided
    const messageInput = document.getElementById('message');
    if (params.has('time') && messageInput) {
      messageInput.value = `Requested Time: ${params.get('time')}\n` + messageInput.value;
    }

  }

});

/* ==========================
   THEME TOGGLE LOGIC (DARK MODE)
   ========================== */
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // 1. Check for saved theme in localStorage
  const savedTheme = localStorage.getItem('theme');

  // 2. Check for system preference if no saved theme
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    body.classList.add('dark-mode');
  }

  if (themeToggle) {
    // Initial icon check
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
      icon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');

      // Save preference
      localStorage.setItem('theme', isDark ? 'dark' : 'light');

      // Toggle icon
      if (isDark) {
        icon.classList.replace('fa-moon', 'fa-sun');
      } else {
        icon.classList.replace('fa-sun', 'fa-moon');
      }
    });
  }
});
