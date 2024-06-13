// --------------------------------------------------Sidebar------------------------------------------
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

// small banner at top
function closeBanner() {
  var banner = document.getElementById("banner");
  banner.style.display = "none";
}

// -----------right sidebar---------------------

function openSidebar() {
  document.getElementById("sidebar").classList.add("open");
}

function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
}

// ----------------------------Hero slider--------------------------------

let currentIndex = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  if (index >= totalSlides) {
    currentIndex = 0;
  } else if (index < 0) {
    currentIndex = totalSlides - 1;
  } else {
    currentIndex = index;
  }
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentIndex)}%)`;
  });
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

document.addEventListener("DOMContentLoaded", () => {
  showSlide(currentIndex);
  setInterval(nextSlide, 5000); // Change slide every 4 seconds
});

// --------------- Back to Top btn -------------------------

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("backToTop").style.display = "block";
  } else {
    document.getElementById("backToTop").style.display = "none";
  }
}

function scrollToTop() {
  const scrollToTopBtn = document.documentElement || document.body;
  scrollToTopBtn.scrollIntoView({
    behavior: "smooth",
  });
}
