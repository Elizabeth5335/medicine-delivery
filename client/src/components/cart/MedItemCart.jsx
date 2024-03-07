import { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";

function MedItemCart(props) {
  let {
    product: { _id, name, image, price, quantity },
  } = props; //add setQuantity

  const { product } = props;
  // const [quantity, setQuantity] = useState(2);

  const { setQuantity, removeFromCart } = useContext(CartContext);

  function toggleRemove(product) {
    if (window.confirm(`Remove ${name} from cart?`)) {
      removeFromCart(product);
    }
  }

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
              setQuantity;
              setQuantity(product, e.target.value);
            }}
            placeholder={product.quantity}
            id="quantity"
            type="number"
            min={0}
            max={100}
            required
          />
        </label>
        <button className="cart-item-remove" onClick={() => toggleRemove(product)}>X</button>
      </div>
    </div>
  );
}

export default MedItemCart;
