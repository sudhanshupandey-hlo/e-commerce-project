const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = document.getElementById("registerMessage");
    const data = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value
    };

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      showMessage(message, "Registration successful. Redirecting to login...", "success");
      registerForm.reset();

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    } catch (error) {
      showMessage(message, error.message);
    }
  });
}

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const message = document.getElementById("loginMessage");
    const data = {
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value
    };

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));

      showMessage(message, "Login successful. Redirecting...", "success");

      setTimeout(() => {
        window.location.href = "index.html";
      }, 700);
    } catch (error) {
      showMessage(message, error.message);
    }
  });
}