import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
  // Retrieves existing products; Creates an empty array if no cart exists
  let cart = getLocalStorage("so-cart") || [];
  // Make sure cart is an array
  if (!Array.isArray(cart)) {
    cart = [cart];
  }

  // Check whether the product already exists
  const existingProduct = cart.find((item) => item.Id === product.Id);

  if (existingProduct) {
    // Increase its quantity
    existingProduct.Quantity = (existingProduct.Quantity || 1) + 1;
  } else {
    // Adds the new product to the array
    cart.push({ ...product, Quantity: 1 });
  }

  // Saves the updated array
  setLocalStorage("so-cart", cart);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
