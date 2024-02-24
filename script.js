console.log("Gamehub");


const out = document.querySelector("div#container");

const postProducts = (products) => {
    out.innerHTML = ''; // Clear the container first
    products.forEach(product => {
        const { id, title, discountedPrice, image, price } = product; // Destructure relevant properties from the product object
        const productLink = document.createElement('a'); // Create a link for each product
        productLink.href = `details.html?id=${id}`; // Set the href attribute of the link
        productLink.classList.add('product-link'); // Add a class to the link for styling
        const productDiv = document.createElement('div'); // Create a new div for each product
        productDiv.classList.add('product'); // Add a class to the product div for styling
        productDiv.innerHTML = `
            <img src="${image.url}" alt="${image.alt}">
            <h2>${title}</h2>
            <p class="discountedprice">${discountedPrice}$</p>
            <p class="price">${price}$</p>
        `;
        productLink.appendChild(productDiv); // Append the product div to the link
        out.appendChild(productLink); // Append the link to the container
    });
};

const getProducts = () => {
    const api = "https://v2.api.noroff.dev/gamehub"; 
    fetch(api)
        .then((response) => {
            if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
            return response.json();
        })
        .then(obj => {
            console.log(obj);
            // Filter products based on the 'onSale' property being true
            const onSaleProducts = obj.data.filter(product => product.onSale === true);
            postProducts(onSaleProducts); // Display products on sale
        })
        .catch(error => console.error(error.message));
};

// Call getProducts initially to display the products on sale
getProducts();
