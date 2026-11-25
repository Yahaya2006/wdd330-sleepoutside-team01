import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./cart-count.js";
import CheckoutProcess from "./CheckoutProcess.mjs";
import ExternalServices from "./ExternalServices.mjs";

loadHeaderFooter(updateCartCount);

const checkout = new CheckoutProcess("so-cart", "#order-summary");
const externalServices = new ExternalServices();

checkout.init();

const form = document.querySelector("#checkout-form");
const message = document.querySelector("#checkout-message");

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.Quantity || 1,
  }));
}

async function checkoutFormHandler(event) {
  event.preventDefault();

  const cartItems = getLocalStorage("so-cart") || [];

  if (cartItems.length === 0) {
    message.textContent = "Your cart is empty.";
    return;
  }

  const order = formDataToJSON(form);

  order.orderDate = new Date().toISOString();
  order.orderTotal = checkout.orderTotal.toFixed(2);
  order.tax = checkout.tax.toFixed(2);
  order.shipping = checkout.shipping;
  order.items = packageItems(cartItems);

  try {
    await externalServices.checkout(order);
    message.textContent = "Order submitted successfully!";
  } catch {
    message.textContent = "Unable to submit your order. Please try again.";
  }
}

form.addEventListener("submit", checkoutFormHandler);