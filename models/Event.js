const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  contact: String,
  status: String
});

module.exports = mongoose.model("Event", eventSchema);