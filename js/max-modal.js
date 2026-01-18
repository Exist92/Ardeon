const galleries = {
  noir: [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg",
    "7.jpg"
  ],
  modern: [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg",
    "5.jpg",
    "6.jpg"
  ],
  loft: [
    "1.jpg",
    "2.jpg",
    "3.jpg",
    "4.jpg"
  ],
  ny: [
    "1.jpg",
    "2.jpg"
  ],
  grey: [
    "1.jpg",
    "2.jpg"
  ],
  traditional: [
    "1.jpg"
  ],
  Bath: [
    "1.jpg"
  ],
  Bedroom: [
    "1.jpg"
  ],
  Paris: [
    "1.jpg"
  ],
  Museum: [
    "1.jpg"
  ],
  Hotel: [
    "1.jpg"
  ],
  Pool: [
    "1.jpg"
  ],
  wood: [
    "1.jpg"
  ],
  cyberpunk: [
    "1.jpg"
  ],
  fallout: [
    "1.jpg"
  ]
};

// Variables

const modalmax = document.getElementById("backdrop-max");
const slidesContainer = document.querySelector(".maxslides-container");
const thumbsContainer = document.querySelector(".thumbnails");

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
  thumbs[index].classList.add("active");

  currentIndex = index;
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
  const thumbsRow = document.querySelector(".row-content");
  const mainImage = document.querySelector(".max-images");

  // Если слайдов меньше двух — включаем режим одиночного изображения
  if (slides.length <= 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
    thumbsRow.style.display = "none";

    // Увеличиваем изображение
    mainImage.style.height = "85vh";
    mainImage.style.maxWidth = "95%";
  } else {
    // Если слайдов больше одного — возвращаем всё обратно
    prevBtn.style.display = "";
    nextBtn.style.display = "";
    thumbsRow.style.display = "";
    mainImage.style.height = "";
    mainImage.style.maxWidth = "";
  }
}

