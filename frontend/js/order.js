const ordersList = document.getElementById("ordersList");

async function loadOrders() {
  if (!getToken()) {
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/orders`, {
      headers: {
        "Authorization": `Bearer ${getToken()}`
      }
    });

    const orders = await response.json();

    if (!response.ok) {
      throw new Error(orders.message || "Could not load orders");
    }

    if (!orders.length) {
      ordersList.innerHTML = `
        <div class="empty-state">
          <h3>No orders yet</h3>
          <p>Your placed orders will appear here.</p>
          <a href="index.html" class="btn">Start Shopping</a>
        </div>
      `;
      return;
    }

    ordersList.innerHTML = orders.map(order => `
      <article class="order-card">
        <div class="order-header">
          <div>
            <span class="muted">Order ID</span>
            <strong>#${order._id}</strong>
          </div>
          <span class="status-pill">${order.status}</span>
        </div>

        <div class="order-items">
          ${order.items.map(item => `
            <div class="order-item">
              <span>${item.name} × ${item.quantity}</span>
              <strong>${money(item.price * item.quantity)}</strong>
            </div>
          `).join("")}
        </div>

        <div class="order-footer">
          <span>Total</span>
          <strong>${money(order.totalAmount)}</strong>
        </div>
      </article>
    `).join("");
  } catch (error) {
    ordersList.innerHTML = `<div class="error-box">${error.message}</div>`;
  }
}

loadOrders();