import { fetchProducts } from "./api.js";
import { displayProducts } from "./utility.js";

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart items from local storage or initialize an empty array

const container = document.querySelector("#container"); // Select the container element where products will be displayed

// Function to initialize the page
const initialize = async () => {
  try {
    const products = await fetchProducts(); // Fetch products from the API
    displayProducts(container, products, cart); // Display products in the container, passing the cart variable
  } catch (error) {
    console.error(error.message); // Log any errors that occur during initialization
  }
};

initialize(); // Call the initialization function to start fetching and displaying products
