// Import the helpers for the header, footer. and URL parameters.
import { loadHeaderFooter, getParam } from "./utils.mjs";
// Import the badge updater so it runs once the header is on the page.
import { updateCartCount } from "./cart-count.js"
// Import the class that builds the list of products cards.
import ExternalServices from "./ExternalServices.mjs";
// Import the class that builds the list of product cards.
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

// Create the data source (it talks to the API).
const dataSource = new ExternalServices();

// Find the <ul> on this page where the product cards will go.
// Select the product list element.
const listElement = document.querySelector(".product-list");

// Search: use the search term and turn on search mode (4th argument).
// Otherwise show the category as before.
const productList = searchTerm
  ? new ProductList(searchTerm, dataSource, listElement, true)
  : new ProductList(category, dataSource, listElement);

productList.init();
