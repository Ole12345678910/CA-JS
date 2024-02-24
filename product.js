console.log("Producthub");

const out = document.querySelector("#gamecontainer");
const filters = document.querySelector("#filters");

let cart = [];

// Function to add item to cart
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to filter products based on selected genres
function filterProducts(products) {
    const checkboxes = filters.querySelectorAll("input[type='checkbox']");
    const selectedGenres = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.name);

    if (selectedGenres.length === 0) {
        return products; // If no genre is selected, return all products
    }

    return products.filter(product => {
        return selectedGenres.includes(product.genre);
    });
}

// Function to display filtered products
function displayFilteredProducts(products) {
    out.innerHTML = ''; // Clear the container first
    products.forEach(product => {
        const { id, title, image, price } = product; // Destructure relevant properties from the product object
        const productLink = document.createElement('a'); // Create a link for each product
        productLink.href = `details.html?id=${id}`; // Set the href attribute of the link
        productLink.classList.add('product-link'); // Add a class to the link for styling
        const productDiv = document.createElement('div'); // Create a new div for each product
        productDiv.classList.add('product'); // Add a class to the product div for styling
        productDiv.innerHTML = `
            <img src="${image.url}" alt="${title}"> <!-- Display product image -->
            <h2>${title}</h2>
            <p class="priceinfo">${price}$</p> <!-- Display product price -->
            <a href="details.html?id=${id}" class="product-link">
                <button class="add-to-cart">Add to Cart</button>
            </a>
        `;
        productLink.appendChild(productDiv); // Append the product div to the link
        out.appendChild(productLink); // Append the link to the container

        // Prevent the default action when clicking on the "Add to Cart" button
        const addToCartButton = productDiv.querySelector('.add-to-cart');
        addToCartButton.addEventListener('click', (event) => {
            event.preventDefault();
            // Call a function to add the product to the shopping cart
            addToCart(product);
        });
    });
}

// Function to fetch products from the API
const getProducts = () => {
    const api = "https://v2.api.noroff.dev/gamehub";
    fetch(api)
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
            return response.json();
        })
        .then(obj => {
            console.log(obj);
            const allProducts = obj.data; // Get all products
            displayFilteredProducts(allProducts); // Display all products initially

            // Event listener for checkbox changes
            filters.addEventListener("change", () => {
                const filteredProducts = filterProducts(allProducts);
                displayFilteredProducts(filteredProducts);
            });
        })
        .catch(error => console.error(error.message));
};

// Call getProducts initially to fetch and display all products
getProducts();