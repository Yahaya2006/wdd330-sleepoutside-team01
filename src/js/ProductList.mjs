import {renderListWithTemplate} from "./utils.mjs";

export default class ProductList {
    constructor(category, dataSource, listElement){
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    renderList(list){
        // const htmlList = list.map(data => productCardTemplate(data)).join("");
        // this.listElement.innerHTML = htmlList;
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }

    async init() {
            const list = await this.dataSource.getData();
            this.renderList(list);           
        }
}

function productCardTemplate(product) {
    return `<li class="product-card">
            <a href="product_pages/northface-talus-4.html">
              <img src="${product.Image}" alt="${product.name}"/>
              <h3 class="card__brand">${product.Brand["Name"]}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">$${product.FinalPrice}</p>
            </a>
          </li>`
}