import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { getParam } from "./utils.mjs";

// Read the category from the URL, such as ?category=tents.
const category = getParam("category") || "tents";

// Display names for the page title.
const categoryNames = {
  tents: "Tents",
  backpacks: "Backpacks",
  "sleeping-bags": "Sleeping Bags",
  hammocks: "Hammocks",
};

// Update the title to show the category, e.g. "Top Products: Backpacks".
const title = document.querySelector(".title");
if (title && categoryNames[category]) {
  title.textContent = `Top Products: ${categoryNames[category]}`;
}

// Create the data source (the API), then the list for this category.
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);
myList.init();
