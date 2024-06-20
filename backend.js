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