import { Order } from "../src/Order.mjs";
import { Cart } from "../src/Cart.mjs";

let order, cart;

beforeEach(() => {
  const validItem = {
    description: "tv",
    price: 12.49,
    quantity: 2,
  };
  cart = new Cart();
  cart.addItem(validItem);
  order = new Order(cart);
});

test('class name is "Order"', () => {
  expect(order.constructor.name).toBe("Order");
});

test("printReceipt method to print the correct totals and format", () => {
  const expected = ["2 tv: 27.48", "Sales Taxes: 2.50", "Total: 27.48"].join(
    "\n"
  );
  expect(order.printReceipt()).toMatch(expected);
});
