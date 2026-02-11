const sortingButtons = document.querySelectorAll('.sorting-button');
const cardsContainer = document.querySelector('.product-section__wrap');
const originalCards = Array.from(document.querySelectorAll('.product-card'));
const pagesBlock = document.querySelector('.product-pages'); // <-- добавили

sortingButtons.forEach(button => {
  button.addEventListener('click', () => {

    sortingButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const type = button.textContent.trim();
    let sortedCards = [...originalCards];

    if (type === 'Рейтинг') {
      sortedCards.sort((a, b) => getRating(b) - getRating(a));
    }

    if (type === 'Дешеві') {
      sortedCards.sort((a, b) => getPrice(a) - getPrice(b));
    }

    if (type === 'Дорогі') {
      sortedCards.sort((a, b) => getPrice(b) - getPrice(a));
    }

    if (type === 'Новинки') {
      sortedCards.sort((a, b) => {
        const aNew = a.querySelector('.product-card__new') ? 1 : 0;
        const bNew = b.querySelector('.product-card__new') ? 1 : 0;
        return bNew - aNew;
      });
    }

    if (type === 'За замовчуванням') {
      sortedCards = [...originalCards];
    }

    // --- ВАЖНО: временно убираем пагинацию ---
    cardsContainer.removeChild(pagesBlock);

    // очищаем карточки
    cardsContainer.innerHTML = '';

    // вставляем отсортированные карточки
    sortedCards.forEach(card => cardsContainer.appendChild(card));

    // возвращаем пагинацию
    cardsContainer.appendChild(pagesBlock);
  });
});

function getPrice(card) {
  const priceText = card.querySelector('.product-card__description span')?.textContent || '0';
  return parseInt(priceText);
}

function getRating(card) {
  return card.querySelectorAll('img[src*="Star_yellow"]').length;
}
