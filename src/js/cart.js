// Import the helper that reads data from the browser's localStorage.
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
// Import the badge updater so it can run once the header is on the page.
import { updateCartCount } from "./cart-count.js";

// Find the element on the page that the cart will fill in.
const listElement = document.querySelector(".product-list");
const totalElement = document.getElementById("cart-total-container");

// Load the header and footer, then update the cart badge.
loadHeaderFooter(updateCartCount);

// Create the cart and display it, the same way ProductList is started.
const cart = new ShoppingCart("so-cart", listElement, totalElement);
cart.init();
