const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Event = require("./models/Event");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Health check
app.get("/", (req, res) => {
  res.send("Backend is working 🎉");
});

// 🔐 Admin login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    return res.json({ success: true });
  }

  res.status(401).json({ success: false });
});

app.get("/test", async (req, res) => {
  const testEvent = new Event({
    title: "TEST",
    description: "Testing DB",
    status: "pending",
    date: "2026-01-01",
    contact: "123"
  });

  await testEvent.save();
  res.send("Test saved");
});
// GET all events
app.get("/events", async (req, res) => {
  const events = await Event.find();
  res.json({ events });
});

// POST new event
app.post("/events", async (req, res) => {
  console.log("POST /events hit");
  console.log(req.body);   // ✅ HERE ONLY

  const { title, description, status, date, contact } = req.body;

  if (!title || !description || !status || !date || !contact) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const duplicate = await Event.findOne({
    title: title.toLowerCase()
  });

  if (duplicate) {
    return res.status(400).json({ message: "Title already exists" });
  }

  const newEvent = new Event({
    title,
    description,
    status,
    date,
    contact
  });

  await newEvent.save();

  console.log("Saved to MongoDB"); // optional debug

  res.json({ message: "Event submitted!" });
});

// Approve event
app.post("/approve/:id", async (req, res) => {
  await Event.findByIdAndUpdate(req.params.id, {
    status: "approved"
  });
  res.json({ message: "Approved!" });
});

// Reject event
app.post("/reject/:id", async (req, res) => {
  await Event.findByIdAndUpdate(req.params.id, {
    status: "rejected"
  });
  res.json({ message: "Rejected!" });
});

// DELETE all events
app.delete("/events", async (req, res) => {
  await Event.deleteMany({});
  res.json({ message: "All events cleared!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});