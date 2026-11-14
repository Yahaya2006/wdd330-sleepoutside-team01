import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";
import { loadHeaderFooter } from "./utils.mjs";

// Load the header and footer
loadHeaderFooter();

// Get the product ID from the URL parameter.
const productId = getParam("product");
const category = getParam("category") ?? "tents";
const dataSource = new ProductData(category);

// Creates a ProductDetails instance.
const product = new ProductDetails(productId, dataSource);

// Initializes the product details page.
product.init();

// console.log("Product.js is running");
