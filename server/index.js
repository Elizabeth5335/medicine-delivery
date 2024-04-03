const express = require("express");
const cors = require("cors");

const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: ["https://medicine-delivery-3.onrender.com", "http://localhost:5173"],
};
app.use(express.json());
app.use(cors(corsOptions));

const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Shop = require("./models/Shop");

app.get("/api/shops", async (req, res) => {
  try {
    const shopList = await Shop.find();
    res.json(shopList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


app.get("/api/products", async (req, res) => {
  try {
    const { currentShop } = req.query;
    let sortCriteria = {};

    if (req.query.sortBy!=='' && req.query.order!=='') {
      sortCriteria[req.query.sortBy] = req.query.order === 'desc' ? -1 : 1;
    }

    const shop = await Shop.findById(currentShop).populate({
      path: "products",
      options: { sort: sortCriteria }
    });

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    res.json(shop.products);
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
