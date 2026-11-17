import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Create a data source for the products.
const dataSource = new ProductData();

// Get the product ID from the URL parameter.
const productId = getParam("product");

// Create a ProductDetails instance.
const product = new ProductDetails(productId, dataSource);

// Initialize the product details page.
product.init();
