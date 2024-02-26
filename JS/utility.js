// Function to add a product to the cart
export function addToCart(product, cart) {
  cart.push(product); // Add the product to the cart array
  localStorage.setItem("cart", JSON.stringify(cart)); // Update the cart in local storage
}

// Function to filter products based on selected genres
export function filterProducts(products, filters) {
  // Extract the selected genres from the filters
  const selectedGenres = Array.from(
    filters.querySelectorAll("input[type='checkbox']")
  )
    .filter((checkbox) => checkbox.checked) // Filter only checked checkboxes
    .map((checkbox) => checkbox.name); // Extract the genre name from each checkbox

  // Return all products if no genre is selected, otherwise filter products by selected genres
  return selectedGenres.length === 0
    ? products
    : products.filter((product) => selectedGenres.includes(product.genre));
}

// Function to create a product element
export function createProductElement(product, cart) {
  // Extract necessary product information
  const { id, title, image, price, discountedPrice, onSale } = product;

  // Create a link element for the product
  const productLink = createLink(`details.html?id=${id}`, "product-link");

  // Create a product div element
  const productDiv = createProductDiv(
    image.url,
    title,
    price,
    discountedPrice,
    onSale
  );

  // Create an "Add to Cart" button
  const addToCartButton = createAddToCartButton(product, cart);

  // Append elements to each other to form the product structure
  productLink.appendChild(productDiv);
  productDiv.appendChild(addToCartButton);

  return productLink; // Return the product link containing all elements
}

// Function to create a link element
export function createLink(href, className) {
  const link = document.createElement("a");
  link.href = href; // Set the href attribute
  link.classList.add(className); // Add specified class to the link
  return link; // Return the created link element
}

// Function to create a product div
export function createProductDiv(
  imageUrl,
  title,
  price,
  discountedPrice,
  onSale
) {
  const productDiv = document.createElement("div"); // Create a div element
  productDiv.classList.add("product"); // Add the 'product' class to the div

  // Check if the product is on sale and if a discounted price is available
  const displayDiscountedPrice = onSale && discountedPrice !== undefined;

  // Populate the product div with HTML content
  productDiv.innerHTML = `
        <img src="${imageUrl}" alt="${title}">
        <h2>${title}</h2>
        ${
          displayDiscountedPrice
            ? `<p class="discounted-price">${discountedPrice}$</p>`
            : ""
        }
        <p class="priceinfo">${price}$</p>
    `;

  return productDiv; // Return the created product div
}

// Function to create an "Add to Cart" button
export function createAddToCartButton(product, cart) {
  const addToCartButton = document.createElement("button"); // Create a button element
  addToCartButton.textContent = "Add to Cart"; // Set the button text content
  addToCartButton.classList.add("add-to-cart"); // Add the 'add-to-cart' class to the button

  // Add an event listener to handle clicks on the button
  addToCartButton.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    addToCart(product, cart); // Add the product to the cart when the button is clicked
  });

  return addToCartButton; // Return the created "Add to Cart" button
}

// Function to create a cart item element
export function createCartItem(item, removeFromCart) {
  const listItem = document.createElement("div"); // Create a div element
  listItem.classList.add("cart-item"); // Add the 'cart-item' class to the div

  // Create details for the cart item
  const details = createCartItemDetails(item);

  // Create a remove button for the cart item
  const removeButton = createRemoveButton(item, removeFromCart);

  // Append the remove button to the details
  details.appendChild(removeButton);

  // Append the details to the list item
  listItem.appendChild(details);

  return listItem; // Return the created cart item
}

// Function to create details for a cart item
function createCartItemDetails(item) {
  const details = document.createElement("div"); // Create a div element
  details.classList.add("cart-product-details"); // Add the 'cart-product-details' class to the div

  // Populate the details div with HTML content
  details.innerHTML = `
        <img src="${item.image.url}" alt="${item.title}" class="product-image">
        <h2>${item.title}</h2>
        <p>Price: ${item.price}$</p>
        <p>Discounted Price: ${item.discountedPrice || "N/A"}</p>
    `;

  return details; // Return the created details element
}

// Function to create a remove button for a cart item
function createRemoveButton(item, removeFromCart) {
  const removeButton = document.createElement("button"); // Create a button element
  removeButton.textContent = "Remove"; // Set the button text content
  removeButton.classList.add("remove-button"); // Add the 'remove-button' class to the button

  // Add an event listener to handle clicks on the button
  removeButton.addEventListener("click", () => removeFromCart(item));

  return removeButton; // Return the created remove button
}

// Function to display an empty cart message
export function displayEmptyCartMessage(container) {
  container.innerHTML =
    '<div class="empty-cart-message">Your cart is empty...</div>'; // Display a message indicating that the cart is empty
}

// Function to display a product
export function displayProduct(product, out, cart) {
  const productElement = createProductElement(product, cart); // Create a product element
  out.appendChild(productElement); // Append the product element to the specified container
}

// Function to display multiple products
export function displayProducts(container, products, cart) {
  container.innerHTML = ""; // Clear the container before displaying products
  products.forEach((product) => {
    const productElement = createProductElement(product, cart); // Create a product element for each product
    container.appendChild(productElement); // Append the product element to the container
  });
}

// Function to display product details in the DOM
export function displayProductDetail(product, container) {
  // Extract product details
  const {
    title,
    discountedPrice,
    image = {},
    price,
    genre,
    released,
    description,
    ageRating,
    onSale,
  } = product;

  // Create a div element for the product
  const productDiv = document.createElement("div");
  productDiv.classList.add("product"); // Add the 'product' class to the div

  // Set the image HTML with conditional source and alt attributes
  const imageUrl = image.url || "";
  const imageAlt = image.alt || "";

  // Create HTML content for the discounted price if applicable
  const discountedPriceHTML =
    onSale && discountedPrice
      ? `<p>Discounted Price: ${discountedPrice}$</p>`
      : "";

  // Populate the product div with HTML content
  productDiv.innerHTML = `
        <img src="${imageUrl}" alt="${imageAlt}">
        <h2>${title}</h2>
        <p>${price}$</p>
        ${discountedPriceHTML}
        <p>${genre}</p>
        <p>${released}</p>
        <p>${description}</p>
        <p>${ageRating}</p>
    `;

  // Append the product div to the container
  container.appendChild(productDiv);
}
