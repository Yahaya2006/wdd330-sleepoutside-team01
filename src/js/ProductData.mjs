const baseURL = import.meta.env.VITE_SERVER_URL;

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category = "tents") {
    this.category = category;
  }

  async getData(category = this.category) {
    const response = await fetch(
      `${baseURL}products/search/${encodeURIComponent(category)}`,
    );
    const data = await convertToJson(response);
    return data.Result;
  }

  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${encodeURIComponent(id)}`);
    const data = await convertToJson(response);
    return data.Result;
  }
}
