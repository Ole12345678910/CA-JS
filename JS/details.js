//details.js
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
        displayProduct(productData);
    } catch (error) {
        console.error("Error fetching product:", error.message);
        outElement.innerHTML = `Could not fetch product data: ${error.message}`;
    }
}


// Display product details in the DOM
function displayProduct(product) {
    console.log("Product Data to display:", product);
    const { title, discountedPrice, image = {}, price ,genre, released, description ,ageRating, onSale} = product;
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    
    // Set the image HTML with conditional source and alt attributes
    const imageUrl = image.url || '';
    const imageAlt = image.alt || '';
    
    // Create a variable to hold the discounted price HTML
    const discountedPriceHTML = (onSale && discountedPrice) ? `<p>Discounted Price: ${discountedPrice}$</p>` : '';

    // Set the productDiv HTML with all details
    productDiv.innerHTML = `
        <img src="${imageUrl}" alt="${imageAlt}">
        <h2>${title}</h2>
        <p>${price}$</p>
        ${discountedPriceHTML}
        <p>${genre}</p>
        <p>${released}</p>
        <p>${description}</p>
        <p>${ageRating}</p>
    `;
    
    // Append the productDiv to the container
    outElement.appendChild(productDiv);
}
