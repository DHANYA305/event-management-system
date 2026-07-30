const eventList = document.getElementById("events-container");
const searchInput = document.getElementById("search");

async function loadApprovedEvents() {
  try {
    const res = await fetch("/events");
    const data = await res.json();

    const query = searchInput.value.toLowerCase();
    eventList.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

const approvedEvents = data.events
  .filter(event => event.status === "approved")
  .filter(event => event.date && event.date >= today)
  .filter(event => event.title.toLowerCase().includes(query));


    if (approvedEvents.length === 0) {
      eventList.innerHTML = "<p class='text-center text-gray-500'>No events found</p>";
      return;
    }

    approvedEvents.forEach(event => {
      const card = document.createElement("div");
      card.className = "bg-white p-4 rounded shadow";

      card.innerHTML = `
        <h3 class="font-bold text-lg">${event.title}</h3>
        <p class="text-gray-700">${event.description || "No description"}</p>
        <p><strong>Date:</strong> ${event.date || "N/A"}</p>
        <p><strong>Contact:</strong> ${event.contact || "N/A"}</p>
      `;

      eventList.appendChild(card);
    });
  } catch (err) {
    console.error("Error loading events:", err);
    eventList.innerHTML =
      "<p class='text-center text-red-500'>Failed to load events</p>";
  }
}

// Search trigger
searchInput.addEventListener("input", loadApprovedEvents);

// Load on page start
window.onload = loadApprovedEvents;
