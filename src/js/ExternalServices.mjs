// ExternalServices.mjs (renamed from ProductData.mjs)
// Handles every request to the backend server.
const baseURL = import.meta.env.VITE_SERVER_URL;

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
  // GET: all products in a category
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    return data.Result;
  }

  // GET: one product by id
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    return data.Result;
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