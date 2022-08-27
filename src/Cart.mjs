import { Item } from "./Item.mjs";

/*
  ^\d+            matches one or more digits at the beginning of a string
  [a-zA-Z\s]+     matches one or more letters and white space
    \d+           matches one or more digits...
    \.            followed by "."...
    \d{2}$        followed by two more digits at the end of a string
*/
const INPUT_LINE_REGEX = /(^\d+|[a-zA-Z\s]+|\d+\.\d{2}$)/g;

const ON_LINE_BREAKS_REGEX = /\n/;

const EMPTY_LINE_FILTER_FN = (line) => !!line;

export class Cart {
  constructor() {
    this.items = [];
  }

  #processInputFile(file) {
    return file
      .split(ON_LINE_BREAKS_REGEX)
      .filter(EMPTY_LINE_FILTER_FN)
      .map(this.#processInputLine);
  }

  #processInputLine(line) {
    let [quantity, description, price] = line.match(INPUT_LINE_REGEX);

    return {
      price: parseFloat(price),
      quantity: parseInt(quantity),
      description: description.replace(" at ", "").trim(),
    };
  }

  addItemsFromInputFile = (file) => {
    this.#processInputFile(file).forEach(this.addItem);
  };

  clear = () => {
    this.items = [];
  };

  addItem = ({ description, price, quantity }) => {
    const existingItemIndex = this.items.findIndex(
      (item) => description === item.description
    );

    if (existingItemIndex > -1) {
      this.items[existingItemIndex].quantity += quantity;
    } else {
      this.items.push(new Item(description, price, quantity));
    }
  };

  subTotal = () => {
    const total = this.items.reduce(
      (acc, cur) => (acc += cur.price * cur.quantity),
      0
    );
    return Math.round(total * 100) / 100;
  };

  taxTotal = () => {
    const tax = this.items.reduce(
      (acc, cur) => (acc += cur.quantity * cur.tax),
      0
    );
    return Math.round(tax * 100) / 100;
  };

  total = () => {
    return this.taxTotal() + this.subTotal();
  };
}
