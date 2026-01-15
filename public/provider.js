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



  // Send to backend
  const response = await fetch("http://localhost:5002/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(event)
  });

  const result = await response.json();

  // Show Preview
  preview.innerHTML = `
    <h3>✅ Submitted to Backend!</h3>
    <p><strong>Title:</strong> ${event.title}</p>
    <p><strong>Provider:</strong> ${event.provider}</p>
    <p><strong>Date:</strong> ${event.date}</p>
    <p><strong>Type:</strong> ${event.type}</p>
    <p><strong>Description:</strong> ${event.desc}</p>
    <p>🟡 Status: <em>Pending approval</em></p>
  `;
});
