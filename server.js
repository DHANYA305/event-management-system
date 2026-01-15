const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const file = "./data.json";

// Health check
app.get("/", (req, res) => {
  res.send("Backend is working 🎉");
});

// Get all events
app.get("/events", (req, res) => {
  const data = JSON.parse(fs.readFileSync(file));
  res.json({ events: data.events });
});

// Approve
app.post("/approve/:title", (req, res) => {
  const data = JSON.parse(fs.readFileSync(file));
  const event = data.events.find(e => e.title === req.params.title);
  if (event) event.status = "approved";
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ message: "Approved!" });
});

// Reject
app.post("/reject/:title", (req, res) => {
  const data = JSON.parse(fs.readFileSync(file));
  const event = data.events.find(e => e.title === req.params.title);
  if (event) event.status = "rejected";
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ message: "Rejected!" });
});

// Add event
app.post("/events", (req, res) => {
  const data = JSON.parse(fs.readFileSync(file));
  const { title, description, status, date, contact } = req.body;

  if (!title || !description || !status || !date || !contact) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const duplicate = data.events.find(
    e => e.title.toLowerCase() === title.toLowerCase()
  );
  if (duplicate) {
    return res.status(400).json({ message: "Title already exists" });
  }

  data.events.push({ title, description, status, date, contact });
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ message: "Event submitted!" });
});

// Clear all
app.delete("/events", (req, res) => {
  fs.writeFileSync(file, JSON.stringify({ events: [] }, null, 2));
  res.json({ message: "All events cleared!" });
});

// 🚀 ONE listen ONLY
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
