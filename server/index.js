const express = require("express");
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors(
//     {credentials: true,
//     origin: `http://127.0.0.1:5000`
// }
)); //to allow cross-origin requests

app.use(express.json());




const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/medicineDelivery", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



const Shop = require("./models/Shop"); // Create the Shop model

app.get("/api/shops", async (req, res) => {
  try {
    const shopList = await Shop.find().populate('products');
    res.json(shopList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

const Order = require("./models/Order");

app.post('/api/order', (req, res) =>{
    const {name, email, phone, address, orderProducts} = req.body;
    Order.create({
        name,
        email,
        phone, 
        address, 
        orderProducts
    })
});


app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
});