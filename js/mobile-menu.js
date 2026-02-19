const mobileMenu = document.querySelector('.mobile-menu');
const menuBtnOpen = document.querySelector('.menu-btn-open');
const menuBtnClose = document.querySelector('.menu-btn-close');

function openMenu() {
  mobileMenu.classList.add('is-open');
  document.body.classList.add('is-scroll-disabled');
}

function closeMenu() {
  mobileMenu.classList.remove('is-open');
  document.body.classList.remove('is-scroll-disabled');
}

menuBtnOpen.addEventListener('click', openMenu);
menuBtnClose.addEventListener('click', closeMenu);

// Закрытие по клику на фон
mobileMenu.addEventListener('click', (e) => {
  if (e.target === mobileMenu) {
    closeMenu();
  }
});

// Закрытие по ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});


// Закрывать меню при клике на любую ссылку внутри меню
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    closeMenu();
  });
});
