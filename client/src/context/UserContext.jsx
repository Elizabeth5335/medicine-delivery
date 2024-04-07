import { createContext, useState, useEffect, useReducer } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("isLoggedIn")) || false
  );

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  function reducer(state, action) {
    switch (action.type) {
      case "set_name":
        return {
          ...state,
          name: action.value,
        };
      case "set_email":
        return {
          ...state,
          email: action.value,
        };
      case "set_phone":
        return {
          ...state,
          phone: action.value,
        };
      case "set_address":
        return {
          ...state,
          address: action.value,
        };
      case "set_password":
        return {
          ...state,
          hashedPassword: action.value,
        };
      case "set_user": {
        console.log("action.value");
        console.log(action.value);
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

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        user,
        dispatchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
