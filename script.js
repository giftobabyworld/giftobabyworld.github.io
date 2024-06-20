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

// ---------------------dropdown---------------------------
// Select all dropdown elements
const dropdowns = document.querySelectorAll(".dropdown2");

// Loop through each dropdown
dropdowns.forEach((dropdown) => {
  const select = dropdown.querySelector(".select");
  const caret = dropdown.querySelector(".caret");
  const menu = dropdown.querySelector(".menu");
  const options = dropdown.querySelectorAll(".menu li");
  const selected = dropdown.querySelector(".selected");

  // Add event listener for the select box
  select.addEventListener("click", () => {
    select.classList.toggle("select-clicked");
    caret.classList.toggle("caret-rotate");
    menu.classList.toggle("menu-open");
  });

  // Add event listeners for each option
  options.forEach((option) => {
    option.addEventListener("click", () => {
      selected.innerText = option.innerText;
      select.classList.remove("select-clicked");
      caret.classList.remove("caret-rotate");
      menu.classList.remove("menu-open");
      options.forEach((option) => {
        option.classList.remove("active");
      });
      option.classList.add("active");
    });
  });
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

// -----------------Products slider---------------------------

const swiperEl = document.querySelector("swiper-container");
Object.assign(swiperEl, {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    clickable: true,
  },
  breakpoints: {
    "@0.00": {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    "@0.75": {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    "@1.00": {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    "@1.50": {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});

swiperEl.initialize();

// ----------------------------Brands slider----------------
const swiper2 = document.querySelector(".swiper2");
Object.assign(swiper2, {
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    clickable: true,
  },
  breakpoints: {
    "@0.00": {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    "@0.75": {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    "@1.00": {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    "@1.50": {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  },
});

swiper2.initialize();

// ----------------------------Hero slider----------------
document.addEventListener("DOMContentLoaded", (event) => {
  const swiper = new Swiper(".mySwiper3", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 2500, // 2.5 seconds
      disableOnInteraction: false,
    },
    loop: true,
  });
});

// ----------------------------------------------backend---------------------------------

// Get a reference to the database
var database = firebase.database();

// Fetch menu data from Firebase
var menuRef = database.ref("front");
menuRef.on("value", function (snapshot) {
  var menuData = snapshot.val();

  // Display menu data on the web page
  var menuContainer = document.getElementById("menu");
  menuContainer.innerHTML = "";

  for (var key in menuData) {
    if (menuData.hasOwnProperty(key)) {
      var menuItem = menuData[key];
      var menuItemElement = document.createElement("div");
      menuItemElement.innerHTML = `
            
            <button class="btn-package" onclick="redirectToUrl('${menuItem.name}')">
        <div class="packagesBox">
            <div class="image">
                <img src="${menuItem.image}" alt="${menuItem.name}" class="menu-image">
            </div>
            <div class="slider-content">  
                        <h2 class="multiline-ellipsis-2">${menuItem.name}</h2>
            </div>

                    
                </div>    
               
            </div>    
        </div> </button>
`;

      menuContainer.appendChild(menuItemElement);
    }
  }
});
function redirectToUrl(itemName) {
  // Save itemName to localStorage
  localStorage.setItem("itemid", itemName);

  var url = "/frontproduct.html";
  window.location.href = url;
}
function fetchButtonsFromFirebase() {
  const navbar = document.getElementById("navbar");

  // Reference to your Firebase data for main buttons
  const mainButtonsRef = database.ref("mainButtons");

  // Fetch the main buttons data once
  mainButtonsRef.once("value", (mainSnapshot) => {
    mainSnapshot.forEach((mainChildSnapshot) => {
      // Get main button data
      const mainButtonData = mainChildSnapshot.val();
      const mainButtonName = mainButtonData.name;
      const mainButtonLink = mainButtonData.link;

      // Create a new <div> element for the main button in the navbar
      const mainButtonElement = document.createElement("div");
      mainButtonElement.textContent = mainButtonName;
      mainButtonElement.className = "main-button";

      // Create a container for sub-buttons
      const subButtonsContainer = document.createElement("div");
      subButtonsContainer.className = "sub-buttons-container";

      // Reference to sub-buttons under the main button
      const subButtonsRef = mainChildSnapshot.child("subButtons");
      subButtonsRef.forEach((subChildSnapshot) => {
        // Get sub-button data
        const subButtonData = subChildSnapshot.val();
        const subButtonName = subButtonData.name;
        const subButtonLink = subButtonData.link;

        // Create a new <a> element for the sub-button
        const subButtonElement = document.createElement("a");
        subButtonElement.textContent = subButtonName;
        subButtonElement.href = subButtonLink;

        // Append the sub-button to the sub-buttons container
        subButtonsContainer.appendChild(subButtonElement);
      });

      // Append the main button and its sub-buttons container to the navbar
      mainButtonElement.appendChild(subButtonsContainer);
      navbar.appendChild(mainButtonElement);

      // Event listener for showing/hiding sub-buttons on hover
      mainButtonElement.addEventListener("mouseenter", () => {
        subButtonsContainer.style.display = "block";
      });

      mainButtonElement.addEventListener("mouseleave", () => {
        subButtonsContainer.style.display = "none";
      });
    });
  });
}

// Call the function to fetch and display buttons on page load
fetchButtonsFromFirebase();
