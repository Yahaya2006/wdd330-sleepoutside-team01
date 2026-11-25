const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const jsonResponse = await res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    throw { name: "servicesError", message: jsonResponse };
// ExternalServices.mjs (renamed from ProductData.mjs)
// Handles every request to the backend server.
const baseURL = import.meta.env.VITE_SERVER_URL;

// The product categories on the site (used by the search)
const CATEGORIES = ["tents", "backpacks", "sleeping-bags", "hammocks"];

// Returns the JSON body if the request worked, otherwise throws an error
// that carries the server's message so the page can show it.
async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {
  constructor() {}

  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
  // GET: all products in a category
  async getData(category) {
    // encodeURIComponent keeps the URL valid if the text has spaces
    const response = await fetch(
      `${baseURL}products/search/${encodeURIComponent(category)}`,
    );
    const data = await convertToJson(response);
    return data.Result;
  }

  // Search by product name, brand or category.
  // The API only searches by category, so we load every category
  // and filter the products ourselves.
  async searchProducts(term) {
    const text = term.trim().toLowerCase();

    // Request all categories at the same time
    const results = await Promise.all(
      CATEGORIES.map((category) => this.getData(category)),
    );

    const matches = [];

    results.forEach((products, index) => {
      // If the search matches the category name (e.g. "tent"), keep them all
      const categoryMatches = CATEGORIES[index].includes(text);

      products.forEach((product) => {
        // Otherwise keep a product only if its name or brand has the text
        const nameMatches =
          product.Name.toLowerCase().includes(text) ||
          product.Brand.Name.toLowerCase().includes(text);

        if (categoryMatches || nameMatches) {
          matches.push(product);
        }
      });
    });

    return matches;
  }

  // GET: one product by id
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };
    return await fetch(`${baseURL}checkout/`, options).then(convertToJson);
  }
}
  // POST: send the finished order object to the server
  async checkout(order) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order), // JS object -> JSON string
    };
    // baseURL points at the wdd330 backend, so this hits .../checkout
    const response = await fetch(`${baseURL}checkout`, options);
    return convertToJson(response);
  }
}
