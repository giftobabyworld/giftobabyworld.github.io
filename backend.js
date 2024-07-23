     // Get a reference to the database
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
             menuItemElement.innerHTML = `
               <div class="btn-container">
                   <button class="btn-package" onclick="redirectToUrl('${menuItem.name}')">
                       <div class="packagesBoxs">
                           <div class="catorgy-imgs">
                               <img src="${firstImageUrl}" alt="${menuItem.name}" class="menu-image">
                           </div>
                           <div class="preview"></div>
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
                              <button class="remove-item-button noselect" data-name="${item.name}" data-price="${item.price}"></button>
                              
                      </div>`;
        cartItemsContainer.appendChild(itemElement);

        // Calculate total amount
        totalAmount += parseInt(item.price) * parseInt(item.quantity);
      });

      // Display total amount
      cartItemsContainer.innerHTML += `<h3 class="total-amount">Total: Rs ${totalAmount}</h3>`;

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
