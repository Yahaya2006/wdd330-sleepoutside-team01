import ProductList from "./ProductList.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");
const dataElement = document.querySelector(".product-list");

const productList = new ProductList("tents", dataSource, dataElement);
productList.init();
