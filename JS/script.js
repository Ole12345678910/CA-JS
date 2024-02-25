
console.log("Gamehub");

const container = document.querySelector("div#container");

const displayProducts = (products) => {
    container.innerHTML = ''; // Clear the container first
    products.forEach(product => {
        const { id, title, discountedPrice, image, price } = product; // Destructure relevant properties from the product object
        const productLink = document.createElement('a'); // Create a link for each product
        productLink.href = `details.html?id=${id}`; // Set the href attribute of the link
        productLink.classList.add('product-link'); // Add a class to the link for styling
        const productArticle = document.createElement('article'); // Create a new article for each product
        productArticle.classList.add('product'); // Add a class to the product article for styling
        productArticle.innerHTML = `
            <img src="${image.url}" alt="${image.alt}">
            <h2>${title}</h2>
            <p class="discounted-price">${discountedPrice}$</p>
            <p class="regular-price">${price}$</p>
        `;
        productLink.appendChild(productArticle); // Append the product article to the link
        container.appendChild(productLink); // Append the link to the container
    });
};

const fetchProducts = async () => {
    try {
        const api = "https://v2.api.noroff.dev/gamehub";
        const response = await fetch(api);
        if (!response.ok) {
            throw new Error(`HTTP error! ${response.status}`);
        }
        const obj = await response.json();
        console.log(obj);
        return obj.data.filter(product => product.onSale === true); // Filter products based on the 'onSale' property being true
    } catch (error) {
        console.error(error.message);
        return [];
    }
};

// Call fetchProducts initially to display the products on sale
fetchProducts().then(displayProducts);
