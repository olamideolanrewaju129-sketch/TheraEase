const title = document.querySelector('.section-title');
const images = document.querySelectorAll('.about-image');
const texts = document.querySelectorAll('.about-text');

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.8;
  
  const titleTop = title.getBoundingClientRect().top;
  if (titleTop < triggerBottom) title.classList.add('show');
  
  images.forEach((img, i) => {
    const imgTop = img.getBoundingClientRect().top;
    const textTop = texts[i].getBoundingClientRect().top;
    if (imgTop < triggerBottom) img.classList.add('show');
    if (textTop < triggerBottom) texts[i].classList.add('show');
  });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();






const filterButtons = document.querySelectorAll("[data-filter]");
const tiles = document.querySelectorAll(".tile");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-filter");

    tiles.forEach(tile => {
      const tileCategory = tile.getAttribute("data-category");

      if (category === "all" || category === tileCategory) {
        tile.style.display = "block"; 
      } else {
        tile.style.display = "none"; 
      }
    });
  });
});






const elements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));






const filterBtns = document.querySelectorAll(".filter-btn");
const therapistTiles = document.querySelectorAll(".tile");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // update active state
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filter = btn.getAttribute("data-filter");

    therapistTiles.forEach(tile => {
      const category = tile.getAttribute("data-category");

      if (filter === "all" || filter === category) {
        tile.classList.remove("hide");
      } else {
        tile.classList.add("hide");
      }
    });
  });
});






window.addEventListener('load', () => {
// Animate title - slides from top
const title = document.getElementById('mainTitle');
setTimeout(() => {
title.classList.add('animate');
}, 100);

// Animate header section - slides from bottom
const headerSection = document.getElementById('headerSection');
setTimeout(() => {
headerSection.classList.add('animate');
}, 200);


// 1st: left, 2nd: down, 3rd: up, 4th: right
const cards = document.querySelectorAll('.tile');
cards.forEach((card) => {
const delay = parseFloat(card.dataset.delay) * 1000;
setTimeout(() => {
card.classList.add('animate');
}, delay);
});
});





// slider

const slider = document.getElementById("resourceSlider");
const btnLeft = document.querySelector(".slide-btn.left");
const btnRight = document.querySelector(".slide-btn.right");

btnLeft.addEventListener("click", () => {
    slider.scrollLeft -= 350;
});

btnRight.addEventListener("click", () => {
    slider.scrollLeft += 350;
});




// FILTER BUTTONS
const filters = document.querySelectorAll(".filter-btnn");
const cards = document.querySelectorAll(".resource-card");

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const category = btn.dataset.filter;

        cards.forEach(card => {
            if (category === "all" || card.dataset.category === category) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
  })





// SEARCH BAR
document.getElementById("searchInput").addEventListener("keyup", () => {
    let value = searchInput.value.toLowerCase();

    cards.forEach(card => {
        let text = card.innerText.toLowerCase();
        card.style.display = text.includes(value) ? "block" : "none";
    });
});





// SCROLL ANIMATIONS
const revealElements = document.querySelectorAll(".section-title, .resource-card");

const observerr = new IntersectionObserverr(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
});

revealElements.forEach(el => observer.observe(el));






  
