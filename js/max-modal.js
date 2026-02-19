const galleries = {
  noir: ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg"],
  modern: ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg"],
  loft: ["1.jpg","2.jpg","3.jpg","4.jpg"],
  ny: ["1.jpg","2.jpg"],
  grey: ["1.jpg","2.jpg"],
  traditional: ["1.jpg"],
  Bath: ["1.jpg"],
  Bedroom: ["1.jpg"],
  Paris: ["1.jpg"],
  Museum: ["1.jpg"],
  Hotel: ["1.jpg"],
  Pool: ["1.jpg"],
  wood: ["1.jpg"],
  cyberpunk: ["1.jpg"],
  fallout: ["1.jpg"]
};

// Variables
const modalmax = document.getElementById("backdrop-max");
const slidesContainer = document.querySelector(".backdrop-max__content__slides-container");
const thumbsContainer = document.querySelector(".thumbnails");
const counter = document.createElement("div");
counter.className = "backdrop-max__counter";
modalmax.querySelector(".backdrop-max__content").appendChild(counter);

let currentIndex = 0;
let currentImages = [];

// Opening card
document.querySelectorAll(".max-content-card").forEach(card => {
  card.addEventListener("click", () => {
    const key = card.dataset.gallery;
    openGallery(key);
  });
});

// Slider generation
function openGallery(key) {
  currentImages = galleries[key];
  currentIndex = 0;

  slidesContainer.innerHTML = "";
  thumbsContainer.innerHTML = "";

  currentImages.forEach((img, index) => {
    // слайд
    slidesContainer.insertAdjacentHTML("beforeend", `
      <div class="maxslides">
        <img class="max-images"
             src="./images/Max/${key}-apartment/${img}">
      </div>
    `);

    // превью
    thumbsContainer.insertAdjacentHTML("beforeend", `
      <img class="demo"
           src="./images/Max/${key}-apartment/${img.replace(".jpg","-preview.jpg")}"
           data-index="${index}">
    `);
  });

  showSlide(0);
  updateSingleImageMode();
  updateCounter();   // <--- добавлено, чтобы сразу скрыть превью и показать счётчик
  modalmax.classList.add("open");
}


// Navigation
function showSlide(index) {
  const slides = document.querySelectorAll(".maxslides");
  const thumbs = document.querySelectorAll(".demo");

  if (index < 0) index = slides.length - 1;
  if (index >= slides.length) index = 0;

  slides.forEach(s => s.style.display = "none");
  thumbs.forEach(t => t.classList.remove("active"));

  slides[index].style.display = "flex";
  if (thumbs[index]) thumbs[index].classList.add("active");

  currentIndex = index;
  updateCounter();
}

// Buttons
document.querySelector(".next").onclick = () => showSlide(currentIndex + 1);
document.querySelector(".prev").onclick = () => showSlide(currentIndex - 1);

thumbsContainer.addEventListener("click", e => {
  if (e.target.classList.contains("demo")) {
    showSlide(+e.target.dataset.index);
  }
});

// Closing modalmax
document.getElementById("lightboxClose").onclick = () => {
  modalmax.classList.remove("open");
};

// Проверка количества слайдов и скрытие стрелок/превью
function updateSingleImageMode() {
  const slides = document.querySelectorAll(".maxslides");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const thumbsRow = document.querySelector(".backdrop-max__content__row");
  const mainImage = slides[currentIndex]?.querySelector(".max-images");

  if (slides.length <= 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    thumbsRow.style.display = "none";
    counter.style.display = "none";

    if (mainImage) {
      mainImage.style.height = "85vh";
      mainImage.style.maxWidth = "95%";
    }
  } else {
    prevBtn.style.display = "";
    nextBtn.style.display = "";
    thumbsRow.style.display = "";
    if (mainImage) {
      mainImage.style.height = "";
      mainImage.style.maxWidth = "";
    }
  }
}

// Счётчик вместо миниатюр при ширине <900px
function updateCounter() {
  if (window.innerWidth < 900 && currentImages.length > 1) {
    counter.style.display = "block";
    counter.textContent = `${currentIndex + 1}/${currentImages.length}`;
    thumbsContainer.style.display = "none";
  } else {
    counter.style.display = "none";
    thumbsContainer.style.display = currentImages.length > 1 ? "" : "none";
  }
}

// Свайп на мобильных
let touchStartX = 0;
let touchEndX = 0;

slidesContainer.addEventListener("touchstart", e => {
  touchStartX = e.changedTouches[0].screenX;
});

slidesContainer.addEventListener("touchend", e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      showSlide(currentIndex + 1);
    } else {
      showSlide(currentIndex - 1);
    }
  }
}
