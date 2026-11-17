// Import the helpers for the header, footer. and URL parameters.
import { loadHeaderFooter, getParam } from "./utils.mjs";
// Import the badge updater so it runs once the header is on the page.
import { updateCartCount } from "./cart-count.js"
// Import the class that builds the list of products cards.
import ProductData from "./ProductData.mjs";
// Import the class that builds the list of product cards.
import ProductList from "./ProductList.mjs";


// Load the header footer, then updated the cart badge.
loadHeaderFooter(updateCartCount);

// Turns a URL category like "sleeping-bags" into a readable name: "Sleeping Bags".
function formatCategory(name) {
    return name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");        
}

// Read the category from the URL (e.g. ?category=backpacks).
const category = getParam("category");

// Show the category in the page heading. e.g. "Top Products Backpacks"
// The "if" avoids an error when the URL has no ?category=value.
if (category) {
    document.querySelector("#listing-title").textContent =
        `Top Products: ${formatCategory(category)}`;
}


// Create the data source (it talks to the API).
const dataSource = new ProductData();

// Find the <ul> on this page where the product cards will go.
const listElement = document.querySelector(".product-list");

// Create the product list for tents and display it.
const productList = new ProductList(category, dataSource, listElement);
productList.init();
