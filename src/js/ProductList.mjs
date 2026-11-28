import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const discountPercent = isDiscounted
    ? Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) /
          product.SuggestedRetailPrice) *
          100,
      )
    : 0;
  const discountMarkup = isDiscounted
    ? `<p class="product-card__discount"><span class="product-card__original-price">$${product.SuggestedRetailPrice.toFixed(2)}</span> <span class="product-card__badge">-${discountPercent}%</span></p>`
    : "";

  return `<li class="product-card">
    <a href="../product_pages/?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
      ${discountMarkup}
    </a>
  </li>`;
}

export default class ProductList {
  // isSearch = true means "category" is really a search term
  constructor(category, dataSource, listElement, isSearch = false) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.isSearch = isSearch;
    this.products = [];
  }

  async init() {
    // The request can fail or find nothing, so catch errors and show an empty list
    try {
      // Search by name/brand/category, or just load one category
      this.products = this.isSearch
        ? await this.dataSource.searchProducts(this.category)
        : await this.dataSource.getData(this.category);
    } catch (err) {
      console.error("Could not load products:", err);
      this.products = [];
    }

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
    // Nothing found: show a message instead of a blank page
    if (!list || list.length === 0) {
      this.listElement.innerHTML = ""; // clear any old cards

      // textContent shows the search term as plain text (safe)
      const message = document.createElement("li");
      message.className = "no-results";
      message.textContent = `No products found for "${this.category}". Try another search.`;
      this.listElement.appendChild(message);
      return;
    }

    // clear = true removes the old cards first, so sorting doesn't add duplicates
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true
    );
  }
}