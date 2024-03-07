import { useContext, useState } from "react";
import MedItemCartList from "./MedItemCartList";
import "../../CartPage.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import axios from "axios";

function CartPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const { cartProducts, getCartTotal, clearCart } = useContext(CartContext);

  function validateForm() {
    const errors = {};
    if (!name.trim()) {
      errors.name = "Name is required";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone)
    ) {
      errors.phone = "Phone number is invalid";
    }
    if (!address.trim()) {
      errors.address = "Address is required";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function submitOrder(e) {
    e.preventDefault();
    if (validateForm()) {
      try {
        axios({
          method: "post",
          url: "/api/order",
          data: {
            name,
            email,
            phone,
            address,
            orderProducts: cartProducts,
          },
        });
        clearCart();
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");

        return alert("Order submitted successfully!");
      } catch (error) {
        return alert("Error: " + error);
      }
    }
  }

  return (
    <div id="cart">
      <div className="flex">
        <form id="cart-form" onSubmit={submitOrder}>
          <label>
            Full name:
            <input
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              id="name"
              required
            />
            {formErrors.name && (
              <span className="error">{formErrors.name}</span>
            )}
          </label>

          <label>
            Email:
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              id="email"
              type="email"
              required
            />
            {formErrors.email && (
              <span className="error">{formErrors.email}</span>
            )}
          </label>

          <label>
            Phone number:
            <input
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              id="phone"
              required
              type="phone"
            />
            {formErrors.phone && (
              <span className="error">{formErrors.phone}</span>
            )}
          </label>

          <label>
            Address:
            <input
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
              id="address"
              required
            />
            {formErrors.address && (
              <span className="error">{formErrors.address}</span>
            )}
          </label>
          <button type="submit">Submit</button>
          <div className="cart-footer">
            <h2>Total price: {getCartTotal()}</h2>

            {cartProducts?.length > 0 && (
              <Link className="button" to="/">
                Continue shopping
              </Link>
            )}
          </div>
        </form>

        {cartProducts?.length > 0 ? (
          <div>
            <MedItemCartList />
          </div>
        ) : (
          <div className="cart-empty-container">
            <h2 className="cart-empty">Cart is empty</h2>
            <Link className="button" to="/">
              Continue shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
