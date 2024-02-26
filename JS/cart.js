import { cartMessage, createCartItem } from "./utility.js";

// Initialize cart array
let cart = [];

// Try to retrieve cart items from localStorage, if available
try {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
} catch (error) {
  // Log an error message if there's an issue retrieving cart data from localStorage
  console.error("Error loading cart:", error.message);
}

// Function to display cart items
function displayCartItems() {
  // Get the container element where cart items will be displayed
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = ""; // Clear existing content

  // Check if the cart is empty
  if (cart.length === 0) {
    // Display empty cart message if cart is empty
    cartMessage(cartContainer);
  } else {
    // Loop through each item in the cart
    cart.forEach((item) => {
      // Create a list item for each cart item
      const listItem = createCartItem(item, removeFromCart);
      // Append the list item to the cart container
      cartContainer.appendChild(listItem);
    });
  }
}

// Function to remove an item from the cart
function removeFromCart(item) {
  // Find the index of the item in the cart array
  const index = cart.findIndex((cartItem) => cartItem.id === item.id);
  // If the item is found in the cart
  if (index !== -1) {
    // Remove the item from the cart array
    cart.splice(index, 1);
    // Update the cart data in localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Update the displayed cart items
    displayCartItems();
  } else {
    // Log a warning if the item is not found in the cart
    console.warn("Item not found:", item);
  }
}

// Function to handle checkout button click
function handleCheckoutButtonClick() {
  // Check if the cart is not empty
  if (cart.length > 0) {
    // Redirect to checkout page if cart is not empty
    window.location.href = "checkout.html";
  } else {
    // Show an alert if cart is empty
    alert("Your cart is empty!");
  }
}

// Call displayCartItems function when the cart.html page loads
document.addEventListener("DOMContentLoaded", displayCartItems);

// Add event listener to checkout button
document
  .querySelector(".cart-button-check")
  .addEventListener("click", handleCheckoutButtonClick);
