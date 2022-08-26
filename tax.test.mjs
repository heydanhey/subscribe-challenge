import { getTaxRate, BASE_SALES_TAX, IMPORT_TAX } from "./tax.mjs";

describe("getTaxRate helper method", () => {
  test("a basic item should have the base sales tax applied", async () => {
    expect(getTaxRate("something really cool")).toBe(BASE_SALES_TAX);
  });

  describe("domestic exemptions", () => {
    test('described as a "book" should not have sales tax', async () => {
      expect(getTaxRate("a really good book")).toBe(0);
    });

    test('described as "chocolate" should not have sales tax', async () => {
      expect(getTaxRate("a box of chocolates")).toBe(0);
    });

    test('described as "headache pills" should not have sales tax', async () => {
      expect(getTaxRate("super powerful headache pills")).toBe(0);
    });
  });

  describe("imported items", () => {
    test('described as "imported" should have the base sales tax and the import tax applied', async () => {
      expect(getTaxRate("imported coffee")).toBe(IMPORT_TAX + BASE_SALES_TAX);
    });
  });

  describe("that also qualify as exempt", () => {
    test("should have only the import tax applied", async () => {
      expect(getTaxRate("imported book")).toBe(IMPORT_TAX);
    });
  });
});
