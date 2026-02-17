// --- элементы ---
const mobileOpenBtn = document.querySelector(
  '.catalog-hero-section__wrap__sorting__mobile__btn'
);
const mobileLabel = document.querySelector(
  '.catalog-hero-section__wrap__sorting__mobile p'
);
const sortingMenu = document.querySelector('.sorting-menu');
const sortingMenuFrame = document.querySelector('.sorting-menu__frame');
const mobileSortingButtons = document.querySelectorAll('.sorting-mobile-btn');

// --- открыть меню ---
mobileOpenBtn.addEventListener('click', () => {
  sortingMenu.classList.add('open');
});

// --- закрытие по клику вне блока ---
sortingMenu.addEventListener('click', e => {
  if (!sortingMenuFrame.contains(e.target)) {
    sortingMenu.classList.remove('open');
  }
});

// --- логика сортировки (используем существующую) ---
function applySorting(type) {
  const desktopButtons = document.querySelectorAll('.sorting-button');

  desktopButtons.forEach(btn => {
    if (btn.textContent.trim() === type) {
      btn.click(); // ← используем уже существующую сортировку
    }
  });
}

// --- выбор пункта в мобильном меню ---
mobileSortingButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const type = btn.textContent.trim();

    // обновляем текст возле мобильной кнопки
    mobileLabel.textContent = type;

    // подсветка выбранного пункта
    mobileSortingButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // применяем сортировку
    applySorting(type);

    // закрываем меню
    sortingMenu.classList.remove('open');
  });
});
