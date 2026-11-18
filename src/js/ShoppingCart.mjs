import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

// Builds the HTML for a single cart item.
function cartItemTemplate(item) {
  const image = item.Images?.PrimaryMedium || item.Image || "";
  const color = item.Colors?.[0]?.ColorName || "N/A";

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${color}</p>
    <p class="cart-card__quantity">qty: ${item.Quantity || 1}</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

// Displays the items saved in the cart, plus the cart total.
export default class ShoppingCart {
  constructor(key, listElement, totalElement) {
    this.key = key;
    this.listElement = listElement;
    this.totalElement = totalElement;
  }

  // Gets the saved cart and displays it.
  init() {
    const list = getLocalStorage(this.key) ?? [];
    this.renderList(list);
    this.renderTotal(list);
  }

  // Displays the cart items.
  renderList(list) {
    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      list,
      "afterbegin",
      true
    );
  }

  // Calculates the total price.
  calculateTotal(list) {
    return list.reduce(
      (sum, item) => sum + item.FinalPrice * (item.Quantity || 1),
      0
    );
  }

  // Displays the cart total.
  renderTotal(list) {
    this.totalElement.innerHTML = "";

    if (list.length === 0) {
      return;
    }

    const template = document.querySelector("#cart-total-template");
    const clone = template.content.cloneNode(true);

    clone.querySelector(".cart-total__amount").textContent =
      this.calculateTotal(list).toFixed(2);

    this.totalElement.appendChild(clone);
  }
}

