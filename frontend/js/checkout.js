const checkoutForm = document.getElementById("checkoutForm");
const checkoutSummary = document.getElementById("checkoutSummary");

function loadCheckout() {
  const cart = getCart();

  if (!getToken()) {
    window.location.href = "login.html";
    return;
  }

  if (!cart.length) {
    checkoutSummary.innerHTML = `<div class="empty-state"><h3>Your cart is empty.</h3><a href="index.html" class="btn">Shop Now</a></div>`;
    checkoutForm.style.display = "none";
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  checkoutSummary.innerHTML = `
    <h3>Order Summary</h3>
    ${cart.map(item => `
      <div class="mini-item">
        <span>${item.name} × ${item.quantity}</span>
        <strong>${money(item.price * item.quantity)}</strong>
      </div>
    `).join("")}
    <hr>
    <div class="summary-total"><span>Total</span><strong>${money(total)}</strong></div>
  `;

  const user = getUser();
  if (user) document.getElementById("shippingName").value = user.name || "";
}

checkoutForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const message = document.getElementById("checkoutMessage");
  const cart = getCart();

  if (!cart.length) {
    showMessage(message, "Your cart is empty.");
    return;
  }

  const orderData = {
    items: cart.map(item => ({
      product: item.product,
      name: item.name,
      price: item.price,
      quantity: item.quantity
    })),
    totalAmount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    shippingAddress: {
      name: document.getElementById("shippingName").value.trim(),
      phone: document.getElementById("shippingPhone").value.trim(),
      address: document.getElementById("shippingAddress").value.trim()
    }
  };

  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${getToken()}`
      },
      body: JSON.stringify(orderData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Could not place order");
    }

    localStorage.removeItem("cart");
    showMessage(message, "Order placed successfully!", "success");

    setTimeout(() => {
      window.location.href = "orders.html";
    }, 900);
  } catch (error) {
    showMessage(message, error.message);
  }
});

loadCheckout();