(function () {
  const track = document.querySelector('.reviews-slider-track');
  const originalSlides = Array.from(document.querySelectorAll('.reviews-slide'));
  const btnPrev = document.querySelector('.reviews-arrow-button--prev');
  const btnNext = document.querySelector('.reviews-arrow-button-next');
  const pagination = document.querySelector('.reviews-pagination');

  const totalSlides = originalSlides.length;
  let currentIndex = 0;

  // --- CLONE for infinite loop ---
  originalSlides.forEach(slide => {
    track.appendChild(slide.cloneNode(true));
  });
  originalSlides.forEach(slide => {
    track.insertBefore(slide.cloneNode(true), track.firstChild);
  });

  let allSlides = Array.from(document.querySelectorAll('.reviews-slide'));

  // --- PAGINATION (always 4 dots) ---
  function createDots() {
    pagination.innerHTML = '';
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('div');
      dot.className = 'reviews-dot';
      dot.dataset.index = i;
      pagination.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = document.querySelectorAll('.reviews-dot');
    dots.forEach(dot => dot.classList.remove('active'));

    let page = ((currentIndex % totalSlides) + totalSlides) % totalSlides;
    dots[page].classList.add('active');
  }

  createDots();
  updateDots();

  // --- POSITIONING ---
  function getSlideWidth() {
    return allSlides[0].offsetWidth;
  }

  function updateSlider(animate = true) {
    const slideWidth = getSlideWidth();
    const offset = -(totalSlides * slideWidth + currentIndex * slideWidth);

    track.style.transition = animate ? 'transform 0.35s ease' : 'none';
    track.style.transform = `translateX(${offset}px)`;

    updateDots();
  }

  // initial position
  updateSlider(false);

  // --- LOOP FIX ---
  track.addEventListener('transitionend', () => {
    if (currentIndex >= totalSlides) {
      currentIndex = 0;
      updateSlider(false);
    }
    if (currentIndex < 0) {
      currentIndex = totalSlides - 1;
      updateSlider(false);
    }
  });

  // --- BUTTONS ---
  btnNext.addEventListener('click', () => {
    currentIndex++;
    updateSlider();
  });

  btnPrev.addEventListener('click', () => {
    currentIndex--;
    updateSlider();
  });

  // --- DOT CLICK ---
  pagination.addEventListener('click', (e) => {
    if (!e.target.classList.contains('reviews-dot')) return;
    currentIndex = Number(e.target.dataset.index);
    updateSlider();
  });

  // --- SWIPE ---
  let startX = 0;
  let isDragging = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;

    if (diff > 50) {
      currentIndex--;
      updateSlider();
      isDragging = false;
    }

    if (diff < -50) {
      currentIndex++;
      updateSlider();
      isDragging = false;
    }
  });

  track.addEventListener('touchend', () => {
    isDragging = false;
  });

  // --- RESIZE ---
  window.addEventListener('resize', () => {
    updateSlider(false);
  });
})();
