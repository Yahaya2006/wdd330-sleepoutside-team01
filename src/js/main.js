// Import the header/footer loader.
import { loadHeaderFooter } from "./utils.mjs";
// Import the badge updater so it can run once the header is on the page.
import { updateCartCount } from "./cart-count.js";

// Load the header and footer, then update the cart badge.
loadHeaderFooter(updateCartCount);
