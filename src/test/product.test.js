/* eslint-env jest */
import ProductData from "../js/ProductData.mjs";

describe("ProductData", () => {
  const mockProducts = [
    { Id: "880RR", Name: "Marmot Ajax 3 Person Tent" },
    { Id: "985RF", Name: "North Face Talus 4 Person Tent" },
  ];

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create the correct JSON path", () => {
    const productData = new ProductData("tents");

    expect(productData.path).toBe("/json/tents.json");
  });

  test("should fetch and return product data", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockProducts),
    });

    const productData = new ProductData("tents");
    const result = await productData.getData();

    expect(global.fetch).toHaveBeenCalledWith("/json/tents.json");
    expect(result).toEqual(mockProducts);
  });

  test("should find a product by its ID", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockProducts),
    });

    const productData = new ProductData("tents");
    const result = await productData.findProductById("880RR");

    expect(result).toEqual(mockProducts[0]);
  });

  test("should return undefined when product ID does not exist", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockProducts),
    });

    const productData = new ProductData("tents");
    const result = await productData.findProductById("UNKNOWN");

    expect(result).toBeUndefined();
  });

  test("should throw an error when response is not OK", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
    });

    const productData = new ProductData("tents");

    await expect(productData.getData()).rejects.toThrow("Bad Response");
  });
});
