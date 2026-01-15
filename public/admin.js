fetch("https://event-management-system-xo60.onrender.com/events")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("admin-container");
    container.innerHTML = "";

    if (!data.events || data.events.length === 0) {
      container.innerHTML = "<p>No events found 🎉</p>";
      return;
    }

    data.events.forEach(event => {
      const card = document.createElement("div");
      card.className = "bg-white p-4 rounded shadow";

     const isFinal = event.status !== "pending";

card.innerHTML = `
  <h3 class="font-bold">${event.title}</h3>
  <p>${event.description || "No description"}</p>

  <span class="px-2 py-1 rounded text-white ${
    event.status === "approved" ? "bg-green-500" :
    event.status === "rejected" ? "bg-red-500" :
    "bg-yellow-500"
  }">
    ${event.status.toUpperCase()}
  </span>

  <br/><br/>

  <button onclick="approveEvent('${event.title}')"
    ${isFinal ? "disabled" : ""}
    class="px-3 py-1 bg-green-600 text-white rounded disabled:opacity-50">
    ✅ Approve
  </button>

  <button onclick="rejectEvent('${event.title}')"
    ${isFinal ? "disabled" : ""}
    class="px-3 py-1 bg-red-600 text-white rounded disabled:opacity-50">
    ❌ Reject
  </button>
`;


      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Error fetching events:", err);
    document.getElementById("admin-container").innerHTML =
      "<p style='color:red'>Failed to load events</p>";
  });


// 🚀 Step 2: Approve
function approveEvent(title) {
 fetch(`https://event-management-system-xo60.onrender.com/approve/${encodeURIComponent(title)}`, {
  method: "POST"
})

  .then(res => res.json())
  .then(() => {
    alert("Approved");
    location.reload();
  })
  .catch(err => console.error("Error approving:", err));
}


// 🚀 Step 3: Reject
function rejectEvent(title) {
fetch(`https://event-management-system-xo60.onrender.com/reject/${encodeURIComponent(title)}`, {
  method: "POST"
})

  .then(res => res.json())
  .then(() => {
    alert("Rejected");
    location.reload();
  })
  .catch(err => console.error("Error rejecting:", err));
}


// 🚀 Step 4: Clear all events
function clearAllEvents() {
  if (!confirm("Are you sure you want to delete ALL events?")) return;

  fetch("https://event-management-system-xo60.onrender.com/events", { method: "DELETE" })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      location.reload();
    })
    .catch(err => {
      console.error("Error clearing events:", err);
      alert("Failed to clear events.");
    });
}
