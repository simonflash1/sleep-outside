import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `
    <section class="product-detail">
      <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}" />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0]?.ColorName || "No color specified"}</p>
      <p class="product__description">${product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>
  `;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = null;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);
      if (!this.product) {
        throw new Error("Product not found");
      }
      this.renderProductDetails("main");
      this.addCartListener();
    } catch (error) {
      console.error("Error loading product details:", error);
      document.querySelector("main").innerHTML = "<p>Product details could not be loaded.</p>";
    }
  }

  addCartListener() {
    const addToCartButton = document.getElementById("addToCart");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", () => this.addToCart());
    }
  }

  addToCart() {
    let cart = getLocalStorage("so-cart") || []; // Get existing cart or empty array
  
    if (!Array.isArray(cart)) {
      cart = []; // Ensure cart is always an array
    }
  
    cart.push(this.product); // Add new product to cart
    setLocalStorage("so-cart", cart); // Save updated cart
  }
  

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = productDetailsTemplate(this.product);
    }
  }
}
