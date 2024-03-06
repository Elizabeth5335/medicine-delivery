import { useState } from "react";

const shops = [
  {
    id: 1,
    name: "Shop 1",
  },
  {
    id: 2,
    name: "Shop 2",
  },
  {
    id: 3,
    name: "Shop 3",
  },
];
function ShopsList(props) {
  const { currentShop, toggleCurrentShop } = props;

  return (
    <div>
      <ul className="shops-list">
        {shops.map((shop) => {
          return (
            <li
              key={shop.id}
              className={`shops-item ${
                currentShop === shop.id ? "active" : ""
              }`}
              onClick={() => toggleCurrentShop(shop.id)}
            >
              {shop.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ShopsList;
