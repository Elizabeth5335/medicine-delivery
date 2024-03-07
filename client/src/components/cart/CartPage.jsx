import { useContext, useState } from "react";
import MedItemCartList from "./MedItemCartList";
import "../../CartPage.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

function CartPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const { cartProducts, getCartTotal } = useContext(CartContext);

  return (
    <div id="cart">
      <div className="flex">
        <form id="cart-form">
          <label>
            Full name:
            <input
              name="name"
              value={name}
              onInput={(e) => {
                setName(e.target.value);
              }}
              placeholder="Full name"
              id="name"
              required
            />
          </label>

          <label>
            Email:
            <input
              name="email"
              value={email}
              onInput={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              id="email"
              type="email"
              required
            />
          </label>

          <label>
            Phone number:
            <input
              name="phone"
              value={phone}
              onInput={(e) => {
                setPhone(e.target.value);
              }}
              placeholder="Phone number"
              id="phone"
              required
              type="phone"
            />
          </label>

          <label>
            Address:
            <input
              name="address"
              value={address}
              onInput={(e) => {
                setAddress(e.target.value);
              }}
              placeholder="Address"
              id="address"
              required
            />
          </label>
        </form>

        {cartProducts?.length > 0 ? (
          <MedItemCartList />
        ) : (
          <div className="cart-empty-container">
            <h2 className="cart-empty">Cart is empty</h2>
            <Link className="button" to="/">
              Continue shopping
            </Link>
          </div>
        )}
      </div>
      {cartProducts?.length > 0 && (
        <div className="cart-footer">
          <h2>Total price: {getCartTotal()}</h2>

          <Link className="button" to="/">
            Continue shopping
          </Link>
          <button className="button">Submit</button>
        </div>
      )}
    </div>
  );
}

export default CartPage;
