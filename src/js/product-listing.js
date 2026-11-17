// Import the helpers for the header, footer. and URL parameters.
import { loadHeaderFooter } from "./utils.mjs";
// Import the badge updater so it runs once the header is on the page.
import { updateCartCount } from "./cart-count.js"
// Import the class that builds the list of products cards.
import ProductData from "./ProductData.mjs";
// Import the class that builds the list of product cards.
import ProductList from "./ProductList.mjs";


// Load the header footer, then updated the cart badge.
loadHeaderFooter(updateCartCount);

// Create a data source for the "tents" category (reads tents.json)
const dataSource = new ProductData("tents");

// Find the <ul> on this page where the product cards will go.
const listElement = document.querySelector(".product-list");

// Create the product list for tents and display it.
const productList = new ProductList("tents", dataSource, listElement);
productList.init();
