// --------------------------------------------------Sidebar------------------------------------------
function openNav() {
  const sidePanel = document.getElementById("mysidepanel");
  if (sidePanel) {
    sidePanel.style.left = "0";
  } else {
    console.error("sidepanel not found");
  }
}
function closeNav() {
  const sidePanel = document.getElementById("mysidepanel");
  if (sidePanel) {
    sidePanel.style.left = "-320px";
  }
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
