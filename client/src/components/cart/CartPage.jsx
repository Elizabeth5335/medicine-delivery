import { useContext, useState } from "react";
import MedItemCartList from "./MedItemCartList";
import "../../CartPage.css";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

import { validateForm } from "../common/Helpers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function CartPage() {
  const [formErrors, setFormErrors] = useState({});

  const { user, isLoggedIn, signup } = useContext(UserContext);

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [address, setAddress] = useState(user.address || "");
  const [coupons, setCoupons] = useState("");
  const [createAcc, setCreateAcc] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { cartProducts, getCartTotal, clearCart, checkCoupon } =
    useContext(CartContext);

  function submitOrder(e) {
    e.preventDefault();
    if (createAcc) {
      signup(
        e,
        name,
        email,
        phone,
        address,
        password,
        setName,
        setEmail,
        setPhone,
        setAddress,
        setPassword,
        setFormErrors
      );
    }
    const totalPrice = getCartTotal(coupons);
    const errors = validateForm({ name, email, phone, address });
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        axios({
          method: "post",
          url: "/api/order",
          data: {
            name,
            email,
            phone,
            address,
            totalPrice,
            orderProducts: cartProducts,
          },
        });
        clearCart();
        setName("");
        setEmail("");
        setPhone("");
        setCoupons("");
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
        {cartProducts?.length > 0 && (
          <form id="cart-form" onSubmit={submitOrder}>
            <label>
              Full name:
              <input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                id="name"
                minLength="2"
                maxLength="30"
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
                minLength="2"
                maxLength="30"
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
                minLength="2"
                maxLength="30"
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
                minLength="2"
                maxLength="50"
                required
              />
              {formErrors.address && (
                <span className="error">{formErrors.address}</span>
              )}
            </label>

            <label>
              Paste your coupons:
              <input
                name="coupons"
                value={coupons}
                onChange={(e) => setCoupons(e.target.value)}
                placeholder="Coupons"
                id="coupons"
                minLength="2"
                maxLength="20"
              />
              {coupons && checkCoupon(coupons) && (
                <span className="error">{checkCoupon(coupons)}</span>
              )}
            </label>

            {!isLoggedIn && (
              <div className="checkbox-cart">
                <input
                  name="createAcc"
                  checked={createAcc}
                  onChange={(e) => setCreateAcc(e.target.checked)}
                  id="createAcc"
                  type="checkbox"
                  style={{ marginRight: "8px" }}
                />
                <label htmlFor="createAcc">Create account</label>
              </div>
            )}

            {createAcc && (
              <label>
                Password:
                <div className="input-group">
                  <input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                  />

                  <div className="input-group-append">
                    <span className="input-group-text">
                      <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        color="grey"
                        onClick={() => setShowPassword((prev) => !prev)}
                      />
                    </span>
                  </div>
                </div>
                {formErrors.password && (
                  <span className="error">{formErrors.password}</span>
                )}
              </label>
            )}

            <button type="submit">Submit</button>
            <div className="cart-footer">
              <h2>Total price: {getCartTotal(coupons)}</h2>

              <Link className="button" to="/">
                Continue shopping
              </Link>
            </div>
          </form>
        )}

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
