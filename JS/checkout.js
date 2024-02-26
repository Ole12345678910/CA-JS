let cart;
try {
  // Attempt to parse the cart from localStorage or initialize an empty array
  cart = JSON.parse(localStorage.getItem("cart")) || [];
} catch (error) {
  // Log an error if there's an issue parsing the cart
  console.error("Error loading cart:", error);
  cart = [];
}

function displayCartItems() {
  // Clear existing content in the cart container
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";

  let totalPrice = 0;
  let totalSaved = 0;

  if (cart.length === 0) {
    // Display empty cart message if cart is empty
    cartMessage(cartContainer);
  } else {
    cart.forEach((item) => {
      // Create a list item for each cart item
      const listItem = createItem(item);
      // Append the list item to the cart container
      cartContainer.appendChild(listItem);
      // Calculate the price and saved amount for the item
      const { displayPrice, savedAmount } = calculatePrice(item);
      // Add the display price to the total price
      totalPrice += parseFloat(displayPrice);
      // Add the saved amount to the total saved
      totalSaved += parseFloat(savedAmount);
    });
  }

  // Display the total price and saved amount
  priceAndSaved(totalPrice, totalSaved);
}

function createItem(item) {
  // Create a div element for the cart item
  const listItem = document.createElement("div");
  listItem.classList.add("cart-item");
  // Create details for the cart item
  const details = createItemDetail(item);
  // Append the details to the list item
  listItem.appendChild(details);
  return listItem;
}

function createItemDetail(item) {
  // Create a div element for the cart product details
  const details = document.createElement("div");
  details.classList.add("cart-product-details");
  // Determine the display price for the item
  const displayPrice = item.discountedPrice || item.price;
  // Populate the details with HTML content
  details.innerHTML = `
    <img src="${item.image.url}" alt="${item.title}" class="product-image">
    <h2>${item.title}</h2>
    <p>Price: ${displayPrice}$</p>
    ${item.onSale ? `<p>Discounted Price: ${item.discountedPrice}$</p>` : ""}
  `;
  return details;
}

function calculatePrice(item) {
  let displayPrice = item.discountedPrice || item.price;
  let savedAmount = 0;
  if (item.discountedPrice && item.price) {
    // Calculate the saved amount if item is on sale
    savedAmount = parseFloat(item.price) - parseFloat(item.discountedPrice);
  }
  return { displayPrice, savedAmount };
}

function priceAndSaved(totalPrice, totalSaved) {
  // Round the total price and total saved amount
  const totalPriceRounded = Math.round(totalPrice);
  const totalSavedRounded = Math.round(totalSaved);

  // Display the total price and total saved amount
  const totalPriceElement = document.getElementById("total-price");
  const totalSavedElement = document.getElementById("total-saved");
  totalPriceElement.textContent = `Total Price: ${totalPriceRounded}$`;
  totalSavedElement.textContent = `Total Saved: ${totalSavedRounded}$`;
}

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
    // Redirect to the 'thankyou.html' page after a delay
    window.location.href = "thankyou.html";
  }, 2000); // Adjust the delay time as needed
}

document.addEventListener("DOMContentLoaded", () => {
  // Display cart items when the page is loaded
  displayCartItems();
  const form = document.getElementById("checkout-form");
  // Add event listener to form submission
  form.addEventListener("submit", handleFormSubmission);
});
