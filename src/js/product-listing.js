import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

// Get the category from the URL.
const category = getParam("category") || "tents";

// Update the page title with the selected category.
const titleElement = document.querySelector("#product-list-title");

const categoryName = category
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

titleElement.textContent = `Top Products: ${categoryName}`;

// Create the API data source.
const dataSource = new ProductData();

// Select the product list element.
const listElement = document.querySelector(".product-list");

// Display the products.
const productList = new ProductList(category, dataSource, listElement);
productList.init();
