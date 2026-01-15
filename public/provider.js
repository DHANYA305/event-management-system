const form = document.getElementById("event-form");
const preview = document.getElementById("preview");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const event = {
    title: document.getElementById("title").value,
    description: document.getElementById("desc").value,
    date: document.getElementById("date").value,
    contact: document.getElementById("provider").value,
    status: "pending"
  };

  try {
    const response = await fetch(
      "https://event-management-system-xo60.onrender.com/events",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Submission failed");
    }

    preview.innerHTML = `
      <h3>✅ Event Submitted!</h3>
      <p><strong>Title:</strong> ${event.title}</p>
      <p><strong>Description:</strong> ${event.description}</p>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Contact:</strong> ${event.contact}</p>
      <p>Status: 🟡 Pending approval</p>
    `;

    form.reset();
  } catch (err) {
    preview.innerHTML = `<p style="color:red">❌ ${err.message}</p>`;
  }
});
