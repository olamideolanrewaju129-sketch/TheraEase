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





// (function () {
//   const buttons = document.querySelectorAll('.filter-btn');
//   const tiles = Array.from(document.querySelectorAll('.masonry-grid .tile'));

//   function setActiveBtn(clicked) {
//     buttons.forEach(b => b.classList.remove('active'));
//     clicked.classList.add('active');
//   }

//   function showTile(tile) {
//     tile.classList.remove('hidden');
//     // ensure visible for transition: remove display none if set
//     tile.style.display = '';
//     // force reflow to allow transition
//     void tile.offsetWidth;
//     tile.style.opacity = '';
//     tile.style.transform = '';
//   }

//   function hideTile(tile) {
//     // add hidden to animate opacity/transform
//     tile.classList.add('hidden');
//     // after transition ends, set display none to remove from flow (keeps grid tidy)
//     tile.addEventListener('transitionend', function onEnd(e) {
//       if (e.propertyName === 'opacity' && tile.classList.contains('hidden')) {
//         tile.style.display = 'none';
//         tile.removeEventListener('transitionend', onEnd);
//       }
//     });
//   }

//   function filterTiles(filter) {
//     tiles.forEach(tile => {
//       const cat = tile.getAttribute('data-category');
//       if (filter === 'all' || cat === filter) {
//         // if previously display none, reset it and animate in
//         if (tile.style.display === 'none') {
//           tile.style.display = '';
//         }
//         // tiny delay so items don't all jump at once (keeps it smooth)
//         setTimeout(() => showTile(tile), 10);
//       } else {
//         hideTile(tile);
//       }
//     });
//   }

//   // attach handlers
//   buttons.forEach(btn => {
//     btn.addEventListener('click', () => {
//       const filter = btn.dataset.filter;
//       setActiveBtn(btn);
//       filterTiles(filter);
//     });
//   });
// })();




 const buttons = document.querySelectorAll('.filter-buttons button');
  const tiles = document.querySelectorAll('.tile');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      tiles.forEach(tile => {
        tile.style.display =
          filter === 'all' || tile.classList.contains(filter)
            ? 'inline-block'
            : 'none';
      });
    });
  });







