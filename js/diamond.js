// const diamond = document.querySelector('.header-nav__diamond');
// const navItems = document.querySelectorAll('.nav-item');

// navItems.forEach(item => {
//   item.addEventListener('mouseenter', () => {
//     const itemRect = item.getBoundingClientRect();
//     const navRect = document.querySelector('.header-nav').getBoundingClientRect();
//     const centerX = itemRect.left + itemRect.width / 2;
//     const offsetX = centerX - navRect.left - 5; // 5px = half diamond width
//     diamond.style.left = `${offsetX}px`;
//   });
// });

const diamond = document.querySelector('.header-nav__diamond');
const nav = document.querySelector('.header-nav');
const items = document.querySelectorAll('.nav-item');

// Находим кнопку "Портфоліо" как стартовую позицию
const defaultItem = items[0];

function moveDiamondTo(element) {
  const itemRect = element.getBoundingClientRect();
  const navRect = nav.getBoundingClientRect();
  const centerX = itemRect.left + itemRect.width / 2;
  const offsetX = centerX - navRect.left - 5; // 5px = половина ширины ромба
  diamond.style.left = `${offsetX}px`;
}

// При наведении — перемещаем ромб
items.forEach(item => {
  item.addEventListener('mouseenter', () => moveDiamondTo(item));
});

// Когда мышь уходит с меню — возвращаем ромб на Портфоліо
nav.addEventListener('mouseleave', () => moveDiamondTo(defaultItem));

// Устанавливаем стартовую позицию при загрузке
moveDiamondTo(defaultItem);

