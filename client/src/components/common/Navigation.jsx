import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <nav>
      <Link to="/cart">Cart</Link>
      <Link to="/">Shop</Link>
    </nav>
  );
}

export default App;
