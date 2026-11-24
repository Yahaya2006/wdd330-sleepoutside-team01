import { loadHeaderFooter, setLocalStorage } from "./utils.mjs";

// Import the badge updater so it can run once the header is on the page.
import { updateCartCount } from "./cart-count.js";
import CheckoutProcess from "./CheckoutProcess.mjs";

// Load the header and footer, then update the cart badge.
loadHeaderFooter(updateCartCount);

// "so-cart" must match the key your cart is saved under
const CART_KEY = "so-cart";

const order = new CheckoutProcess(CART_KEY, ".order-summary");
order.init(); // subtotal is calculated on page load

// Tax, shipping and total are calculated once the zip code is filled in
document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

// "submit" only fires when every required field is valid
document
  .querySelector("#checkout-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // stop the page reloading

    order.calculateOrderTotal(); // make sure totals are current

    try {
      const response = await order.checkout(event.target);
      console.log("Order response:", response);

      setLocalStorage(CART_KEY, []);                    // empty the cart
      window.dispatchEvent(new Event("cartUpdated"));   // update the header badge
      alert("Order placed successfully!");
      window.location.href = "/";                       // back to the home page
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Checkout failed. Please check your details and try again.");
    }
  });