// Import the helper that reads data from the browser's localStorage.
import { loadHeaderFooter } from "./utils.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

// Find the element on the page that the cart will fill in.
const listElement = document.querySelector(".product-list");
const totalElement = document.getElementById("cart-total-container");

// Show the header and footer.
loadHeaderFooter();

// Create the cart and display it, the same way ProductList is started.
const cart = new ShoppingCart("so-cart", listElement, totalElement);
cart.init();
