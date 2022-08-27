import { Cart } from "../src/Cart.mjs";
import { getFile } from "../src/run.mjs";

let cart;

beforeEach(() => {
  cart = new Cart();
});

test('class name is "Cart"', () => {
  expect(cart.constructor.name).toBe("Cart");
});

test('initializes with "0" items', () => {
  expect(cart.items.length).toBe(0);
});

test("adds a valid item", () => {
  const validItem = {
    description: "book",
    price: 12.49,
    quantity: 1,
  };
  cart.addItem(validItem);
  expect(cart.items.length).toBe(1);
});

test("adds 3 items from a valid input file", async () => {
  const file = await getFile("./data/input1.txt");
  cart.addItemsFromInputFile(file);
  await expect(cart.items.length).toBe(3);
});

describe("total methods", () => {
  beforeEach(() => {
    const validItem1 = {
      description: "test item 1",
      price: 1.0,
      quantity: 1,
    };

    const validItem2 = {
      description: "test item 2",
      price: 2.0,
      quantity: 1,
    };

    cart.addItem(validItem1);
    cart.addItem(validItem2);
  });

  test("can generate a subtotal of all items", async () => {
    await expect(cart.subTotal()).toBe(3.0);
  });

  test("can generate the total tax of all items", async () => {
    await expect(cart.taxTotal()).toBe(0.3);
  });

  test("can generate the total price of all items", async () => {
    await expect(cart.total()).toBe(3.3);
  });
});
