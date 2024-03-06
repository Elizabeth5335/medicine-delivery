import { useState, useEffect } from "react";
import ShopsList from "./ShopsList.jsx";
import MedItemsList from "./MedItemsList.jsx";
import axios from "axios";

function ShopPage() {
  const [currentShop, setCurrentShop] = useState("");
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);

  const [shops, setShops] = useState([]);

  function toggleCurrentShop(id) {
    setCurrentShop(id);
  }

  function addToCart(item) {
    //add quantity
    setCart((prev) => [...prev, item]);
  }

  //  useEffect(() => {
  //     fetch("http://localhost:4000/test")
  //       .then((res) => res.json())
  //       .then((data) => setMessage(data.message));
  //   }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/shops")
      .then((response) => {
        setShops(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {/* <ul>
        {shops.map((shop) => (
          <li key={shop._id}>
            <h3>{shop.name}</h3>
            <p>{shop.description}</p>
          </li>
        ))}
      </ul> */}

      {shops.length > 0 && (
        <ShopsList
          currentShop={currentShop ? currentShop : shops[0]?._id}
          shops={shops}
          toggleCurrentShop={toggleCurrentShop}
        />
      )}

      <MedItemsList
        currentShop={currentShop ? currentShop : shops[0]?._id}
        shops={shops}
        addToCart={addToCart}
      />
    </>
  );
}

export default ShopPage;
