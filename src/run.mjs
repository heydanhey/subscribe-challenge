import fs from "fs/promises";
import { Cart } from "./Cart.mjs";
import { Order } from "./Order.mjs";

export async function getFile(path) {
  try {
    return await fs.readFile(path, { encoding: "utf8" });
  } catch (err) {
    console.error(err);
  }
}

export async function run(filePath) {
  const file = await getFile(filePath);
  const cart = new Cart();
  cart.addItemsFromInputFile(file);
  const order = new Order(cart);
  return order.printReceipt();
}
