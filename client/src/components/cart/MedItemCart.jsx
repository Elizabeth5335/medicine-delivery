import { useState } from "react";

function MedItemCart(props) {
  let {
    item: { id, name, image, price, quantity },
  } = props; //add setQuantity

  // const [quantity, setQuantity] = useState(2);

  return (
    <div className="cart-item">
      <img className="cart-item-image" src={image} alt={name} />
      <div className="cart-item-description">
        <h4 className="cart-item-text">{name}</h4>
        <span className="cart-item-price">Price: {price.toFixed(2)}</span>
        <label>
          Quantity:
          <input
            name="quantity"
            value={quantity}
            onInput={(e) => {
              // setQuantity(e.target.value);
              quantity = e.target.value;
            }}
            placeholder={quantity}
            id="quantity"
            type="number"
            min={0}
            max={100}
            required
          />
        </label>
      </div>
    </div>
  );
}

export default MedItemCart;
