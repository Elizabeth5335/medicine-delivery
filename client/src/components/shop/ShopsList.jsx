import { useState } from "react";

function ShopsList(props) {
  const { currentShop, shops, toggleCurrentShop } = props;
  
  return (
    <>
      <ul className="shops-list">
        {shops.map((shop) => {
          return (
            <li
              key={shop._id}
              className={`shops-item ${
                currentShop === shop._id ? "active" : ""
              }`}
              onClick={() => toggleCurrentShop(shop._id)}
            >
              {shop.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ShopsList;
