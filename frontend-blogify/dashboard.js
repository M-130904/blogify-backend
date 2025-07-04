document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Dashboard Loaded!");

    const token = localStorage.getItem("token");
    if (!token) {
        alert("❌ You must log in first!");
        window.location.href = "login.html";  // ✅ Redirect to login
    }

    // ✅ Logout Functionality
    document.getElementById("logoutBtn").addEventListener("click", function () {
        localStorage.removeItem("token");
        alert("✅ Logged out successfully!");
        window.location.href = "index.html";
    });

    // ✅ Fetch and Display User Info
    fetch("http://localhost:5000/api/v1/users/profile", {
        headers: { "Authorization": `Bearer ${token}` }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "success") {
            document.getElementById("username").textContent = data.user.username;
            document.getElementById("email").textContent = data.user.email;
        } else {
            alert("❌ Session expired, please log in again.");
            window.location.href = "login.html";
        }
    })
    .catch(error => console.error("❌ Error fetching user profile:", error));
});
