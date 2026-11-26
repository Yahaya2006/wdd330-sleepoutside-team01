import { getLocalStorage, alertMessage } from "./utils.mjs";
export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
  }

  calculateItemSummary() {
    const itemCount = this.list.reduce(
      (sum, item) => sum + (item.Quantity || 1),
      0,
    );

    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice * (item.Quantity || 1),
      0,
    );

    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;
    this.tax = this.itemTotal * 0.06;
    this.orderTotal = this.itemTotal + this.shipping + this.tax;

    this.renderSummary();
  }

  renderSummary() {
    const element = document.querySelector(this.outputSelector);

    if (!element) return;

    element.innerHTML = `
      <h3>Order Summary</h3>
      <p>Subtotal: $${this.itemTotal.toFixed(2)}</p>
      <p>Tax (6%): $${this.tax.toFixed(2)}</p>
      <p>Shipping: $${this.shipping.toFixed(2)}</p>
      <hr>
      <p><strong>Order Total: $${this.orderTotal.toFixed(2)}</strong></p>
    `;
  }

   async checkout(order, externalServices) {
  try {
    await externalServices.checkout(order);

    // Clear cart after successful order
    localStorage.removeItem(this.key);

    // Redirect to success page
    window.location.href = "./success.html";

    return true;
  } catch (err) {
    const errorDetails =
      typeof err.message === "string"
        ? err.message
        : JSON.stringify(err.message);

    alertMessage(`Checkout failed: ${errorDetails}`);
    return false;
  }
}
 
}