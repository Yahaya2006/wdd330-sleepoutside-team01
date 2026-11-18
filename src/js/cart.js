// Import the helpers that read and save data in the browser's localStorage.
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// Reads the cart from localStorage and displays every item on the page.
function renderCartContents() {
  // Get the saved cart. If nothing is stored yet (empty cart),
  // use an empty array so .map() doesn't crash.
  const cartItems = getLocalStorage("so-cart") ?? [];

  // Turn each cart item into an HTML string using the template below.
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));

  // Insert all the item HTML into the product list on the cart page.
  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  // Make each X button remove its item when clicked.
  addRemoveListeners();

  // Show the total below the list (only when the cart has items).
  renderCartTotal(cartItems);
}

// Builds the HTML for a single cart item from its product data.
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <!-- The X removes this item. data-id tells us which product to remove. -->
  <span class="cart-card__remove" data-id="${item.Id}" title="Remove from cart">X</span>
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

// Attaches a click listener to every X button in the cart.
function addRemoveListeners() {
  document.querySelectorAll(".cart-card__remove").forEach((button) => {
    button.addEventListener("click", () => {
      removeItemFromCart(button.dataset.id);
    });
  });
}

// Removes one item from the cart, saves the cart, and re-renders it.
function removeItemFromCart(productId) {
  // Get the current cart, or an empty array if none is saved.
  const cart = getLocalStorage("so-cart") ?? [];

  // Keep every item except the one with this ID.
  // Compare as strings because data-id values are always text.
  const updatedCart = cart.filter((item) => String(item.Id) !== String(productId));

  // Save the updated cart back to localStorage.
  setLocalStorage("so-cart", updatedCart);

  // Redraw the list and total without the removed item.
  renderCartContents();
}

// Adds up the price of every item, multiplied by its quantity.
function calculateTotal(cartItems) {
  return cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.Quantity || 1),
    0,
  );
}

// Shows the cart total on the page, but only if the cart has items.
function renderCartTotal(cartItems) {
  const container = document.querySelector("#cart-total-container");

  // Clear any total that was shown before.
  container.innerHTML = "";

  // Empty cart: show nothing.
  if (cartItems.length === 0) {
    return;
  }

  // Copy the template's content so the original stays unchanged.
  const template = document.querySelector("#cart-total-template");
  const clone = template.content.cloneNode(true);

  // Fill in the total, formatted with two decimal places.
  clone.querySelector(".cart-total__amount").textContent =
    calculateTotal(cartItems).toFixed(2);

  // Add the filled-in copy to the page.
  container.appendChild(clone);
}

renderCartContents();
