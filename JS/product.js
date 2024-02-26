import { fetchAllProducts } from './api.js';
import { filterProducts, displayProduct, } from './utility.js';

const out = document.querySelector("#gamecontainer");
const filters = document.querySelector("#filters");
let cart = JSON.parse(localStorage.getItem('cart')) || [];

async function fetchAndDisplayProducts() {
    try {
        const products = await fetchAllProducts();
        out.innerHTML = ''; // Clear the container
        displayFilteredProducts(products);
    } catch (error) {
        console.error(error.message);
    }
}

function displayFilteredProducts(products) {
    const filteredProducts = filterProducts(products, filters);
    filteredProducts.forEach(product => displayProduct(product, out, cart));
}

filters.addEventListener("change", fetchAndDisplayProducts);

fetchAndDisplayProducts();
