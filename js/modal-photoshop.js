const backdropPhotoshop = document.getElementById("backdrop-photoshop");
const afterImage = document.getElementById("after-image");
const beforeImage = document.getElementById("before-image");
const lightboxClose = document.getElementById("lightboxClose")
const imageWrapper = document.getElementById("modal-image-wrapper");
const beforeToggle = document.getElementById("before-toogle-btn");


document.querySelectorAll(".thumb").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const afterSrc = thumb.getAttribute("data-after");
    const beforeSrc = thumb.getAttribute("data-before");

    afterImage.src = afterSrc;
    beforeImage.src = beforeSrc;

    // ПРОВЕРКА: если у превью есть класс hide, 
    // добавляем класс-запрет на обертку в модалке
    if (thumb.classList.contains("hide")) {
      imageWrapper.classList.add("disable-toggle");
    } else {
      imageWrapper.classList.remove("disable-toggle");
    }

    backdropPhotoshop.classList.add("open");
  });
});

lightboxClose.addEventListener("click", () => {
  backdropPhotoshop.classList.remove("open");
});

backdropPhotoshop.addEventListener("click", (e) => {
  if (e.target === backdropPhotoshop) {
    backdropPhotoshop.classList.remove("open");
  }
});

function showBefore() {
  imageWrapper.classList.add("show-before");
}

function hideBefore() {
  imageWrapper.classList.remove("show-before");
}

beforeToggle.addEventListener("mousedown", showBefore);
beforeToggle.addEventListener("mouseup", hideBefore);
beforeToggle.addEventListener("mouseleave", hideBefore);

beforeToggle.addEventListener("touchstart", (e) => {
  e.preventDefault();
  showBefore();
});

beforeToggle.addEventListener("touchend", hideBefore);
beforeToggle.addEventListener("touchcancel", hideBefore);

