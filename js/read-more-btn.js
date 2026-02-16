document.addEventListener("click", function(e) {
  if (!e.target.classList.contains("read-more-btn")) return;

  const block = e.target.closest(".advantages-section__block__text");
  const hidden = block.querySelector(".advantages-section__block__text__hidden");

  hidden.classList.toggle("open");

  if (hidden.classList.contains("open")) {
    e.target.textContent = "Згорнути";
  } else {
    e.target.textContent = "Читати повністю";
  }
});
