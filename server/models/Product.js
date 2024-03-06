const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  price: Number
});

module.exports = mongoose.model("Product", itemSchema);
