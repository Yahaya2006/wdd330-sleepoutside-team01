// Import the shared function that renders a list using a template.
import { renderListWithTemplate } from "./utils.mjs";


// Builds the HTML for one product card from a product object.
function productCardTemplate(product, category) {
  return `<li class="product-card">
    <a href="../product_pages/?product=${product.Id}&category=${encodeURIComponent(category)}">
      <img src="${product.Images.PrimaryMedium}" alt="${product.Name}" />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}



// Creates a list of product cards for one category (e.g. "tents").
export default class ProductList {
    constructor(category, dataSource, listElement) {
        // The product category, such as "tents".
        this.category = category;
        // The object that fetches the product data (a ProductData instance).
        this.dataSource = dataSource;
        // The HTML element the cards will be inserted into.
        this.listElement = listElement;
    }


    // Gets the product data, then displays it.
    async init() {

        // Wait for the selected category's products.
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
    }

    // Turns an array of products into HTML cards and adds them to the page.
    renderList(list) {
        // Use the shared utility to render the product cards.
        renderListWithTemplate(
            (product) => productCardTemplate(product, this.category),
            this.listElement,
            list,
        );
    }
}
