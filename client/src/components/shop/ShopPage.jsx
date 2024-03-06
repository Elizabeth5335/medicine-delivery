import { useState } from "react";
import ShopsList from "./ShopsList.jsx";
import MedItemsList from "./MedItemsList.jsx";

function ShopPage() {
  const [currentShop, setCurrentShop] = useState(1);
  const [cart, setCart] = useState([]);
  function toggleCurrentShop(id) {
    setCurrentShop(id);
  }

  function addToCart(item) { //add quantity
    setCart(prev=>[...prev, item]);
 }

  return (
    <>
      <ShopsList
        currentShop={currentShop}
        toggleCurrentShop={toggleCurrentShop}
      />
      <MedItemsList addToCart={addToCart} />
    </>
  );
}

export default ShopPage;
