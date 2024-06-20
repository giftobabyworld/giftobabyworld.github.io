const database = firebase.database();

// Get the form element
const form = document.querySelector("#contact-form");

// Add submit event listener
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get input field values
  const firstname = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;

  // Save data to Firebase
  database.ref("messages").push({
    firstname,
    email,
    message,
  });
  alert("Your message is recorded. Our team will contact you soon");
});
