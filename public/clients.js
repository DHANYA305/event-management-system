// 🔘 Submit Button Logic
document.getElementById("submit-btn").addEventListener("click", () => {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;

  const description = document.getElementById("description").value;
  const contact = document.getElementById("contact").value;


  if (!title || !description) {
    alert("Please fill in both fields.");
    return;
  }

  fetch("/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      description: description,
      status: "pending", 
      date: date,
      contact: contact })
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("✅ Submitted:", data);
      alert(data.message || "Event submitted successfully!");
      document.getElementById("title").value = "";
      document.getElementById("description").value = "";
      document.getElementById("contact").value = "";
      loadEvents(); // Refresh the list
    })
    .catch((err) => {
      console.error("❌ Failed to submit:", err);
      alert("Failed to submit.");
    });
});

function loadEvents() {
  fetch("/events")
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById("status-list");
      list.innerHTML = "";

      const today = new Date().toISOString().split("T")[0]; // today's date

      const validEvents = data.events.filter(event => {
        return !event.date || event.date >= today; // keep only upcoming
      const search = document.getElementById("search").value.toLowerCase();

const validEvents = data.events.filter(event => {
  return (
    event.status === "approved" &&
    (!event.date || event.date >= today) &&
    event.title.toLowerCase().includes(search)
  );
});

      });

      validEvents.forEach((event) => {
        const div = document.createElement("div");
        div.className = "event-card";
        div.innerHTML = `
       <strong>${event.title}</strong><br>
       <small>${event.description}</small><br>
       <small>Date: ${event.date || "N/A"}</small><br>
       <small>Contact: ${event.contact || "N/A"}</small><br>
       <span>Status: <strong>${event.status}</strong></span>
       `;

        list.appendChild(div);
      });
    })
    .catch((err) => {
      console.error("Error loading events:", err);
    });
}

// 🚀 Auto-load on page load
window.onload = loadEvents;
