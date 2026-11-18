import { getParam, loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
// Import the class that displays one product.
import ProductDetails from "./ProductDetails.mjs";
import { updateCartCount } from "./cart-count.js";
import { addBreadcrumbs } from "./breadcrumbs.js";
addBreadcrumbs();

// Create a data source for the tent category.
const dataSource = new ProductData("tents");

// Get the product ID from the URL parameter (?product=...).
const productId = getParam("product");

// Create a ProductDetails instance.
const product = new ProductDetails(productId, dataSource);

// Load the header and footer, then update the cart badge.
loadHeaderFooter(updateCartCount);

// Initialize the product details page.
product.init();
