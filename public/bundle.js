(function () {
  'use strict';

  const EXEMPTION_LOOKUP_TABLE = {
    books: ["book"],
    foods: ["chocolate bar", "chocolates"],
    medical: ["headache pills"],
  };

  const BASE_SALES_TAX = 0.1;
  const IMPORT_TAX = 0.05;

  function isExempt(description) {
    for (const category in EXEMPTION_LOOKUP_TABLE) {
      const exemptions = EXEMPTION_LOOKUP_TABLE[category].filter(
        (exempted_keyword) => description.includes(exempted_keyword)
      );

      if (exemptions.length) {
        return true;
      }
    }
    return false;
  }

  function isImported(description) {
    return description.includes("imported");
  }

  function getTaxRate(description) {
    let taxRate = BASE_SALES_TAX;

    if (isExempt(description)) {
      taxRate = 0;
    }

    if (isImported(description)) {
      taxRate += IMPORT_TAX;
    }

    return taxRate;
  }

  class Item {
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

  class Cart$1 {
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

  class Order {
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

  const cart = new Cart$1();
  const items = [
    {
      description: "book",
      price: 12.49,
    },
    {
      description: "imported box of chocolates",
      price: 10.0,
    },
    {
      description: "music CD",
      price: 14.99,
    },
    {
      description: "chocolate bar",
      price: 0.85,
    },
    {
      description: "imported bottle of perfume",
      price: 47.5,
    },
    {
      description: "headache pills",
      price: 9.75,
    },
    {
      description: "bottle of perfume",
      price: 10.89,
    },
  ];

  function updateCartTotal() {
    const element = document.getElementById("carted-amount");
    element.innerText = cart.items.reduce((acc, cur) => (acc += cur.quantity), 0);
  }

  function printReceipt() {
    const order = new Order(cart);
    appendOrder(order);
    cart.clear();
    updateCartTotal();
  }

  function addItem(item) {
    cart.addItem({ ...item, quantity: 1 });
    updateCartTotal();
  }

  function displayItems(items) {
    const root = document.getElementById("items-list");
    items.forEach((item, i) => {
      const tag = document.createElement("li");
      tag.innerHTML = `
      <div>
        <p>Description: ${item.description}</p>
        <p>Price: $${item.price.toFixed(2)}</p>
        <button id="${i}-add">Add to cart</button>
      </div>
    `;
      root.appendChild(tag);
      document
        .getElementById(`${i}-add`)
        .addEventListener("click", () => addItem(item));
    });
  }

  function appendOrder(order) {
    const root = document.getElementById("orders-list");
    const tag = document.createElement("li");
    tag.innerHTML = `
    <div>
      <p>${order.date}</p>
      <pre>${order.printReceipt()}</pre>
    </div>
  `;
    root.appendChild(tag);
  }

  function pageSetup() {
    document
      .getElementById("print-receipt")
      .addEventListener("click", printReceipt);

    displayItems(items);

    updateCartTotal();
  }

  window.onload = (event) => pageSetup();

})();
