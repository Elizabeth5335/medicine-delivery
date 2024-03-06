import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <nav id="navigation">
      <ul>
        <li>
          <Link to="/">Shop</Link>
        </li>
        <li>
          <Link to="/cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
}

export default App;
