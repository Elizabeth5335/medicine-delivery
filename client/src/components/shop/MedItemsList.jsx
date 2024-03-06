import { useState } from "react";
import MedItem from "./MedItem";
import linex from "../../assets/images/linex.jpg";
import paracetamol from "../../assets/images/paracetamol.jpg";
import nospa from "../../assets/images/nospa.jpg";
import fervex from "../../assets/images/fervex.jpg";
import nurofen from "../../assets/images/nurofen.jpg";

const items = [
  {
    id: 1,
    name: "linex forte",
    image: linex,
    price: 100.0,
  },
  {
    id: 2,
    name: "paracetamol",
    image: paracetamol,
    price: 99.99,
  },
  {
    id: 3,
    name: "nospa",
    image: nospa,
    price: 250.0,
  },
  {
    id: 4,
    name: "fervex",
    image: fervex,
    price: 434.0,
  },
  {
    id: 5,
    name: "nurofen",
    image: nurofen,
    price: 150.0,
  },
];

function MedItemsList(props) {
  const { currentShop, shops, addToCart } = props;
  const products = shops?.find((shop) => shop?._id === currentShop)?.products;

  return (
    <div className="flex">
      {products?.length>0 ? (
        <ul className="med-list">
          {products.map((item) => {
            return (
              <MedItem
                key={item?._id}
                item={item}
                addToCart={() => {
                  addToCart(item);
                }}
              />
            );
          })}
        </ul>
      ) : <h3>There are no products</h3>}

    </div>
  );
}

export default MedItemsList;
