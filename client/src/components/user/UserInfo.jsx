import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "../../User.css";

import ChangePassword from "./ChangePassword";

export default function UserInfo() {
  const { user, dispatchUser, setPrevEmail } = useContext(UserContext);
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
          <div className="user-info-item" key={item}>
            <strong>{item}:</strong>
            <div className="flex">
              <input
                className="user-info-input"
                defaultValue={user[item]}
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
                  dispatchUser({ type: `set_${item}`, value: tmpValue });
                }}
              >
                Submit
              </button>
            </div>
          </div>
        );
      })}

      <ChangePassword />
    </div>
  );
}
