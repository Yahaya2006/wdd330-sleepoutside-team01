import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./cart-count.js";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter(updateCartCount);

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chkStatus = myForm.checkValidity();
  myForm.reportValidity();
  if (chkStatus) {
    order.checkout();
  }
});
