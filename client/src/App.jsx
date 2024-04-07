import { useState } from "react";
import "./ShopPage.css";
import { Link, Outlet } from "react-router-dom";
import Navigation from "./components/common/Navigation.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import axios from "axios";
import { UserProvider } from "./context/UserContext.jsx";

let baseURL;

if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1"
) {
  baseURL = "http://localhost:5000";
} else {
  baseURL = "https://medicine-delivery-1.onrender.com";
}

axios.defaults.baseURL = baseURL;

function App() {
  return (
    <CartProvider>
      <UserProvider>
        <Navigation />
      </UserProvider>
      <main id="main">
        <Outlet />
      </main>
    </CartProvider>
  );
}

export default App;
