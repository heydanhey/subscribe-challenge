export class Order {
  constructor(cart = new Cart()) {
    this.cart = cart;
    this.date = new Date();
  }

  #printItem = ({ description, price, quantity, tax }) => {
    return `${quantity} ${description}: ${this.#formatAmount(
      quantity * (price + tax)
    )}`;
  };

  #formatAmount(amount) {
    return amount.toFixed(2);
  }

  printReceipt = () => {
    const receiptLines = this.cart.items.map(this.#printItem);
    receiptLines.push(
      `Sales Taxes: ${this.#formatAmount(this.cart.taxTotal())}`
    );
    receiptLines.push(`Total: ${this.#formatAmount(this.cart.total())}`);
    return receiptLines.join("\n");
  };
}
