export async function fetchAllProducts() {
  return fetchData("https://v2.api.noroff.dev/gamehub");
}

export async function fetchProducts() {
  const allProducts = await fetchAllProducts();
  return allProducts.filter((product) => product.onSale === true);
}

export async function fetchProduct(id) {
  return fetchData(`https://v2.api.noroff.dev/gamehub/${id}`);
}

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! ${response.status}`);
    }
    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error(error.message); // Log the error message
    return []; // Return an empty array in case of error
  }
}
