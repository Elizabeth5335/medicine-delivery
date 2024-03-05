import { useState } from "react";
import "./App.css";
import { Link, Outlet } from "react-router-dom";
import Navigation from "./components/common/Navigation.jsx"

function App() {
  return (
    <>
      <Navigation/>
      <Outlet />
    </>
  );
}

export default App;
