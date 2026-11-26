import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    // Stores the ID of the tent selected by the user.
    this.productId = productId;
    // Creates an empty object to hold the product details later.
    this.product = {};
    // Provides access to the product data source. 
    this.dataSource = dataSource;
  }


  // Initializes the product details by retrieving the selected product, 
  // displaying it, and setting up the Add to Cart button.
  async init() {
    // Retrieves the selected product using its ID and stores its details.
    this.product = await this.dataSource.findProductById(this.productId);

    // Displays the selected product details.
    this.renderProductDetails();

    // NEW: displays the breadcrumb trail for this product.
    this.renderBreadcrumb();


    // Adds an event listener to the Add to Cart button.
    document
      .getElementById("addToCart")
      .addEventListener("click", () => {
        console.log("Add to Cart clicked");
        this.addProductToCart(this.product);
      });
  }

  addProductToCart(product) {
    // Retrieves existing products; Creates an empty array if no cart exists
    let cart = getLocalStorage("so-cart") || [];
    // Make sure cart is an array
    if (!Array.isArray(cart)) {
      cart = [cart];
    }

    // Check whether the product already exists
    const existingProduct = cart.find((item) => item.Id === product.Id);

    if (existingProduct) {
      // Increase its quantity
      existingProduct.Quantity = (existingProduct.Quantity || 1) + 1;
    } else {
      // Adds the new product to the array
      cart.push({ ...product, Quantity: 1 });
    }

    // Saves the updated array
    setLocalStorage("so-cart", cart);
    window.dispatchEvent(new Event("cartUpdated"));

    // Confirm to the user that the item was added
    alertMessage(`${product.Name} was added to your cart.`);
  }

  // Builds the price block. If the product is on sale, it shows the
  // original price crossed out, the sale price, and a badge with the savings.
  priceTemplate() {
    const original = Number(this.product.SuggestedRetailPrice);
    const sale = Number(this.product.FinalPrice);

    // No discount: show the normal price only
    if (!(original > sale)) {
      return `<p class="product-card__price">$${sale.toFixed(2)}</p>`;
    }

    const savings = original - sale;
    const percent = Math.round((savings / original) * 100);

    return `
        <div class="product-detail__price">
            <p class="product-detail__original">$${original.toFixed(2)}</p>
            <p class="product-card__price">$${sale.toFixed(2)}</p>
            <span class="discount-badge">Save $${savings.toFixed(2)} (${percent}% off)</span>
        </div>`;
  }

  // Dynamically displays the selected product's details by 
  // inserting its information into the product-detail section.
  renderProductDetails() {
    document.querySelector(".product-detail").innerHTML = `
        <h3>${this.product.Brand.Name}</h3>
        <h2 class="divider">${this.product.NameWithoutBrand}</h2>
        <img class="divider" src="${this.product.Images?.PrimaryLarge || this.product.Image || ""}" alt="${this.product.NameWithoutBrand}">
        ${this.priceTemplate()}
        <p class="product__color">${this.product.Colors[0].ColorName}</p>
        <p class="product__description">${this.product.DescriptionHtmlSimple}</p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
        </div>
    `;
  }

  // Builds the breadcrumb trail: Home > Tents > Product Name
  renderBreadcrumb() {
    const breadcrumb = document.querySelector("#breadcrumb");

    // Stop if the breadcrumb element does not exist.
    if (!breadcrumb) {
        return;
    }

    breadcrumb.innerHTML = `
        <a href="/index.html">Home</a> &gt;
        <a href="/index.html">Tents</a> &gt;
        <span>${this.product.NameWithoutBrand}</span>
    `;
}
}