// Keeps the header cart badge and its accessible label in sync with saved cart quantities.
import { getLocalStorage } from "./utils.mjs";

function updateCartCount() {
  const badge = document.querySelector("[data-cart-count]");
  const cartLink = document.querySelector(".cart a");

  if (!badge || !cartLink) {
    return;
  }

  const cartItems = getLocalStorage("so-cart") ?? [];
  const itemCount = Array.isArray(cartItems)
    ? cartItems.reduce((total, item) => total + (Number(item.Quantity) || 1), 0)
    : 0;

  badge.textContent = itemCount;
  badge.hidden = itemCount === 0;
  cartLink.setAttribute(
    "aria-label",
    `Shopping cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`,
  );
}

updateCartCount();
window.addEventListener("cartUpdated", updateCartCount);
window.addEventListener("storage", updateCartCount);
