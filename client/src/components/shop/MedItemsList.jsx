import { useState } from "react";
import MedItem from "./MedItem";
import linex from "../../assets/images/linex.jpg"
import paracetamol from "../../assets/images/paracetamol.jpg"
import nospa from "../../assets/images/nospa.jpg"
import fervex from "../../assets/images/fervex.jpg"
import nurofen from "../../assets/images/nurofen.jpg"

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


function MedItemsList(props) {
  const { addToCart } = props;

  return (
    <div className="flex">
      <ul className="med-list">
        {items.map((item) => {
          return <MedItem key={item.id} item={item} addToCart={()=>{addToCart(item)}} />;
        })}
      </ul>
    </div>
  );
}

export default MedItemsList;
