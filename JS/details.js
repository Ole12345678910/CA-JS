// details.js
import { fetchProduct } from "./api.js";
import { displayProductDetail } from "./utility.js";

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
    const productData = await fetchProduct(id); // Fetch product data for the specified ID
    console.log("API Response:", productData);
    displayProductDetail(productData, outElement); // Display product details in the specified container
  } catch (error) {
    console.error("Error fetching product:", error.message);
    outElement.innerHTML = `Could not fetch product data: ${error.message}`; // Display error message if fetching fails
  }
}
