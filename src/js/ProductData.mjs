// Read the server URL from  the .env file (Vite requires the VITE_ prefix).
const baseURL = import.meta.env.VITE_SERVER_URL;

// Turns a fetch response into JSON, or throws n error if the request failed.
function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
// No category here anymore: it is passed in when we ask for data,
  // which makes this class work for any category.
  constructor() {}

  // Gets all products in a category from the API.
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    // The API wraps the list inside a "Result" property.
    return data.Result;
  }

  // Gets one product from the API using its id.
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    // Single products are also wrapped in "Result".
    return data.Result;
  }
}
