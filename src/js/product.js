// Import the helpers: URL parameters, header/footer loading.
import { getParam, loadHeaderFooter } from "./utils.mjs";
// Import the class that fetches product data form the API
import ProductData from "./ProductData.mjs";
// Import the class that displays one product.
import ProductDetails from "./ProductDetails.mjs";
// Import the badge updater so it can run once the header is on the page.
import { updateCartCount } from "./cart-count.js";

// Load the header and footer, then update the cart badge.
loadHeaderFooter(updateCartCount);

// Create a data source for the tent category
const dataSource = new ProductData();

// Get the product ID from the URL parameter (?product=...).
const productId = getParam("product");

// Creates a ProductDetails instance and show the product.
const product = new ProductDetails(productId, dataSource);
product.init();
