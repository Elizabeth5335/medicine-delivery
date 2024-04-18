import { useContext, useState } from "react";
import MedItemCart from "./MedItemCart";
import { CartContext } from "../../context/CartContext";


function MedItemCartList() {

  const { cartProducts } = useContext(CartContext);

  return (
    <div className="flex">
      <ul className="cart-list">
        {cartProducts.map((product) => {
          return <MedItemCart key={product._id} product={product} />;
        })}
      </ul>
    </div>
  );
}

export default MedItemCartList;
