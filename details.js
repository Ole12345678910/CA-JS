// main.js

import { fetchProduct } from './api.js';

const outElement = document.getElementById("infocontainer");

// Retrieve the ID parameter from the URL
const params = new URLSearchParams(document.location.search);
const id = params.get("id");
console.log("ID:", id);

// Check if container element exists
if (!outElement) {
    console.error("Container element not found");
} else {
    getProduct();
}

// Fetch product data from the API
async function getProduct() {
    try {
        const productData = await fetchProduct(id);
        console.log("API Response:", productData);

        if (productData && Object.keys(productData).length > 0) {
            displayProduct(productData);
        } else {
            outElement.innerHTML = `Product not found...`;
        }
    } catch (error) {
        console.error(error);
        outElement.innerHTML = `Could not fetch product data: ${error.message}`;
    }
}

// Display product details in the DOM
function displayProduct(productData) {
    console.log("Product Data to display:", productData);
    const { title, discountedPrice, image, price } = productData.data;
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    
    // Set the image HTML with conditional source and alt attributes
    const imageUrl = image && image.url ? image.url : '';
    const imageAlt = image && image.alt ? image.alt : '';
    productDiv.innerHTML = `
        <img src="${imageUrl}" alt="${imageAlt}">
        <h2>${title}</h2>
        <p class="price">${price}$</p>
    `;
    
    // Append the productDiv to the container
    outElement.appendChild(productDiv);
}
