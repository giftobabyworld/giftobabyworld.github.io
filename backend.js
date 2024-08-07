var database = firebase.database();
var menuRef = database.ref("products");

// Retrieve itemCategory from localStorage
var itemCategory = localStorage.getItem("itemCategory");
console.log("Retrieved itemCategory from localStorage:", itemCategory);

// Check if menu items are already loaded
var menuItemsLoaded = false;

menuRef.on("value", function (snapshot) {
  var menuData = snapshot.val();
  console.log("Retrieved menuData from Firebase:", menuData);

  // Display menu data on the web page
  var menuContainer = document.getElementById("menu");
  menuContainer.innerHTML = "";

  var foundItems = false;
  if (menuData.hasOwnProperty(itemCategory)) {
    var categoryItems = menuData[itemCategory];

    for (var key in categoryItems) {
      if (categoryItems.hasOwnProperty(key)) {
        var menuItem = categoryItems[key];
        foundItems = true;

        // Create menu item element
        var menuItemElement = document.createElement("div");
        var firstImageUrl = Array.isArray(menuItem.images)
          ? menuItem.images[0]
          : menuItem.images; // Get the first image URL if it's an array
          
        // Check if the item is in stock
        var inStock = menuItem.quantity > 0;
        var buttonHtml = inStock 
          ? `<button class="add-to-cart-button" onclick="addToCart('${menuItem.name}', '${firstImageUrl}', '${menuItem.button1Price}')">Add to Cart</button>`
          : `<button class="add-to-cart-button" disabled>Sold Out</button>`;

        menuItemElement.innerHTML = `
          <div class="btn-container">
            <button class="btn-package" onclick="redirectToUrl('${menuItem.name}')">
              <div class="packagesBoxs">
                <div class="catorgy-imgs">
                  <img src="${firstImageUrl}" alt="${menuItem.name}" class="menu-image ${!inStock ? 'sold-out' : ''}">
                </div>
                <div class="Pcontent">
                  <div class="package-details">
                    <div class="package-name">
                      <h2 class="multiline-ellipsis-2">${menuItem.name}</h2>
                    </div>
                    <div class="package-price">
                      <h4 class="multiline-ellipsis-3">Rs ${menuItem.button1Price}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </button>
            <div class="button-category-wrapper">
              ${buttonHtml}
            </div>
          </div>
        `;

        menuContainer.appendChild(menuItemElement);
      }
    }
  }

  if (!foundItems) {
    console.log("No items found for the category:", itemCategory);
  }
});

function addToCart(name, image, price) {
  // Retrieve cart items from localStorage
  var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Check if the item already exists in the cart
  var existingItem = cartItems.find(item => item.name === name);

  if (existingItem) {
    // Increase the quantity if it already exists
    existingItem.quantity++;
  } else {
    // Add new item to the cart
    cartItems.push({ name, image, price, quantity: 1 });
  }

  // Save cart items back to localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  // Optionally, you can trigger a cart display update or provide feedback to the user here
  alert("Item added to cart!");
  location.reload();
}

function redirectToUrl(itemName) {
  // Save itemName to localStorage
  localStorage.setItem("itemName", itemName);

  var url = "product.html";
  window.location.href = url;
}

document.addEventListener("DOMContentLoaded", function () {
      function displayCart() {
        // Retrieve cart items from localStorage
        var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        var deliveryCharge = 99; // Fixed delivery charge
    
        // Display cart items on the page
        var cartItemsContainer = document.getElementById("cart-items");
        var content = ""; // Variable to build the HTML content
    
        if (cartItems.length === 0) {
          content = `
            <p class="empty-msg">Your cart is empty 😞 
            <a class="empty-shopping" href="index.html">Continue Shopping</a></p>
          `;
        } else {
          var totalAmount = 0;
    
          cartItems.forEach(function (item) {
            content += `
              <div class="cart-container">
                <div class="cart-container-2">
                  <div class="cart-img">
                    <img src="${item.image}" alt="${item.name}" style="width: 30rem;">
                  </div>
                  <div class="cart-details">
                    <p>Name: ${item.name}</p>
                    <p>Price: Rs ${item.price}</p><br><br>
                    <div class="quantity-control">
                      <button class="decrease-quantity" data-name="${item.name}" data-price="${item.price}">-</button>
                      <span class="quantity">${item.quantity}</span>
                      <button class="increase-quantity" data-name="${item.name}" data-price="${item.price}">+</button>
                    </div>
                    <p>Size: ${item.buttonName}<br><br></p><br>
                  </div>
                </div>
                <button class="remove-item-button noselect" data-name="${item.name}" data-price="${item.price}">
                  <span class="text">Remove</span>
                  <!-- Optionally, you can add an icon here if you prefer -->
                  <!-- <i class="icon">🗑️</i> -->
                </button>
              </div>
            `;
    
            // Calculate total amount
            totalAmount += parseInt(item.price) * parseInt(item.quantity);
          });
    
          // Calculate final total with delivery charge
          var totalAmountWithDelivery = totalAmount + deliveryCharge;
    
          // Display only the final total
          content += `
            <h3 class="total-amount">Total: Rs ${totalAmountWithDelivery}</h3>
          `;
        }
    
        // Set the built content to the cartItemsContainer
        cartItemsContainer.innerHTML = content;
    
        // Add event listeners to Remove buttons
        var removeButtons = document.querySelectorAll(".remove-item-button");
        removeButtons.forEach(function (button) {
          button.addEventListener("click", function () {
            var itemName = button.getAttribute("data-name");
            var itemPrice = button.getAttribute("data-price");
    
            // Retrieve cart items from localStorage
            var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
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
    
        // Add event listeners to Quantity control buttons
        var increaseButtons = document.querySelectorAll(".increase-quantity");
        var decreaseButtons = document.querySelectorAll(".decrease-quantity");
    
        increaseButtons.forEach(function (button) {
          button.addEventListener("click", function () {
            var itemName = button.getAttribute("data-name");
            var itemPrice = button.getAttribute("data-price");
    
            // Retrieve cart items from localStorage
            var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
            // Find index of item to update
            var index = cartItems.findIndex(function (item) {
              return item.name === itemName && item.price === itemPrice;
            });
    
            if (index !== -1) {
              cartItems[index].quantity++;
              // Update cart items in localStorage
              localStorage.setItem("cartItems", JSON.stringify(cartItems));
              // Trigger live reload
              displayCart();
            }
          });
        });
    
        decreaseButtons.forEach(function (button) {
          button.addEventListener("click", function () {
            var itemName = button.getAttribute("data-name");
            var itemPrice = button.getAttribute("data-price");
    
            // Retrieve cart items from localStorage
            var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    
            // Find index of item to update
            var index = cartItems.findIndex(function (item) {
              return item.name === itemName && item.price === itemPrice;
            });
    
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
  localStorage.setItem("itemCategory", categoryName);
  // Redirect to category.html
  window.location.href = "catogry.html";
}
document.addEventListener("DOMContentLoaded", function () {
  var dropdowns = document.querySelectorAll(".dropdown2 .menu li");
  dropdowns.forEach(function (item) {
    item.addEventListener("click", function () {
      redirectToCategory(this);
    });
  });
});
var database = firebase.database();
var menuRef = database.ref("products");

// Fetch all products and store them in an array
var allProducts = [];

menuRef.on("value", function (snapshot) {
  var menuData = snapshot.val();

  // Flatten the nested objects into a single array of products
  for (var category in menuData) {
    if (menuData.hasOwnProperty(category)) {
      var categoryItems = menuData[category];
      for (var key in categoryItems) {
        if (categoryItems.hasOwnProperty(key)) {
          // Add category information to each product
          categoryItems[key].category = category;
          allProducts.push(categoryItems[key]);
        }
      }
    }
  }
});

document.getElementById("searchBar").addEventListener("input", function (event) {
  var query = event.target.value.toLowerCase();
  var suggestionsContainer = document.getElementById("suggestions");

  suggestionsContainer.innerHTML = "";

  if (query.length > 0) {
    var suggestions = allProducts.filter(function (product) {
      return product.name.toLowerCase().includes(query);
    });

    suggestions.forEach(function (product) {
      var suggestionElement = document.createElement("p");
      suggestionElement.textContent = product.name;
      suggestionElement.addEventListener("click", function () {
        redirectToProductPage(product);
      });
      suggestionsContainer.appendChild(suggestionElement);
    });
  }
});

function redirectToProductPage(product) {
  // Save itemCategory and itemName to localStorage
  localStorage.setItem("itemCategory", product.category);
  localStorage.setItem("itemName", product.name);

  // Redirect to product.html
  window.location.href = "product.html";
}
