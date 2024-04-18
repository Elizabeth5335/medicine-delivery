import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ShopPage from "./components/shop/ShopPage.jsx";
import CartPage from "./components/cart/CartPage.jsx";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./components/user/Login.jsx";
import Signup from "./components/user/Signup.jsx";
import Account from "./components/user/Account.jsx";
import { UserProvider } from "./context/UserContext.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <ShopPage />,
      },
      {
        path: "/cart",
        element: (
          <UserProvider>
            <CartPage />
          </UserProvider>
        ),
      },
      {
        path: "/login",
        element: (
          <UserProvider>
            <Login />
          </UserProvider>
        ),
      },
      {
        path: "/signup",
        element: (
          <UserProvider>
            <Signup />
          </UserProvider>
        ),
      },
      {
        path: "/account",
        element: (
          <UserProvider>
            <Account />
          </UserProvider>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
