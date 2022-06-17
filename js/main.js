var btnBar = document.querySelector("#btn-bars");
var btnX = document.querySelector("#btn-x");
var navMenu = document.querySelector(".nav-menu");
btnBar.onclick = () => {
    navMenu.style.display ="flex";
    btnX.style.display ="block";
    btnBar.style.display="none";
}
btnX.onclick = () => {
    navMenu.style.display ="none";
    btnX.style.display ="none";
    btnBar.style.display="block";
}
window.onscroll = function() {myFunction()};
var nav = document.querySelector(".nav");
var sticky = nav.offsetHeight;
function myFunction() {
  if (window.pageYOffset >= sticky) {
    nav.classList.add("sticky")
  } else {
    nav.classList.remove("sticky");
  }
}


let autoIndex = 0;
autoSlides();

function autoSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  autoIndex++;
  if (autoIndex > slides.length) {autoIndex = 1}    

  slides[autoIndex-1].style.display = "block";  
   setTimeout(autoSlides, 5000);
}
let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
  let text1 =document.getElementsByClassName("text")[0];
  text1.style.transform = "scale(1)";
  let text2 =document.getElementsByClassName("text")[1];
  text2.style.transform = "scale(1)";
}
function show(){
   var email = document.querySelector('#email').value;
  if(email==''){
    alert('Please enter a valid email');
    return false;
  }else{
    alert("You submited successfully!");
    return true;
  }
}
function checkout(){
   var checkoutModal = document.querySelector(".checkout");
   var form = document.querySelector(".form");
   alert("Order successfully ! Please waiting your order");
   checkoutModal.style.display = "none";
   form.reset()
}