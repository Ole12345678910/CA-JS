import { fetchAllProducts } from "./api.js";
import { filterProducts, displayProduct } from "./utility.js";

// Select DOM elements
const out = document.querySelector("#gamecontainer");
const filters = document.querySelector("#filters");

// Retrieve cart items from localStorage or initialize an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Fetch and display products based on selected filters
async function fetchDisplay() {
  try {
    const products = await fetchAllProducts();
    out.innerHTML = ""; // Clear the container
    displayFiltered(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
  }
}

// Display filtered products based on selected filters
function displayFiltered(products) {
  const filteredProducts = filterProducts(products, filters);
  filteredProducts.forEach((product) => displayProduct(product, out, cart));
}

// Add event listener to filters for change event
filters.addEventListener("change", fetchDisplay);

// Initial fetch and display of products when the page loads
fetchDisplay();
