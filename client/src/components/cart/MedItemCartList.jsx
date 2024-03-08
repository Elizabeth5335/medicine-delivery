import { useContext, useState } from "react";
import MedItemCart from "./MedItemCart";
import linex from "../../assets/images/linex.jpg"
import paracetamol from "../../assets/images/paracetamol.jpg"
import nospa from "../../assets/images/nospa.jpg"
import fervex from "../../assets/images/fervex.jpg"
import nurofen from "../../assets/images/nurofen.jpg"
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
