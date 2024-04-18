import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "../../User.css";
import { validateForm } from "../common/Helpers";

import ChangePassword from "./ChangePassword";

export default function UserInfo() {
  const [formErrors, setFormErrors] = useState("");

  const { user, setIsLoggedIn, dispatchUser, setPrevEmail } =
    useContext(UserContext);
  const [isEditing, setIsEditing] = useState("");
  const [tmpValue, setTmpValue] = useState("");

  useEffect(() => {
    toggleEditing("");
  }, [user]);

  function toggleEditing(name) {
    setIsEditing((prev) => (prev === "" ? name : ""));
  }

  const arr = ["name", "email", "phone", "address"];

  return (
    <div id="user-info">
      {arr.map((item) => {
        return isEditing !== item ? (
          <div
            key={item}
            className="user-info-item"
            onClick={() => {
              toggleEditing(item);
              setTmpValue(user[item]);
            }}
          >
            <strong>{item}:</strong>{" "}
            <div className="user-info-content">{user[item]}</div>
          </div>
        ) : (
          <div key={item}>
            <div className="user-info-item">
              <strong>{item}:</strong>
              <div className="flex">
                <input
                  className="user-info-input"
                  defaultValue={user[item]}
                  minLength="2"
                  maxLength="90"
                  onInput={(e) => {
                    if (item === "email") {
                      setPrevEmail(user[item]);
                    }
                    setTmpValue(e.target.value);
                  }}
                />
                <button
                  className="user-info-submit-button"
                  onClick={() => {
                    const errors = validateForm({ [item]: tmpValue })[item];
                    setFormErrors(errors);
                    if (!errors)
                      dispatchUser({ type: `set_${item}`, value: tmpValue });
                    else {
                      setFormErrors(errors);
                    }
                  }}
                >
                  Submit
                </button>
              </div>
              {formErrors && <span className="error">{formErrors}</span>}
            </div>
          </div>
        );
      })}

      <ChangePassword />
      <button
        onClick={() => {
          setIsLoggedIn(false);
          localStorage.setItem(
            "user",
            JSON.stringify({
              name: "",
              email: "",
              phone: "",
              address: "",
              hashedPassword: "",
              orders: [],
            })
          );

          window.location.replace("/login");
        }}
      >
        Log out
      </button>
    </div>
  );
}
