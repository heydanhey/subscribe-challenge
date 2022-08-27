import { Cart } from "./Cart.mjs";
import { Order } from "./Order.mjs";

const orders = [];
const cart = new Cart();
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
  orders.push(order);
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
