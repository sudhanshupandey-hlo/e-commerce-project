const API_URL = "http://localhost:5000/api";

function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function getToken() {
  return localStorage.getItem("token");
}

function getUser() {
  return JSON.parse(localStorage.getItem("user") || "null");
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "index.html";
}

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById("cartCount");
  if (badge) badge.textContent = count;
}

function updateNavbar() {
  const loggedIn = !!getToken();
  const login = document.getElementById("loginLink");
  const register = document.getElementById("registerLink");
  const orders = document.getElementById("ordersLink");
  const logoutButton = document.getElementById("logoutBtn");

  if (login) login.classList.toggle("hidden", loggedIn);
  if (register) register.classList.toggle("hidden", loggedIn);
  if (orders) orders.classList.toggle("hidden", !loggedIn);
  if (logoutButton) {
    logoutButton.classList.toggle("hidden", !loggedIn);
    logoutButton.onclick = logout;
  }

  updateCartCount();
}

function money(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function showMessage(element, message, type = "error") {
  if (!element) return;
  element.textContent = message;
  element.className = `form-message ${type}`;
}

document.addEventListener("DOMContentLoaded", updateNavbar);