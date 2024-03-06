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

const Order = require("./models/Order"); // Create the Shop model

app.get("/api/order", async (req, res) => {
  try {
    const shopList = await Order.find().populate('orderProducts');
    res.json(shopList);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// app.get("/test", (req, res)=>{
//     res.json({ message: "Hello from server!" });
// })



app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
});


// const fs = require("fs/promises");


// const PORT = process.env.PORT || 3001;
// const DATA_FILE_PATH = "./client/src/slidesData.json";

// const app = express();

// app.get("/api/:index", async (req, res) => {
//   try {
//     const { index } = req.params;
//     const dataIndex = parseInt(index, 10); // Convert the index to an integer

//     if (isNaN(dataIndex)) {
//       return res.status(400).json({ error: "Invalid index parameter" });
//     }

//     const dataFromFile = await fs.readFile(DATA_FILE_PATH, "utf-8");
//     const parsedData = JSON.parse(dataFromFile);

//     // Check if the index is within the valid range
//     if (dataIndex < 0 || dataIndex >= parsedData.length) {
//       return res.status(404).json({ error: "Index out of bounds" });
//     }
    
//     const selectedElement = parsedData[dataIndex];
    
//     // Send the selected element and the total number of elements in the array
//     res.json({
//       element: selectedElement,
//       totalElements: parsedData.length
//     });
//   } catch (error) {
//     console.error("Error reading file:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });



