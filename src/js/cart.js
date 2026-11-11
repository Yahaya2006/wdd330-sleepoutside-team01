// Import the helper that reads data from the browser's localStorage.
import { getLocalStorage } from "./utils.mjs";

// Reads the cart from localStorage and displays every item on the page.
function renderCartContents() {
  // Get the saved cart. If nothing is stored yet (empty cart),
  // use an empty array so .map() doesn't crash.
  const cartItems = getLocalStorage("so-cart") ?? [];

  // Turn each cart item into an HTML string using the template below.
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  // Insert all the item HTML into the product list on the cart page.
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
}


// Builds the HTML for a single cart item from its product data.
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <!-- Show the saved quantity, or 1 if no quantity was stored -->
  <p class="cart-card__quantity">qty: ${item.Quantity || 1}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();
