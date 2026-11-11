import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");

const productId = new URLSearchParams(window.location.search).get("product");

const detailElement = document.querySelector(".product-detail");

const product = new ProductDetails(productId, dataSource, detailElement);

product.init();
