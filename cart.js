
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to cart
function addToCart(product) {
    // Append the new product to the cart array
    cart.push(product);
    // Update the cart array in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    // Update the display
    displayCartItems();
}

function displayCartItems() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; // Clear existing content

    if (cart.length === 0) {
        cartContainer.textContent = 'Your cart is empty';
    } else {
        cart.forEach(item => {
            const listItem = document.createElement('div'); // Use a div for each cart item
            listItem.classList.add('cart-item'); // Add a class to the list item for styling

            // Create text content for item details
            const details = document.createElement('div');
            details.classList.add('cart-product-details'); // Add a class to the details div for styling
            details.innerHTML = `
                <img src="${item.image.url}" alt="${item.title}" class="product-image"> <!-- Display product image -->
                <h2>${item.title}</h2>
                <p>Price: ${item.price}$</p>
                <p>Discounted Price: ${item.discountedPrice || 'N/A'}</p>
            `;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                // Remove item from cart array
                const index = cart.findIndex(cartItem => cartItem.id === item.id);
                if (index !== -1) {
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart)); // Update cart in localStorage
                    // Update cart display
                    displayCartItems();
                }
            });
            details.appendChild(removeButton); // Append remove button to details

            listItem.appendChild(details); // Append details to list item
            cartContainer.appendChild(listItem); // Append list item to cart container
        });
    }
}

// Call displayCartItems function when the cart.html page loads
document.addEventListener('DOMContentLoaded', displayCartItems);

document.querySelector('.cart-button-check').addEventListener('click', function() {
    // Check if the cart is empty
    if (cart.length > 0) {
        // If the cart is not empty, redirect to the checkout page (replace 'checkout.html' with your actual checkout page)
        window.location.href = 'checkout.html';
    } else {
        // If the cart is empty, display an alert
        alert('You Have Nothing In Your Cart!');
    }
});
