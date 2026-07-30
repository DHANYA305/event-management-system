console.log("LOGIN JS LOADED 🚀");
const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  console.log("Login clicked"); // DEBUG

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    console.log(data);

    if (data.success) {
      localStorage.setItem("isAdmin", "true");
      window.location.href = "admin.html";
    } else {
      alert("Invalid credentials");
    }

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
});