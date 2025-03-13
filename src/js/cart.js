import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = Array.isArray(getLocalStorage("so-cart"))
    ? getLocalStorage("so-cart")
    : []; // Ensure it's always an array

  if (cartItems.length === 0) {
    document.querySelector(".product-list").innerHTML =
      "<p class='empty-cart'>Your cart is empty</p>";
    return;
  }

  const htmlItems = cartItems.map(cartItemTemplate).join("");
  document.querySelector(".product-list").innerHTML = htmlItems;
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "N/A"}</p>
    <p class="cart-card__quantity">Qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice.toFixed(2)}</p>
  </li>`;
}

renderCartContents();
