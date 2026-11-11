
import ProductData from "./ProductData.mjs";
import { qs } from "./utils.mjs";

const dataSource = new ProductData("tents");

function productDetailsTemplate(product) {
  return `
    <section class="product-detail">
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${product.Image}"
        alt="${product.Name}"
      />

      <p class="product-card__price">$${product.FinalPrice}</p>

      <p class="product__color">
        ${product.Colors?.[0]?.ColorName || "Color not specified"}
      </p>

      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">
          Add to Cart
        </button>
      </div>
    </section>
  `;
}

export default class ProductDetails {
  constructor(productId, dataSource, detailElement) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.detailElement = detailElement;
  }

  async init() {
    const product = await this.dataSource.findProductById(this.productId);

    if (!product) {
      this.detailElement.innerHTML = "<p>Product not found.</p>";
      return;
    }

    this.renderProductDetails(product);
  }

  renderProductDetails(product) {
    this.detailElement.innerHTML = productDetailsTemplate(product);

    qs("#addToCart").addEventListener("click", async (event) => {
      const selectedProduct = await this.dataSource.findProductById(
        event.target.dataset.id,
      );

      const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
      cartItems.push(selectedProduct);
      localStorage.setItem("so-cart", JSON.stringify(cartItems));
    });
  }
}
