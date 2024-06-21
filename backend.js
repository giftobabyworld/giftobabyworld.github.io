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