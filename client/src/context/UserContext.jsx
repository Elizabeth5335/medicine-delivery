import axios from "axios";
import { createContext, useState, useEffect, useReducer } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  const [prevEmail, setPrevEmail] = useState(null);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

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
      case "set_user": {
        updateUser({
          ...action.value,
        });
        return { ...action.value };
      }
    }
    throw Error("Unknown action.");
  }

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
              // console.log("User info updated successfully: ");
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

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        dispatchUser,
        setPrevEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
