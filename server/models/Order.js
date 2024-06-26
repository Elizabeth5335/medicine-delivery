const mongoose = require("mongoose");

const Product = require("./Product");

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  totalPrice: { type: Number },
  orderProducts: {
    type: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      }
    ],
    required: true,
  },
});

module.exports = mongoose.model("Order", itemSchema);
