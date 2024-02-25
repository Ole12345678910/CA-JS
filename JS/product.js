//product.js
import { fetchProduct } from './api.js';

const API_URL = "https://v2.api.noroff.dev/gamehub";

const out = document.querySelector("#gamecontainer");
const filters = document.querySelector("#filters");

let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! ${response.status}`);
        }
        const { data } = await response.json();
        return data;
    } catch (error) {
        console.error(error.message);
        return [];
    }
}

function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function filterProducts(products) {
    const selectedGenres = Array.from(filters.querySelectorAll("input[type='checkbox']"))
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.name);

    return selectedGenres.length === 0 ? products : products.filter(product => selectedGenres.includes(product.genre));
}

function displayProduct(product) {
    const { id, title, image, price } = product;
    const productLink = document.createElement('a');
    productLink.href = `details.html?id=${id}`;
    productLink.classList.add('product-link');
    const productDiv = document.createElement('div');
    productDiv.classList.add('product');
    productDiv.innerHTML = `
        <img src="${image.url}" alt="${title}">
        <h2>${title}</h2>
        <p class="priceinfo">${price}$</p>
        <a href="details.html?id=${id}" class="product-link">
            <button class="add-to-cart">Add to Cart</button>
        </a>
    `;
    const addToCartButton = productDiv.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', (event) => {
        event.preventDefault();
        addToCart(product);
    });
    productLink.appendChild(productDiv);
    out.appendChild(productLink);
}

async function displayFilteredProducts() {
    try {
        const products = await fetchProducts();
        out.innerHTML = ''; // Clear the container first
        const filteredProducts = filterProducts(products);
        filteredProducts.forEach(product => displayProduct(product));
    } catch (error) {
        console.error(error.message);
    }
}

// Event listener for checkbox changes
filters.addEventListener("change", displayFilteredProducts);

// Call displayFilteredProducts initially to fetch and display all products
displayFilteredProducts();
