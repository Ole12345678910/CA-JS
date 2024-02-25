// cart.js
import { displayEmptyCartMessage, createCartItem } from "./utility.js";

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart items from localStorage or initialize an empty array

// Function to display cart items
function displayCartItems() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = ""; // Clear existing content

  if (cart.length === 0) {
    displayEmptyCartMessage(cartContainer); // Display empty cart message if cart is empty
  } else {
    cart.forEach((item) => {
      const listItem = createCartItem(item, removeFromCart); // Create a list item for each cart item
      cartContainer.appendChild(listItem); // Append the list item to the cart container
    });
  }
}

// Function to remove an item from the cart
function removeFromCart(item) {
  const index = cart.findIndex((cartItem) => cartItem.id === item.id);
  if (index !== -1) {
    cart.splice(index, 1); // Remove the item from the cart array
    localStorage.setItem("cart", JSON.stringify(cart)); // Update the cart data in localStorage
    displayCartItems(); // Update the displayed cart items
  }
}

// Function to handle checkout button click
function handleCheckoutButtonClick() {
  if (cart.length > 0) {
    window.location.href = "checkout.html"; // Redirect to checkout page if cart is not empty
  } else {
    alert("Your cart is empty!"); // Show an alert if cart is empty
  }
}

// Call displayCartItems function when the cart.html page loads
document.addEventListener("DOMContentLoaded", displayCartItems);

// Add event listener to checkout button
document
  .querySelector(".cart-button-check")
  .addEventListener("click", handleCheckoutButtonClick);
