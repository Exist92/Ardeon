// open backdrop


const backrdropmax = document.getElementById("backdrop-max");
const lightboxClose = document.getElementById("lightboxClose")

document.querySelectorAll(".maxopen").forEach((maxopen) => {
  maxopen.addEventListener("click", () => {
    backrdropmax.classList.add("open");
  });  
});

lightboxClose.addEventListener("click", () => {
  backrdropmax.classList.remove("open");
});


// // Open the Modal
// function openModal() {
//   document.getElementById("backdrop-max").style.display = "flex";
// }

// // Close the Modal
// function closeModal() {
//   document.getElementById("backdrop-max").style.display = "none";
// }

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("maxslides");
  var dots = document.getElementsByClassName("demo");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "flex";
  dots[slideIndex-1].className += " active";
}

