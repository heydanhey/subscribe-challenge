import { getTaxRate } from "./tax.mjs";

export class Item {
  constructor(description, price, quantity) {
    this.description = description;
    this.price = price;
    this.quantity = quantity;
    this.tax = this.#calculateTax();
  }

  #calculateTax = () => {
    return (
      (Math.ceil((this.price * getTaxRate(this.description) * 100) / 5) * 5) /
      100
    );
  };
}
