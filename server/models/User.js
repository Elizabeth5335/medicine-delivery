const mongoose = require("mongoose");

const Order = require("./Order");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  hashedPassword: {type: String, required: true},
  orders: {
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
      }
    ],
  },
});

module.exports = mongoose.model("User", itemSchema);
