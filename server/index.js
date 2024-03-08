const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://medicine-delivery-3.onrender.com",
};
app.use(express.json());
app.use(cors(corsOptions));

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Shop = require("./models/Shop"); // Create the Shop model

app.get("/api/shops", async (req, res) => {
  try {
    const shopList = await Shop.find().populate("products");
    res.json(shopList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

const Order = require("./models/Order");

app.post("/api/order", (req, res) => {
  const { name, email, phone, address, orderProducts } = req.body;
  Order.create({
    name,
    email,
    phone,
    address,
    orderProducts,
  });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
