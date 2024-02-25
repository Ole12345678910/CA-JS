import { fetchAllProducts } from "./api.js";
import {
  addToCart,
  filterProducts,
  displayProduct,
  displayProducts,
} from "./utility.js";

const out = document.querySelector("#gamecontainer");
const container = document.querySelector("#container");
const filters = document.querySelector("#filters");
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to fetch products from the API and display them
async function fetchAndDisplayProducts() {
  try {
    const products = await fetchAllProducts(); // Fetch all products
    out.innerHTML = ""; // Clear the game container
    displayFilteredProducts(products); // Display filtered products
    displayProducts(container, products, cart); // Display all products in the container
  } catch (error) {
    console.error(error.message); // Log any errors
  }
}

// Function to display filtered products based on selected filters
function displayFilteredProducts(products) {
  const filteredProducts = filterProducts(products, filters); // Filter products based on selected filters
  filteredProducts.forEach((product) =>
    displayProduct(product, out, cart)
  ); // Display each filtered product
}

// Event listener for filter change
filters.addEventListener("change", fetchAndDisplayProducts);

// Initial call to fetch and display products
fetchAndDisplayProducts();
