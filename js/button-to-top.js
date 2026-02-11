let mybutton = document.getElementById("myBtnTop");


window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 900 || document.documentElement.scrollTop > 900) {
    mybutton.style.display = "flex";
  } else {
    mybutton.style.display = "none";
  }
}


function topFunction() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
}
