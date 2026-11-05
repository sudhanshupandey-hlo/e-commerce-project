const cartContent = document.getElementById("cartContent");

function renderCart() {
  const cart = getCart();

  if (!cart.length) {
    cartContent.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">🛒</div>
        <h3>Your cart is empty</h3>
        <p>Add some products to continue shopping.</p>
        <a href="index.html" class="btn">Continue Shopping</a>
      </div>
    `;
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartContent.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${cart.map((item, index) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
              <h3>${item.name}</h3>
              <p>${money(item.price)} each</p>
              <div class="quantity-control">
                <button onclick="changeQuantity(${index}, -1)">−</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
              </div>
            </div>
            <div class="cart-item-right">
              <strong>${money(item.price * item.quantity)}</strong>
              <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
          </div>
        `).join("")}
      </div>

      <aside class="summary-card">
        <h3>Order Summary</h3>
        <div class="summary-line"><span>Subtotal</span><strong>${money(total)}</strong></div>
        <div class="summary-line"><span>Shipping</span><strong>Free</strong></div>
        <hr>
        <div class="summary-total"><span>Total</span><strong>${money(total)}</strong></div>
        <a href="checkout.html" class="btn btn-full">Proceed to Checkout</a>
      </aside>
    </div>
  `;
}

function changeQuantity(index, change) {
  const cart = getCart();
  cart[index].quantity += change;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  saveCart(cart);
  renderCart();
}

function removeItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

renderCart();