// import the helpers this module needs form utils.mjs
import {
    getLocalStorage,
    setLocalStorage,
    renderListWithTemplate
} from "./utils.mjs";

// Builds the HTML for a single cart item from its product data.
function cartItemTemplate(item) {
    return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
        <img
            src="${item.Images?.PrimaryMedium || item.Image || ""}"
            alt="${item.Name}"
        />
    </a>
    <a href="#">
        <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "N/A"}</p>
    <!-- Quantity controls: data-id tells us which product to change -->
    <div class="cart-card__quantity">
    <button class="qty-btn" data-action="decrease" data-id="${item.Id}" aria-label="Decrease quantity">&minus;</button>
    <span class="qty-value">${item.Quantity || 1}</span>
    <button class="qty-btn" data-action="increase" data-id="${item.Id}" aria-label="Increase quantity">+</button>
  </div>
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

        // One listener on the whole list
        // It keeps working after the list is redrawn, so we only add it once.
        this.listElement.addEventListener("click", (event) =>
            this.handleQuantityClick(event),
        );
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

    // Runs when anything in the list is clicked.
    handleQuantityClick(event) {
        // Did the click land on a + or - button? If not, ignore it.
        const button = event.target.closest(".qty-btn");
        if (!button) return;

        // Reads which product and which direction form the button's data attributes.
        const id = button.dataset.id;
        const change = button.dataset.action === "increase" ? 1 : -1;

        this.changeQuantity(id, change);
    }


    // Changes one item's quantity, saves the cart, and redraws the page.
    changeQuantity(id, change) {
        let cart = getLocalStorage(this.key) ?? [];

        // Find the product that was clicked.
        const item = cart.find((product) => product.Id === id);
        if (!item) return;

        // Apply the change 
        item.Quantity = (item.Quantity || 1) + change;

        // A quantity of 0 or less removes the item from the cart.
        if (item.Quantity <= 0) {
            cart = cart.filter((product) => product.Id !== id);
        }

        // Save, then redraw the list and the total.
        setLocalStorage(this.key, cart);
        this.renderList(cart);
        this.renderTotal(cart);

        // Tell the header badge to update its count.
        window.dispatchEvent(new Event("cartUpdated"));
    }
    
}
