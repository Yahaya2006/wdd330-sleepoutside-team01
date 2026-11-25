import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";
import { updateCartCount } from "./cart-count.js";

// Find the elements where cart items and total will be displayed.
const listElement = document.querySelector(".product-list");
const totalElement = document.getElementById("cart-total-container");

// Load the header and footer, then update the cart badge.
loadHeaderFooter(updateCartCount);

// Create the shopping cart and display its contents.
const cart = new ShoppingCart("so-cart", listElement, totalElement);
cart.init();
