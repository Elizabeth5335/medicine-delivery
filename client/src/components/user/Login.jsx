import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "../../Signup.css";
import { UserContext } from "../../context/UserContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const { isLoggedIn, setIsLoggedIn, user, dispatchUser } = useContext(UserContext);

  function validatePassword() {
    const errors = {};
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function login(e) {
    e.preventDefault();

    if (validatePassword()) {
      try {
        axios
          .post("api/login", {
            email,
            password,
          })
          .then((response) => {
            const data = response.data;
            if (data.status === "ok") {
              setEmail("");
              setPassword("");
              dispatchUser({type: "set_user", value: data.user})
              setIsLoggedIn(true);
              window.location.replace("/account");
            } else {
              alert("Error: " + data.error);
            }
          })
          .catch((error) => {
            alert("Error: " + error.message);
          });
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  }

  return (
    <div className="signup">
      {!isLoggedIn ? (
        <form id="cart-form" onSubmit={login}>
          <label>
            Email:
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              id="email"
              type="email"
              required
            />
            {formErrors.email && (
              <span className="error">{formErrors.email}</span>
            )}
          </label>

          <label>
            Password:
            <div className="input-group">
              <input
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                id="password"
                type={showPassword ? "text" : "password"}
                required
              />

              <div className="input-group-append">
                <span className="input-group-text">
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    color="grey"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                </span>
              </div>
            </div>
            {formErrors.password && (
              <span className="error">{formErrors.password}</span>
            )}
          </label>
          <button type="submit">Log in</button>
          <Link to="/signup">Create an account</Link>
        </form>
      ) : (
        <div>
          <h2>You are already logged in!</h2>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              window.location.replace("/login");
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
