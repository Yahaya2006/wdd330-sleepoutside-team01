// product-listing.js
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./cart-count.js";

// Load the shared header and footer, then update the cart badge.
loadHeaderFooter(updateCartCount);

// Read both possible URL parameters:
//   ?category=tents      (from the category links)
//   ?search=sleeping bag (from the navbar search form)
const searchTerm = getParam("search");
const category = getParam("category") || "tents";

// Update the page title.
const titleElement = document.querySelector("#product-list-title");

if (searchTerm) {
  // Search results title
  titleElement.textContent = `Search results for: ${searchTerm}`;
} else {
  // Category title, e.g. "sleeping-bags" -> "Sleeping Bags"
  const categoryName = category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  titleElement.textContent = `Top Products: ${categoryName}`;
}

// Create the API data source.
const dataSource = new ExternalServices();

// Select the product list element.
const listElement = document.querySelector(".product-list");

// Search: use the search term and turn on search mode (4th argument).
// Otherwise show the category as before.
const productList = searchTerm
  ? new ProductList(searchTerm, dataSource, listElement, true)
  : new ProductList(category, dataSource, listElement);

productList.init();