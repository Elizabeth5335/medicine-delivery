import { useState } from "react";
import "./ShopPage.css";
import { Link, Outlet } from "react-router-dom";
import Navigation from "./components/common/Navigation.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:5000"

function App() {

  return (
    <CartProvider>
      <Navigation />
      <main id="main">
        <Outlet />
      </main>
    </CartProvider>
  );
}

export default App;
