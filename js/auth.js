function registerUser(e) {
    e.preventDefault();

    const u = document.getElementById("username").value,
          e1 = document.getElementById("email").value,
          p = document.getElementById("password").value,
          r = document.getElementById("role").value;

    let ulist = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if email already exists
    if (ulist.find(u => u.email === e1)) {
        alert("Email already registered!");
        return;
    }

    // Save new user
    ulist.push({ username: u, email: e1, password: p, role: r });
    localStorage.setItem("users", JSON.stringify(ulist));

    alert("Registration successful!");
    window.location = "login.html";
}

function loginUser(e) {
    e.preventDefault();

    const e1 = document.getElementById("email").value,
          p = document.getElementById("password").value;

    let ulist = JSON.parse(localStorage.getItem("users") || "[]");

    const u = ulist.find(u => u.email === e1 && u.password === p);

    if (u) {
        localStorage.setItem("currentUser", JSON.stringify(u));
        alert("Login successful!");

        // 🔹 Role-based redirect
        if (u.role === "student") {
            window.location = "dashboard.html";
        } else if (u.role === "supervisor") {
            window.location = "supervisor.html";
        } else if (u.role === "admin") {
            window.location = "admin.html"; // optional if you have an admin page
        } else {
            window.location = "dashboard.html"; // fallback
        }

    } else {
        alert("Invalid credentials");
    }
}

function logoutUser() {
    localStorage.removeItem("currentUser");
    window.location = "login.html";
}

// Protect route by allowed roles
function protectRoute(allowedRoles) {
    const u = JSON.parse(localStorage.getItem("currentUser"));
    if (!u || !allowedRoles.includes(u.role)) {
        alert("Access denied!");
        window.location = "login.html";
    }
}
