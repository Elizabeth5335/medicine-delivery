import axios from "axios";
import { createContext, useState, useEffect, useReducer } from "react";
import bcrypt from "bcryptjs";

import { validateForm } from "../components/common/Helpers";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  const [prevEmail, setPrevEmail] = useState(null);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const [user, dispatchUser] = useReducer(
    reducer,
    JSON.parse(localStorage.getItem("user")) || {
      name: "",
      email: "",
      phone: "",
      address: "",
      hashedPassword: "",
      orders: [],
    }
  );

  function reducer(state, action) {
    switch (action.type) {
      case "set_name":
        updateUser({
          ...state,
          name: action.value,
        });
        return {
          ...state,
          name: action.value,
        };
      case "set_email":
        updateUser(
          {
            ...state,
            email: action.value,
          },
          prevEmail
        ).then((success) => {
          if (success) {
            localStorage.setItem(
              "user",
              JSON.stringify({ ...state, email: action.value })
            );
            dispatchUser({
              type: "set_user",
              value: { ...state, email: action.value },
            });
          }
        });
        return state;
      case "set_phone":
        updateUser({
          ...state,
          phone: action.value,
        });
        return {
          ...state,
          phone: action.value,
        };
      case "set_address":
        updateUser({
          ...state,
          address: action.value,
        });
        return {
          ...state,
          address: action.value,
        };
      case "set_password":
        updateUser({
          ...state,
          hashedPassword: action.value,
        });
        return {
          ...state,
          hashedPassword: action.value,
        };
      case "set_orders":
        updateUser({
          ...state,
          orders: action.value,
        });
        return {
          ...state,
          orders: action.value,
        };
      case "set_user": {
        updateUser({
          ...action.value,
        });
        return { ...action.value };
      }
    }
    throw Error("Unknown action.");
  }

  useEffect(() => {
    if (isLoggedIn && user.email) {
      fetchUserOrders();
    }
  }, [user.email]);

  async function fetchUserOrders() {
    try {
      const response = await axios.get("/api/userOrders", {
        params: {
          currentUser: user.email,
        },
      });
      response.data &&
        dispatchUser({
          type: "set_user",
          value: { ...user, orders: response.data },
        });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  function updateUser(newData, prevEmail) {
    return new Promise((resolve, reject) => {
      if (isLoggedIn) {
        axios
          .post("/api/userInfo", { newData, prevEmail })
          .then((response) => {
            const data = response.data;
            if (data.status === "ok") {
              resolve(true);
            } else {
              alert("Error: " + data.error);
              resolve(false);
            }
          })
          .catch((error) => {
            console.error("Error updating user info:", error);
            reject(error);
          });
      } else {
        resolve(false);
      }
    });
  }


  function signup(
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
  ) {
    e.preventDefault();
    const salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);
    let isAccountCreated = false;
    const errors = validateForm({ name, email, phone, address });
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        axios
          .post("/api/users", {
            name,
            email,
            phone,
            address,
            hashedPassword,
          })
          .then((response) => {
            const data = response.data;
            if (data.status === "ok") {
              dispatchUser({ type: "set_user", value: {name, email, phone, address, password} });
              isAccountCreated = true;
              setIsLoggedIn(true);
              return alert("Account created!");
            } else {
              alert("Error: " + data.error);
            }
          })
          .catch((error) => {
            alert("Error: " + error.message);
          })
          .then(() => {
            if ((isAccountCreated === true)) {
              setName("");
              setEmail("");
              setPhone("");
              setAddress("");
              setPassword("");
              window.location.replace("/account");
            }
          });
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        dispatchUser,
        setPrevEmail,
        fetchUserOrders,
        signup,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
