import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

// Create the data source (the API).
const dataSource = new ProductData();

// Get the product ID from the URL parameter.
const productId = getParam("product");

// Creates a ProductDetails instance and displays the product.
const product = new ProductDetails(productId, dataSource);
product.init();
