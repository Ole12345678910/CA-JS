import { fetchProduct } from "./api.js";
import { displayProductDetail } from "./utility.js";

const outElement = document.getElementById("infocontainer");

const params = new URLSearchParams(document.location.search);
const id = params.get("id");

if (!outElement) {
  console.error("Container element not found");
} else {
  getProduct();
}

async function getProduct() {
  try {
    const productData = await fetchProduct(id);
    displayProductDetail(productData, outElement);
  } catch (error) {
    console.error("Error fetching product:", error.message);
    outElement.innerHTML = `Could not fetch product data: ${error.message}`;
  }
}
