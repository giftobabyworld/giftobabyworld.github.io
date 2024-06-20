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

document.addEventListener("DOMContentLoaded", function () {
  function displayCart() {
    // Retrieve cart items from localStorage
    var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Display cart items on the page
    var cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // Clear existing content

    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML =
        '<p class="empty-msg">Your cart is empty 😞 <a class="empty-shopping" href="index.html">Continue Shopping</a></p>';
    } else {
      var totalAmount = 0;

      cartItems.forEach(function (item) {
        var itemElement = document.createElement("div");
        itemElement.innerHTML = `
                      <div class="cart-container">
                          <div class="cart-container-2">
                              <div class="cart-img">
                                  <img src="${item.image}" alt="${item.name}" style="width: 30rem;">
                              </div>
                              <div class="cart-details">
                                  <p>Name: ${item.name}</p>
                                  <p>Price: Rs ${item.price}</p>
                                  <p>Quantity: ${item.quantity}</p>
                                  <p>Size: ${item.buttonName}</p>
                              </div>
                          </div>
                              <button class="remove-item-button noselect" data-name="${item.name}" data-price="${item.price}"> <span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
                              <hr>
                      </div>`;
        cartItemsContainer.appendChild(itemElement);

        // Calculate total amount
        totalAmount += parseInt(item.price) * parseInt(item.quantity);
      });

      // Display total amount
      cartItemsContainer.innerHTML += `<h3 class="total-amount">Total: Rs ${totalAmount}</h3>`;

      // Add event listeners to Remove buttons
      var removeButtons = document.querySelectorAll(
        ".remove-item-button"
      );
      removeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          var itemName = button.getAttribute("data-name");
          var itemPrice = button.getAttribute("data-price");

          // Retrieve cart items from localStorage
          var cartItems =
            JSON.parse(localStorage.getItem("cartItems")) || [];

          // Find index of item to remove
          var index = cartItems.findIndex(function (item) {
            return item.name === itemName && item.price === itemPrice;
          });

          // Decrease quantity by 1 or remove item if quantity is 1
          if (index !== -1) {
            if (cartItems[index].quantity > 1) {
              cartItems[index].quantity--;
            } else {
              cartItems.splice(index, 1);
            }
            // Update cart items in localStorage
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            // Trigger live reload
            displayCart();
          }
        });
      });
    }
  }

  // Display cart initially
  displayCart();

  // Listen for changes in localStorage (storage event)
  window.addEventListener("storage", function (e) {
    // Check if the event is related to cartItems
    if (e.key === "cartItems") {
      // Trigger live reload
      displayCart();
    }
  });
});
function redirectToCategory(element) {
  // Get the category name from the clicked link's text content
  var categoryName = element.textContent.trim();
  // Save category in localStorage or sessionStorage
  localStorage.setItem('itemCategory', categoryName);
  // Redirect to category.html
  window.location.href = 'catogry.html';
}
document.addEventListener('DOMContentLoaded', function() {
  var dropdowns = document.querySelectorAll('.dropdown2 .menu li');
  dropdowns.forEach(function(item) {
    item.addEventListener('click', function() {
      redirectToCategory(this);
    });
  });
});