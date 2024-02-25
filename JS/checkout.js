//checkout.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart items
function displayCartItems() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; // Clear existing content

    let totalPrice = 0;
    let totalSaved = 0;

    if (cart.length === 0) {
        displayEmptyCartMessage(cartContainer);
    } else {
        cart.forEach(item => {
            const listItem = createCartItemElement(item);
            cartContainer.appendChild(listItem);
            const { displayPrice, savedAmount } = calculatePriceAndSaved(item);
            totalPrice += parseFloat(displayPrice);
            totalSaved += parseFloat(savedAmount);
        });
    }

    displayTotalPriceAndSaved(totalPrice, totalSaved);
}

// Function to create a cart item element
function createCartItemElement(item) {
    const listItem = document.createElement('div');
    listItem.classList.add('cart-item');

    const details = createCartItemDetailsElement(item);
    listItem.appendChild(details);

    return listItem;
}

// Function to create details for a cart item
function createCartItemDetailsElement(item) {
    const details = document.createElement('div');
    details.classList.add('cart-product-details');
    const displayPrice = item.discountedPrice || item.price;
    details.innerHTML = `
        <img src="${item.image.url}" alt="${item.title}" class="product-image">
        <h2>${item.title}</h2>
        <p>Price: ${displayPrice}$</p>
        ${item.onSale ? `<p>Discounted Price: ${item.discountedPrice}$</p>` : ''}
    `;
    return details;
}

// Function to calculate the price and saved amount for a cart item
function calculatePriceAndSaved(item) {
    let displayPrice = item.discountedPrice || item.price;
    let savedAmount = 0;
    if (item.discountedPrice && item.price) {
        savedAmount = parseFloat(item.price) - parseFloat(item.discountedPrice);
    }
    return { displayPrice, savedAmount };
}

// Function to display total price and saved amount
function displayTotalPriceAndSaved(totalPrice, totalSaved) {
    const totalPriceRounded = Math.round(totalPrice);
    const totalSavedRounded = Math.round(totalSaved);

    const totalPriceElement = document.getElementById('total-price');
    const totalSavedElement = document.getElementById('total-saved');
    totalPriceElement.textContent = `Total Price: ${totalPriceRounded}$`;
    totalSavedElement.textContent = `Total Saved: ${totalSavedRounded}$`;
}

// Function to handle form submission
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Perform any form validation here if needed

    // Redirect to the 'thankyou.html' page
    window.location.href = 'thankyou.html';
}

// Call displayCartItems function when the cart.html page loads
document.addEventListener('DOMContentLoaded', displayCartItems);

// Add event listener to form submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', handleFormSubmission);
});
