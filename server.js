const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});


app.use(cors());
app.use(express.json());
app.use(express.static("public"));


const file = "./data.json";

// ✅ Get all events
app.get('/events', (req, res) => {
  const data = JSON.parse(fs.readFileSync(file));
  res.json({ events: data.events }); // important: wrap in { events: ... }
});

// ✅ Approve event
app.post('/approve/:title', (req, res) => {
  const data = JSON.parse(fs.readFileSync(file));
  const event = data.events.find(e => e.title === req.params.title);
  if (event) event.status = "approved";
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ message: 'Approved!' });
});

// ✅ Reject event
app.post('/reject/:title', (req, res) => {
  const data = JSON.parse(fs.readFileSync(file));
  const event = data.events.find(e => e.title === req.params.title);
  if (event) event.status = "rejected";
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ message: 'Rejected!' });
});

app.post('/events', (req, res) => {
  const data = JSON.parse(fs.readFileSync(file));
  const { title, description, status , date,contact} = req.body;

  if (!title || !description|| !status || !date || !contact) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // 🔒 Prevent duplicate titles (case-insensitive)
  const duplicate = data.events.find(e => e.title.toLowerCase() === title.toLowerCase());
  if (duplicate) {
    return res.status(400).json({ message: "Title already exists" });
  }

  const newEvent = { title, description,  status, date, contact };
  data.events.push(newEvent);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ message: "Event submitted!" });
});

// 🚨 Clear all events
app.delete('/events', (req, res) => {
  const data = { events: [] };
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ message: "All events cleared!" });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Backend is working 🎉");
});
