import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="../product_pages/?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData(this.category);

    this.renderList(this.products);

    const sortSelect = document.querySelector("#sort-products");

    if (sortSelect) {
      sortSelect.addEventListener("change", () => {
        this.sortProducts(sortSelect.value);
      });
    }
  }

  sortProducts(sortOption) {
    const sortedProducts = [...this.products];

    switch (sortOption) {
      case "name-asc":
        sortedProducts.sort((a, b) =>
          a.Name.localeCompare(b.Name)
        );
        break;

      case "price-asc":
        sortedProducts.sort(
          (a, b) => Number(a.FinalPrice) - Number(b.FinalPrice)
        );
        break;

      case "price-desc":
        sortedProducts.sort(
          (a, b) => Number(b.FinalPrice) - Number(a.FinalPrice)
        );
        break;

      default:
        break;
    }

    this.renderList(sortedProducts);
  }

  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list
    );
  }
}
