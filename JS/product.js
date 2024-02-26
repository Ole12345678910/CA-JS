import { fetchAllProducts } from "./api.js";
import { filterProducts, displayProduct } from "./utility.js";

// Select DOM elements
const out = document.querySelector("#gamecontainer");
const filters = document.querySelector("#filters");

// Retrieve cart items from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fetch and display products based on selected filters
async function fetchAndDisplayProducts() {
  try {
    const products = await fetchAllProducts();
    out.innerHTML = ""; // Clear the container
    displayFilteredProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
}

// Display filtered products based on selected filters
function displayFilteredProducts(products) {
  const filteredProducts = filterProducts(products, filters);
  filteredProducts.forEach((product) => displayProduct(product, out, cart));
}

// Add event listener to filters for change event
filters.addEventListener("change", fetchAndDisplayProducts);

// Initial fetch and display of products when the page loads
fetchAndDisplayProducts();
