import React, { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import "../../User.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function UserInfo() {
  const { user, dispatchUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState("");
  const [password, setPassword] = useState("");
  const [pswCorrect, setPswCorrect] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  function toggleEditing(name) {
    setIsEditing((prev) => (prev === "" ? name : ""));
  }

  function handlePasswordToggle() {
    setShowPassword((prev) => !prev);
  }

  function handleNewPasswordToggle() {
    setShowNewPassword((prev) => !prev);
  }

  function handleRepeatPasswordToggle() {
    setShowRepeatPassword((prev) => !prev);
  }

  function validatePassword(e) {
    e.preventDefault();

    if (!password.trim()) {
      setFormErrors({ password: "Password is required" });
      return;
    }

    axios
      .post("api/login", {
        email: user.email,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          setPswCorrect(true);
        } else {
          setPswCorrect(false);
          setFormErrors({ password: "Password is incorrect" });
        }
      })
      .catch((error) => {
        setPswCorrect(false);
        setFormErrors({ password: "Error: " + error.message });
      });
  }

  function checkNewPassword(e) {
    e.preventDefault();

    if (!newPassword.trim()) {
      setFormErrors({ newPassword: "Password is required" });
      return;
    }

    if (newPassword !== repeatPassword) {
      setFormErrors({ repeatPassword: "Passwords should match" });
      return;
    }

    setNewPassword("");
    setRepeatPassword("");
    setPassword("");
    setFormErrors({});
    setPswCorrect(false);
    alert("Password changed successfully");
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
            }}
          >
            {item}: {user[item]}
          </div>
        ) : (
          <div key={item}>
            {item}:
            <input
              className="user-info-input"
              value={user[item]}
              onChange={(e) =>
                dispatchUser({ type: `set_${item}`, value: e.target.value })
              }
            />
            <button
              className="user-info-submit-button"
              onClick={() => {
                toggleEditing(item);
              }}
            >
              Submit
            </button>
          </div>
        );
      })}

      <form className="change-password-container" onSubmit={checkNewPassword}>
        <div className="change-password-label">Change password:</div>

        {!pswCorrect ? (
          <>
            <div>Enter old password</div>
            <div className="input-group">
              <input
                className="user-info-input"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                required
              />
              <span className="input-group-text">
                <FontAwesomeIcon
                  icon={showPassword ? faEyeSlash : faEye}
                  color="grey"
                  onClick={handlePasswordToggle}
                />
              </span>
            </div>
            {formErrors.password && (
              <span className="error">{formErrors.password}</span>
            )}
            <button type="submit" onClick={validatePassword}>
              Check Password
            </button>
          </>
        ) : (
          <>
            <div className="new-password-fields">
              <div>Enter new password</div>
              <div className="input-group">
                <input
                  className="user-info-input"
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New Password"
                  type={showNewPassword ? "text" : "password"}
                  required
                />
                <span className="input-group-text">
                  <FontAwesomeIcon
                    icon={showNewPassword ? faEyeSlash : faEye}
                    color="grey"
                    onClick={handleNewPasswordToggle}
                  />
                </span>
              </div>
              {formErrors.newPassword && (
                <span className="error">{formErrors.newPassword}</span>
              )}

              <div>Repeat new password</div>
              <div className="input-group">
                <input
                  className="user-info-input"
                  name="repeatPassword"
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  placeholder="Repeat New Password"
                  type={showRepeatPassword ? "text" : "password"}
                  required
                />
                <span className="input-group-text">
                  <FontAwesomeIcon
                    icon={showRepeatPassword ? faEyeSlash : faEye}
                    color="grey"
                    onClick={handleRepeatPasswordToggle}
                  />
                </span>
              </div>
              {formErrors.repeatPassword && (
                <span className="error">{formErrors.repeatPassword}</span>
              )}
            </div>
            <button type="submit">Submit</button>
          </>
        )}
      </form>
    </div>
  );
}
