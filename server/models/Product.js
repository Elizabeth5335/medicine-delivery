const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  price: Number,
  date: Date
});

module.exports = mongoose.model("Product", itemSchema);
