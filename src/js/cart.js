import ShoppingCart from "./ShoppingCart.mjs";
import { loadHeaderFooter } from "./utils.mjs";

const listElement = document.querySelector(".product-list");
const shoppingCart = new ShoppingCart(listElement);
const itemsInCart = shoppingCart.init();

renderCartTotal(itemsInCart);
loadHeaderFooter();

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