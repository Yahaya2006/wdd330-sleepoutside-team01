// The base URL of the API server. Vite fills this in from src/.env
// (locally) or from the Render environment variable (in production).
const baseURL = import.meta.env.VITE_SERVER_URL;

// Checks the response and turns it into JSON, or throws an error.
async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw new Error(data.message || "Bad Response");
  }
}

export default class ProductData {
  // Gets the list of products for one category, such as "tents".
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // Gets one product from the API by its ID.
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
