const backdropPhotoshop = document.getElementById("backdrop-photoshop");
const afterImage = document.getElementById("after-image");
const beforeImage = document.getElementById("before-image");
const lightboxClose = document.getElementById("lightboxClose");
const imageWrapper = document.getElementById("modal-image-wrapper");
const beforeToggle = document.getElementById("before-toogle-btn");

// Функции переключения before/after
function showBefore() {
  imageWrapper.classList.add("show-before");
}

function hideBefore() {
  imageWrapper.classList.remove("show-before");
}

// Обработчики мыши и тача
["mousedown", "touchstart"].forEach(evt =>
  beforeToggle.addEventListener(evt, (e) => {
    e.preventDefault();
    showBefore();
  })
);

["mouseup", "mouseleave", "touchend", "touchcancel"].forEach(evt =>
  beforeToggle.addEventListener(evt, hideBefore)
);

// Основная логика открытия модалки
document.querySelectorAll(".thumb").forEach((thumb) => {
  thumb.addEventListener("click", () => {
    const afterSrc = thumb.getAttribute("data-after");
    const beforeSrc = thumb.getAttribute("data-before");

    // Закрываем модалку, пока грузятся новые изображения
    backdropPhotoshop.classList.remove("open");

    // Очищаем src, чтобы не мигало старое изображение
    afterImage.src = "";
    beforeImage.src = "";

    // Создаём объекты Image для фоновой загрузки
    const imgAfter = new Image();
    const imgBefore = new Image();

    imgAfter.src = afterSrc;
    imgBefore.src = beforeSrc;

    // Ждём, пока оба изображения полностью загрузятся
    Promise.all([
      imgAfter.decode().catch(() => {}),
      imgBefore.decode().catch(() => {})
    ]).then(() => {
      // Теперь подставляем src в реальные img
      afterImage.src = afterSrc;
      beforeImage.src = beforeSrc;

      // Если у превью есть класс hide — отключаем переключатель
      if (thumb.classList.contains("hide")) {
        imageWrapper.classList.add("disable-toggle");
      } else {
        imageWrapper.classList.remove("disable-toggle");
      }

      // Открываем модалку
      backdropPhotoshop.classList.add("open");
    });
  });
});

// Закрытие модалки
lightboxClose.addEventListener("click", () => {
  backdropPhotoshop.classList.remove("open");
});

// Закрытие по клику на фон
backdropPhotoshop.addEventListener("click", (e) => {
  if (e.target === backdropPhotoshop) {
    backdropPhotoshop.classList.remove("open");
  }
});
