import { useContext, useState } from "react";
import MedItemCart from "./MedItemCart";
import linex from "../../assets/images/linex.jpg"
import paracetamol from "../../assets/images/paracetamol.jpg"
import nospa from "../../assets/images/nospa.jpg"
import fervex from "../../assets/images/fervex.jpg"
import nurofen from "../../assets/images/nurofen.jpg"
import { CartContext } from "../../context/CartContext";

const items = [
  {
    id: 1,
    name: "linex forte",
    image: linex,
    price: 100.00
  },
  {
    id: 2,
    name: "paracetamol",
    image: paracetamol,
    price: 99.99
  },
  {
    id: 3,
    name: "nospa",
    image: nospa,
    price: 250.00
  },
  {
    id: 4,
    name: "fervex",
    image: fervex,
    price: 434.00
  },
  {
    id: 5,
    name: "nurofen",
    image: nurofen,
    price: 150.00
  },
];


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
