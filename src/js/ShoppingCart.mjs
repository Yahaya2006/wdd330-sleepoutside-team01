// import the helpers this module needs form utils.mjs
import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

// Builds the HTML for a single cart item from its product data.
function cartItemTemplate(item) {
    return `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <!-- Show the saved quantity, or 1 if no quantity was stored -->
  <p class="cart-card__quantity">qty: ${item.Quantity || 1}</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

}

// Displays the items saved in the cart, plus the cart total.
export default class ShoppingCart {
    constructor(key, listElement, totalElement) {
        // The localStorage key the cart is saved under, such as "so-cart".
        this.key = key;
        // The HTML element the cart items will be inserted into
        this.listElement = listElement;
        // The HTML element the total will be inserted into.
        this.totalElement = totalElement;
    }

    // Gets the saved cart and displays it.
    init() {
        // use an empty array if the cart is empty so .map() doesn't crush.
        const list = getLocalStorage(this.key) ?? [];
        this.renderList(list);
        this.renderTotal(list);
    }

    // Turns an array of cart items into HTML and adds them to the page.
    renderList(list) {
        renderListWithTemplate(cartItemTemplate, this.listElement, list, "afterbegin", true);
    }


    // Adds up the price of every item, multiplied by its quantity.
    calculateTotal(list) {
    return list.reduce(
        (sum, item) => sum + item.FinalPrice * (item.Quantity || 1),
        0,
        );
    }

    // Shows the cart total on the page, but only if the cart has items.
    renderTotal(list) {

        // Clear any total that was shown before.
        this.totalElement.innerHTML = "";

        // Empty cart: show nothing.
        if (list.length === 0) {
            return;
        }

        // Copy the template's content so the original stays unchanged.
        const template = document.querySelector("#cart-total-template");
        const clone = template.content.cloneNode(true);

        // Fill in the total, formatted with two decimal places.
        clone.querySelector(".cart-total__amount").textContent =
            this.calculateTotal(list).toFixed(2);

        // Add the filled-in copy to the page.
        this.totalElement.appendChild(clone);
    }
}
