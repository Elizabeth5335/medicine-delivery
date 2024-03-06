const mongoose = require("mongoose");

const Product = require("./Product");

const itemSchema = new mongoose.Schema({
  name: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

module.exports = mongoose.model("Shop", itemSchema);
