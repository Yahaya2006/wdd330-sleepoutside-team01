// CheckoutProcess.mjs
import { getLocalStorage, setLocalStorage, alertMessage, removeAllAlerts } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// Turns the form fields into a plain object like { fname: "John", ... }
function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const result = {};
  formData.forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

// Keeps only the fields the server wants for each cart item.
function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.Quantity || 1,
  }));
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;                       // localStorage key of the cart
    this.outputSelector = outputSelector; // order summary container
    this.list = [];
    this.itemCount = 0;
    this.itemTotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
  }

  // Runs when the page loads
  init() {
    this.list = getLocalStorage(this.key) ?? [];
    this.calculateItemSubTotal();
  }

  // Calculates and displays the subtotal
  calculateItemSubTotal() {
    this.itemCount = this.list.reduce(
      (count, item) => count + (item.Quantity || 1),
      0,
    );
    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice * (item.Quantity || 1),
      0,
    );
    document.querySelector(`${this.outputSelector} #subtotal`).innerText =
      `$${this.itemTotal.toFixed(2)}`;
  }

  // Calculates and displays tax, shipping and order total.
  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06; // 6% sales tax
    // $10 for the first item + $2 for each additional item
    this.shipping = this.itemCount > 0 ? 10 + (this.itemCount - 1) * 2 : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const s = this.outputSelector;
    document.querySelector(`${s} #tax`).innerText = `$${this.tax.toFixed(2)}`;
    document.querySelector(`${s} #shipping`).innerText =
      `$${this.shipping.toFixed(2)}`;
    document.querySelector(`${s} #orderTotal`).innerText =
      `$${this.orderTotal.toFixed(2)}`;
  }

  // Builds the order, sends it, and handles success or failure
  async checkout(formElement) {
    const order = formDataToJSON(formElement);

    order.orderDate = new Date().toISOString();
    order.items = packageItems(this.list);
    order.orderTotal = this.orderTotal.toFixed(2);
    order.shipping = this.shipping;
    order.tax = this.tax.toFixed(2);

    console.log("Order being sent:", order);

    try {
      // Code that can fail goes inside try
      await services.checkout(order);

      // Happy path: empty the cart, update the badge, go to the success page
      setLocalStorage(this.key, []);
      window.dispatchEvent(new Event("cartUpdated"));
      window.location.href = "/checkout/success.html";
    } catch (err) {
      // Unhappy path: stay on the form and show what went wrong
      removeAllAlerts(); // clear old messages first
      const details = err.message;

      if (details && typeof details === "object") {
        // The server sends an object; show each message it contains
        Object.values(details).forEach((msg) =>
          alertMessage(typeof msg === "string" ? msg : JSON.stringify(msg)),
        );
      } else {
        alertMessage(details || "Something went wrong. Please try again.");
      }
    }
  }
}