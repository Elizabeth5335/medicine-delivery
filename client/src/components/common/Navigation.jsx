import { useState, useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

function App() {
  const { cartProducts } = useContext(CartContext);

  return (
    <nav id="navigation">
      <ul>
        <li>
          <Link to="/">Shop</Link>
        </li>
        <li className="cart-nav-container">
          <Link to="/cart">Cart</Link>
          {cartProducts.length > 0 && (
            <span className="items-in-cart">{cartProducts.length}</span>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default App;
