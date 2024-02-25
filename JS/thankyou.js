

//thankyou.js
let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart items from localStorage or initialize an empty array

// Function to calculate the total price of items in the cart
function calculateTotalPrice(cart) {
  let totalPrice = 0;
  cart.forEach((item) => {
    const itemPrice = item.discountedPrice || item.price;
    totalPrice += parseFloat(itemPrice);
  });
  return totalPrice;
}

// Function to display total price
function displayTotalPrice(totalPrice) {
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.textContent = `Total Price: ${totalPrice}$`;
}

// Function to display the number of games in the cart
function displayNumberOfGames(cart) {
  const numberOfGamesElement = document.getElementById("number-of-games");
  numberOfGamesElement.textContent = `Number of Games: ${cart.length}`;
}

// Function to display user information
function displayUserInfo() {
  // Retrieve name and email from localStorage
  const name = localStorage.getItem("name") || "Unknown";
  const email = localStorage.getItem("email") || "Unknown";

  // Display name and email
  const nameElement = document.getElementById("user-name");
  const emailElement = document.getElementById("user-email");

  nameElement.textContent = `Name: ${name}`;
  emailElement.textContent = `Email: ${email}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const totalPrice = calculateTotalPrice(cart);
  displayTotalPrice(totalPrice);
  displayNumberOfGames(cart);
  displayUserInfo(); // Add this line to display name and email
});


document.addEventListener("DOMContentLoaded", () => {
  const totalPrice = calculateTotalPrice(cart);
  displayTotalPrice(totalPrice);
  displayNumberOfGames(cart);
  displayUserInfo(); // Add this line to display name and email
});