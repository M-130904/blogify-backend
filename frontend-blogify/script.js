document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Script.js is loaded!");

    const API_BASE_URL = "http://localhost:5000/api/v1/users";

    // ✅ Safe Logout
    function logoutUser() {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You are already logged out!");
            return;
        }

        fetch(`${API_BASE_URL}/logout`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                console.log("✅ Logout Response:", data);
                localStorage.removeItem("token");
                alert("✅ Logged out successfully!");
                window.location.href = "index.html";
            })
            .catch(error => {
                console.error("❌ Logout Error:", error);
                alert("Something went wrong. Please try again.");
            });
    }

    // ✅ Update Auth Button Text & Behavior (SAFE version)
    function updateAuthButton() {
        const authButton = document.getElementById("authButton"); // moved inside!
        const token = localStorage.getItem("token");

        if (!authButton) {
            console.warn("⚠️ authButton element not found in DOM.");
            return;
        }

        authButton.textContent = token ? "Logout" : "Login";
        authButton.onclick = token
            ? logoutUser
            : () => {
                  window.location.href = "login.html";
              };
    }

    updateAuthButton();

    // ✅ Smooth scroll for navigation buttons (if used)
    window.scrollToSection = function (id) {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    // ✅ Handle Registration Form
    document.getElementById("registerForm")?.addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${API_BASE_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();
            console.log("✅ Registration Response:", data);

            if (response.ok) {
                alert("✅ Registration successful! Please login.");
                window.location.href = "login.html";
            } else {
                alert(data.message || "❌ Registration failed, try again.");
            }
        } catch (error) {
            console.error("❌ Registration Error:", error);
            alert("Something went wrong. Please try again.");
        }
    });

    // ✅ Handle Login Form
    document.getElementById("loginForm")?.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("✅ Login Response:", data);

            if (response.ok && data.token) {
                alert("✅ Login successful!");
                localStorage.setItem("token", data.token);
                window.location.href = "dashboard.html"; // Redirect after login
            } else {
                alert(data.message || "❌ Invalid credentials, try again.");
            }
        } catch (error) {
            console.error("❌ Login Error:", error);
            alert("Something went wrong. Please try again.");
        }
    });
});
