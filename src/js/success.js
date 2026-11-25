// success.js - page script for checkout/success.html
import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./cart-count.js";

// Load the header and footer, then update the cart badge (cart is now empty)
loadHeaderFooter(updateCartCount);
