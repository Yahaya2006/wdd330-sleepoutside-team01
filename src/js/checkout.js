// checkout.js - page script for checkout/index.html
import { loadHeaderFooter } from "./utils.mjs";

// Import the badge updater so it can run once the header is on the page.
import { updateCartCount } from "./cart-count.js";
import CheckoutProcess from "./CheckoutProcess.mjs";
import { validateForm, setupLiveValidation } from "./checkoutValidation.mjs";

// Load the header and footer, then update the cart badge.
loadHeaderFooter(updateCartCount);

// "so-cart" must match the key your cart is saved under
const CART_KEY = "so-cart";

const form = document.querySelector("#checkout-form");
const zip = document.querySelector("#zip");

// Subtotal is calculated on page load
const order = new CheckoutProcess(CART_KEY, ".order-summary");
order.init();

// Show validation messages live while the user types
setupLiveValidation(form);

// When the user leaves the zip field:
zip.addEventListener("blur", () => {
  // 1. Tidy the format: QW198 -> QW-198 (skip this block if you dropped that rule)
  const match = zip.value.match(/^([A-Za-z]{2})-?(\d{3})$/);
  if (match) {
    zip.value = `${match[1].toUpperCase()}-${match[2]}`;
  }

  // 2. Calculate tax, shipping and order total
  order.calculateOrderTotal();
});

// Runs when the user clicks Checkout
form.addEventListener("submit", (event) => {
  event.preventDefault(); // stop the page reloading

  // Stop here if any field is invalid (the user sees which one)
  if (!validateForm(form)) return;

  order.calculateOrderTotal(); // make sure totals are current
  order.checkout(form); // success redirect and error alerts happen inside
});
