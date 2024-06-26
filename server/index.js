const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    if (req.query.sortBy !== "" && req.query.order !== "") {
      sortCriteria[req.query.sortBy] = req.query.order === "desc" ? -1 : 1;
    } else {
      sortCriteria.name = 1;
    }

    const shop = await Shop.findById(currentShop).populate({
      path: "products",
      options: { sort: sortCriteria },
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
  const { name, email, phone, address, totalPrice, orderProducts } = req.body;
  Order.create({
    name,
    email,
    phone,
    address,
    totalPrice,
    orderProducts,
  });
});

app.get("/api/userOrders", async (req, res) => {
  try {
    const { currentUser } = req.query;

    const orders = await Order.find({ email: currentUser }).populate({
      path: "orderProducts",
      populate: {
        path: "product",
      },
    });

    if (!orders) {
      return res.status(404).json({ message: "Orders not found" });
    }

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

const User = require("./models/User"); //sign up

app.post("/api/users", async (req, res) => {
  const { name, email, phone, address, hashedPassword, orders } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.json({
      status: "error",
      error: `User with this email ${email} already exists`,
    });
  } else {
    User.create({
      name,
      email,
      phone,
      address,
      hashedPassword,
      orders,
    });
    res.json({
      status: "ok",
      data: {
        name: name,
        email: email,
        phone: phone,
        address: address,
        hashedPassword: hashedPassword,
        orders: orders,
      },
    });
  }

  // adapter.restore();
});

const JWT_SECRET = "test123";
// const JWT_SECRET = process.env.JWT_SECRET;
const verifyUserLogin = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { status: "error", error: "User not found. Sign up first!" };
    }
    if (await bcrypt.compare(password, user.hashedPassword)) {
      token = jwt.sign({ id: user._id, username: user.email }, JWT_SECRET, {
        expiresIn: "24h",
      });
      return { status: "ok", data: token, user: user };
    }
    return { status: "error", error: "email or password is incorrect" };
  } catch (error) {
    console.log(error);
    return { status: "error", error: "timed out" };
  }
};

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const response = await verifyUserLogin(email, password);
  if (response.status === "ok") {
    const token = response.data;
    res.cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
  }
  res.json(response);
});

app.post("/api/userInfo", async (req, res) => {
  const { newData: user, prevEmail } = req.body;
  const id = user._id;
  const email = user.email;

  if (email !== prevEmail && prevEmail) {
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      res.json({
        status: "error",
        error: `User with this email ${email} already exists`,
      });
      return;
    }
  }
  try {
    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ status: "error", error: "User not found" });
    }
    await User.findByIdAndUpdate(id, {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      hashedPassword: user.hashedPassword,
    });
    res
      .status(200)
      .json({ status: "ok", message: "User info updated successfully" });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

const Coupon = require("./models/Coupon");

app.get("/api/coupons", async (req, res) => {
  const { userToFind } = req.query;
  let user = null;
  if (!userToFind) {
    console.log("no user");
  } else {
    user = await User.findOne({ email: userToFind });
  }
  try {
    if (userToFind === "admin") {
      res.json(await Coupon.find());
    } else {
      const commonCoupons = await Coupon.find({ userLevel: null });
      const userCoupons = await Coupon.find({ userLevel: user?.level });
      res.json(user ? userCoupons.concat(commonCoupons) : commonCoupons);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
