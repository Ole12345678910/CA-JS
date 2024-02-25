//cart.js
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to display cart items
function displayCartItems() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; // Clear existing content

    if (cart.length === 0) {
        displayEmptyCartMessage(cartContainer);
    } else {
        cart.forEach(item => {
            const listItem = createCartItem(item);
            cartContainer.appendChild(listItem);
        });
    }
}

// Function to display an empty cart message
function displayEmptyCartMessage(container) {
    container.innerHTML = '<div class="empty-cart-message">Your cart is empty...</div>';
}

// Function to create a cart item element
function createCartItem(item) {
    const listItem = document.createElement('div');
    listItem.classList.add('cart-item');

    const details = createCartItemDetails(item);
    const removeButton = createRemoveButton(item);

    details.appendChild(removeButton);
    listItem.appendChild(details);

    return listItem;
}

// Function to create details for a cart item
function createCartItemDetails(item) {
    const details = document.createElement('div');
    details.classList.add('cart-product-details');
    details.innerHTML = `
        <img src="${item.image.url}" alt="${item.title}" class="product-image">
        <h2>${item.title}</h2>
        <p>Price: ${item.price}$</p>
        <p>Discounted Price: ${item.discountedPrice || 'N/A'}</p>
    `;
    return details;
}

// Function to create a remove button for a cart item
function createRemoveButton(item) {
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.classList.add('remove-button');
    removeButton.addEventListener('click', () => removeFromCart(item));
    return removeButton;
}

// Function to remove an item from the cart
function removeFromCart(item) {
    const index = cart.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

// Function to handle checkout button click
function handleCheckoutButtonClick() {
    if (cart.length > 0) {
        window.location.href = 'checkout.html';
    } else {
        alert('Your cart is empty!');
    }
}

// Call displayCartItems function when the cart.html page loads
document.addEventListener('DOMContentLoaded', displayCartItems);

// Add event listener to checkout button
document.querySelector('.cart-button-check').addEventListener('click', handleCheckoutButtonClick);
