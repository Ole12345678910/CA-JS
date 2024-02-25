let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCartItems() {
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = ''; // Clear existing content
    
    let totalPrice = 0;
    let totalSaved = 0;

    // Calculate total price and total saved based on items in the cart
    cart.forEach(item => {
        // Perform calculations here based on item properties
        totalPrice += parseFloat(item.price);
        // Update totalSaved based on any discounts or savings
        // totalSaved += ...
    });

    // Update HTML elements with calculated values
    const totalPriceElement = document.getElementById('total-price');
    const totalSavedElement = document.getElementById('total-saved');
    totalPriceElement.textContent = `Total Price: ${totalPrice}$`;
    totalSavedElement.textContent = `Total Saved: ${totalSaved}$`;
}

// Call displayCartItems function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', displayCartItems);
