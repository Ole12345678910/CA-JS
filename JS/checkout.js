//checkout.js

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart items from localStorage or initialize an empty array

// Function to display cart items
function displayCartItems() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = ""; // Clear existing content

  let totalPrice = 0;
  let totalSaved = 0;

  if (cart.length === 0) {
    displayEmptyCartMessage(cartContainer); // Display empty cart message if cart is empty
  } else {
    cart.forEach((item) => {
      const listItem = createCartItemElement(item); // Create a list item for each cart item
      cartContainer.appendChild(listItem); // Append the list item to the cart container
      const { displayPrice, savedAmount } = calculatePriceAndSaved(item); // Calculate the price and saved amount for the item
      totalPrice += parseFloat(displayPrice); // Add the display price to the total price
      totalSaved += parseFloat(savedAmount); // Add the saved amount to the total saved
    });
  }

  displayTotalPriceAndSaved(totalPrice, totalSaved); // Display the total price and saved amount
}

// Function to create a cart item element
function createCartItemElement(item) {
  const listItem = document.createElement("div");
  listItem.classList.add("cart-item");

  const details = createCartItemDetailsElement(item); // Create details for the cart item
  listItem.appendChild(details);

  return listItem;
}

// Function to create details for a cart item
function createCartItemDetailsElement(item) {
  const details = document.createElement("div");
  details.classList.add("cart-product-details");
  const displayPrice = item.discountedPrice || item.price;
  details.innerHTML = `
        <img src="${item.image.url}" alt="${item.title}" class="product-image">
        <h2>${item.title}</h2>
        <p>Price: ${displayPrice}$</p>
        ${
          item.onSale ? `<p>Discounted Price: ${item.discountedPrice}$</p>` : ""
        }
    `;
  return details;
}

// Function to calculate the price and saved amount for a cart item
function calculatePriceAndSaved(item) {
  let displayPrice = item.discountedPrice || item.price;
  let savedAmount = 0;
  if (item.discountedPrice && item.price) {
    savedAmount = parseFloat(item.price) - parseFloat(item.discountedPrice); // Calculate the saved amount if item is on sale
  }
  return { displayPrice, savedAmount };
}

// Function to display total price and saved amount
function displayTotalPriceAndSaved(totalPrice, totalSaved) {
  const totalPriceRounded = Math.round(totalPrice); // Round the total price
  const totalSavedRounded = Math.round(totalSaved); // Round the total saved amount

  const totalPriceElement = document.getElementById("total-price");
  const totalSavedElement = document.getElementById("total-saved");
  totalPriceElement.textContent = `Total Price: ${totalPriceRounded}$`; // Display the total price
  totalSavedElement.textContent = `Total Saved: ${totalSavedRounded}$`; // Display the total saved amount
}

// Function to handle form submission
function handleFormSubmission(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Retrieve form input values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  // Store name and email in localStorage
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);

  // Show loading message
  const loadingElement = document.getElementById("loading");
  loadingElement.style.display = "block";

  // Delay the redirect to simulate loading (optional)
  setTimeout(() => {
    // Redirect to the 'thankyou.html' page
    window.location.href = "thankyou.html";
  }, 2000); // Adjust the delay time as needed
}

// Call displayCartItems function when the cart.html page loads
document.addEventListener("DOMContentLoaded", displayCartItems);

// Add event listener to form submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("checkout-form");
  form.addEventListener("submit", handleFormSubmission); // Add event listener to form submission
});
