import { useState, useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

function App() {
  const { cartProducts } = useContext(CartContext);

  return (
    <nav id="navigation">
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => [isActive ? "active" : ""]}
          >
            Shop
          </NavLink>
        </li>
        <li className="cart-nav-container">
          <NavLink
            to="/cart"
            className={({ isActive }) => [isActive ? "active" : ""]}
          >
            Cart
          </NavLink>
          {cartProducts.length > 0 && (
            <span className="items-in-cart">{cartProducts.length}</span>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default App;
