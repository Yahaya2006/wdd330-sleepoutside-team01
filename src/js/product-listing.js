// Import the class that reads product data from the JSON files.
import ProductData from "./ProductData.mjs";
// Import the class that builds the list of product cards.
import ProductList from "./ProductList.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";

const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
const category = getParam("category") ?? "tents";

if (!categories.includes(category)) {
  throw new Error(`Unsupported product category: ${category}`);
}

const dataSource = new ProductData(category);
const listElement = document.querySelector(".product-list");
const categoryName = category
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");
document.querySelector("#product-list-title").textContent =
  `Top Products: ${categoryName}`;

const productList = new ProductList(category, dataSource, listElement);
productList.init();
loadHeaderFooter();