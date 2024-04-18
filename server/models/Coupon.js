const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  discount: { type: Number, required: true },
  description: { type: String, required: true },
  userLevel: {type: String}
});

module.exports = mongoose.model("Coupon", itemSchema);
