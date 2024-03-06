import { useState } from "react";
import "./ShopPage.css";
import { Link, Outlet } from "react-router-dom";
import Navigation from "./components/common/Navigation.jsx";

function App() {
  return (
    <>
      <Navigation />
      <main id="main">
        <Outlet />
      </main>
    </>
  );
}

export default App;
