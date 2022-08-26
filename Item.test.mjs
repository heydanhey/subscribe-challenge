import { Item } from "./Item.mjs";

let item;

beforeEach(() => {
  item = new Item("test description", 1.0, 1);
});

test('class name is "Item"', () => {
  expect(item.constructor.name).toBe("Item");
});

test("has a description that is a string", () => {
  expect(typeof item.description).toBe("string");
});

test("has a quantity that is a number", () => {
  expect(typeof item.quantity).toBe("number");
});

test("has a price that is a number", () => {
  expect(typeof item.price).toBe("number");
});
