// api.js

/**
 * Function to fetch product data from the API
 * @param {string} id - The ID of the product to fetch
 * @returns {Promise} - A promise that resolves with the fetched product data or rejects with an error
 */
export async function fetchProduct(id) {
    try {
        const api = `https://v2.api.noroff.dev/gamehub/${id}`;
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const productData = await response.json();
        if (!productData || !productData.data) {
            throw new Error('Product data not found');
        }
        return productData.data;
    } catch (error) {
        throw new Error(`Failed to fetch product data: ${error.message}`);
    }
}
