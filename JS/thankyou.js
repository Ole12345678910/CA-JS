//thankyou.js
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart items from localStorage or initialize an empty array

// Function to calculate the total price of items in the cart
function calculateTotalPrice(cart) {
  return cart.reduce(
    (total, item) => total + parseFloat(item.discountedPrice || item.price),
    0
  );
}

// Function to display total price as a whole number
function displayTotalPrice(totalPrice) {
  const roundedTotalPrice = Math.round(totalPrice); // Round the total price to the nearest whole number
  displayElementText("total-price", `Total Price: ${roundedTotalPrice}$`);
}

// Function to display the number of games in the cart
function displayNumberOfGames(cart) {
  displayElementText("number-of-games", `Number of Games: ${cart.length}`);
}

// Function to display user information
function displayUserInfo() {
  const name = localStorage.getItem("name") || "Unknown";
  const email = localStorage.getItem("email") || "Unknown";
  displayElementText("user-name", `Name: ${name}`);
  displayElementText("user-email", `Email: ${email}`);
}

// Function to update element text content by ID
function displayElementText(id, text) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = text;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const totalPrice = calculateTotalPrice(cart);
  displayTotalPrice(totalPrice);
  displayNumberOfGames(cart);
  displayUserInfo(); // Add this line to display name and email
});
