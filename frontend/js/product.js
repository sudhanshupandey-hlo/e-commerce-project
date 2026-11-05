const productDetails = document.getElementById("productDetails");
const productId = new URLSearchParams(window.location.search).get("id");

async function loadProduct() {
  if (!productId) {
    productDetails.innerHTML = `<div class="error-box">Product ID is missing.</div>`;
    return;
  }

  try {
    const response = await fetch(`${API_URL}/products/${productId}`);
    if (!response.ok) throw new Error("Product not found");

    const product = await response.json();

    productDetails.innerHTML = `
      <div class="detail-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="detail-content">
        <span class="eyebrow dark">PRODUCT DETAILS</span>
        <h1>${product.name}</h1>
        <div class="detail-price">${money(product.price)}</div>
        <p class="detail-description">${product.description}</p>
        <p class="stock-text">${product.stock > 0 ? `${product.stock} available` : "Out of stock"}</p>

        <div class="quantity-row">
          <label for="quantity">Quantity</label>
          <input id="quantity" type="number" min="1" max="${product.stock}" value="1" ${product.stock === 0 ? "disabled" : ""}>
        </div>

        <button id="addToCart" class="btn btn-large" ${product.stock === 0 ? "disabled" : ""}>
          Add to Cart
        </button>
        <a href="cart.html" class="btn btn-outline btn-large">View Cart</a>
        <p id="productMessage" class="form-message"></p>
      </div>
    `;

    document.getElementById("addToCart").addEventListener("click", () => {
      const quantity = Number(document.getElementById("quantity").value);
      const cart = getCart();
      const existing = cart.find(item => item.product === product._id);

      if (existing) {
        existing.quantity = Math.min(existing.quantity + quantity, product.stock);
      } else {
        cart.push({
          product: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity
        });
      }

      saveCart(cart);
      showMessage(document.getElementById("productMessage"), "Product added to cart.", "success");
    });
  } catch (error) {
    productDetails.innerHTML = `<div class="error-box">Unable to load this product.</div>`;
  }
}

loadProduct();