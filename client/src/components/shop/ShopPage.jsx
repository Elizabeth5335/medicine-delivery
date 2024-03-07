import { useState, useEffect, useContext } from "react";
import ShopsList from "./ShopsList.jsx";
import MedItemsList from "./MedItemsList.jsx";
import axios from "axios";
// import CartContext from '../CartContext'

function ShopPage() {
  const [currentShop, setCurrentShop] = useState("");
  const [message, setMessage] = useState("");
//   const [cart, setCart] = useState([]);

// const cart = useContext(CartContext)
  const [shops, setShops] = useState([]);

  function toggleCurrentShop(id) {
    setCurrentShop(id);
  }

  function addToCart(item) {
    setCart((prev) => [...prev, item]);
  }

  useEffect(() => {
    axios
      .get("/api/shops")
      .then((response) => {
        setShops(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
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
